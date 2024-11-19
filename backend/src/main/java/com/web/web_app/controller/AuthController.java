package com.web.web_app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.web.web_app.dto.LoginDto;
import com.web.web_app.services.AuthService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;



    @PostMapping("/login")
    public String login(@RequestBody LoginDto logindto) {
        return authService.authenticateUser(logindto.getEmail(), logindto.getPassword());
    }
}
