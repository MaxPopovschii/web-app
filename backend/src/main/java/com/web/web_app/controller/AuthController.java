package com.web.web_app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.web.web_app.config.JWTUtil;
import com.web.web_app.dto.LoginDto;
import com.web.web_app.model.User;
import com.web.web_app.services.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JWTUtil jwtUtil;

    @Autowired
    private UserService userService;



    @PostMapping("/login")
    public String login(@RequestBody LoginDto logindto) {
        User user = userService.getByEmail(logindto.getEmail());
        if (userService.matchesPassword(logindto.getPassword(), user.getPassword())) {
            String jwtToken = jwtUtil.generateToken(user.getEmail());
            return jwtToken;
        } else {
            return  "Email or password wrong.";
        }
    }
}
