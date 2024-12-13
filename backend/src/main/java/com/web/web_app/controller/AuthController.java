package com.web.web_app.controller;


import java.util.HashMap;
import java.util.Map;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.web.web_app.utilities.JWTUtil;
import com.web.web_app.dto.LoginDto;
import com.web.web_app.dto.UserDto;
import com.web.web_app.model.User;
import com.web.web_app.services.EmailService;
import com.web.web_app.services.UserService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private JWTUtil jwtUtil;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private UserService userService;
    @Autowired
    private EmailService emailService;

    private static Map<String, String> otpStorage = new HashMap<>();


    @PostMapping("/registration")
    public ResponseEntity<?> registration(@RequestBody UserDto userdto) {
        User userRequest = modelMapper.map(userdto, User.class);
        // Save hashed password
        userRequest.setPassword(userService.hashPassword(userRequest.getPassword()));

        User user = userService.create(userRequest);

        UserDto postResponse = modelMapper.map(user, UserDto.class);

        return new ResponseEntity<UserDto>(postResponse, HttpStatus.CREATED);
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDto logindto, HttpServletResponse response) {
        User user = userService.getByEmail(logindto.getEmail());
        if (user != null || userService.matchesPassword(logindto.getPassword(), user.getPassword())) {
            String jwtToken = jwtUtil.generateToken(user.getEmail());
            
            Cookie cookie = new Cookie("token", jwtToken);
            cookie.setHttpOnly(true);
            cookie.setSecure(true);
            cookie.setPath("/");
            cookie.setMaxAge(7 * 24 * 60 * 60);
            response.addCookie(cookie);
            return ResponseEntity.ok("Login ok");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }
    }
    @PostMapping("logout")
    public ResponseEntity<String> logout(HttpServletResponse response) {
        Cookie cookie = new Cookie("token", null);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        response.addCookie(cookie);
        return ResponseEntity.ok("Logout");
    }
    

    @PostMapping("/send-otp")
    public  ResponseEntity<String> sendOtp(@RequestParam String email) {
        // Generate OTP
        String otp = emailService.generateOTP();

        // Send OTP to email
        emailService.sendOTP(email, otp);

        // Store the OTP temporarily for verification
        otpStorage.put(email, otp);

        return ResponseEntity.ok("OTP sent to email: " + email);
    }

     // Endpoint to verify OTP and register the user
    @PostMapping("/verify-otp")
    public ResponseEntity<String> verifyOtp(@RequestParam String otp, @Valid @RequestBody UserDto userdto) {
        // Check if OTP is valid
        if (otpStorage.containsKey(userdto.getEmail()) && otpStorage.get(userdto.getEmail()).equals(otp)) {
            // OTP verified, save user details
            User userRequest = modelMapper.map(userdto, User.class);
            // Save hashed password
            userRequest.setPassword(userService.hashPassword(userRequest.getPassword()));

            userService.create(userRequest);
            // Remove OTP from storage (for security reasons)
            otpStorage.remove(userdto.getEmail());

            return ResponseEntity.ok("User registered successfully.");
        } else {
            return ResponseEntity.status(400).body("Invalid OTP.");
        }
    }
}
