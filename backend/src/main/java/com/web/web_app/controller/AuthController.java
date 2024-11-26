package com.web.web_app.controller;


import java.util.HashMap;
import java.util.Map;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.web.web_app.config.JWTUtil;
import com.web.web_app.dto.LoginDto;
import com.web.web_app.dto.UserDto;
import com.web.web_app.model.User;
import com.web.web_app.services.EmailService;
import com.web.web_app.services.UserService;

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



    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginDto logindto) {
        User user = userService.getByEmail(logindto.getEmail());
        if (userService.matchesPassword(logindto.getPassword(), user.getPassword())) {
            String jwtToken = jwtUtil.generateToken(user.getEmail());
            
            return ResponseEntity.ok(jwtToken);
        } else {
            return  new ResponseEntity<String>("Email or password wrong.", HttpStatusCode.valueOf(400));
        }
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

            User user = userService.create(userRequest);
            // Remove OTP from storage (for security reasons)
            otpStorage.remove(userdto.getEmail());

            return ResponseEntity.ok("User registered successfully.");
        } else {
            return ResponseEntity.status(400).body("Invalid OTP.");
        }
    }
}
