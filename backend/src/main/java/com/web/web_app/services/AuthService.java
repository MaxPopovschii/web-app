package com.web.web_app.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import com.web.web_app.utilities.JWTUtil;
import com.web.web_app.model.User;

@Service
public class AuthService {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;

    @Autowired
    private JWTUtil jwtUtil;

    public String authenticateUser(String email, String password) {
        User user = userService.getByEmail(email);
        if (userService.matchesPassword(password, user.getPassword())) {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));

            String jwtToken = jwtUtil.generateToken(email);
            return jwtToken;
        } else {
            return  "Email or password wrong.";
        }
    }
}
