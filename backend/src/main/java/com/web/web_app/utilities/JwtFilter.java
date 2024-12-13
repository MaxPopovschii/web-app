package com.web.web_app.utilities;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.filter.OncePerRequestFilter;

import com.web.web_app.services.UserService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JwtFilter extends OncePerRequestFilter{
    
    @Autowired
    private JWTUtil jwtUtil;
    @Lazy
    @Autowired
    private  UserService userService;
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws ServletException, IOException {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("token".equals(cookie.getName())) {
                    String token = cookie.getValue();
                    try {
                        // Validate and retrieve email from token
                        String email = jwtUtil.validateTokenAndRetrieveSubject(token);
                        com.web.web_app.model.User user = userService.getByEmail(email);
                        // Authenticate the user
                        UsernamePasswordAuthenticationToken authentication =
                                new UsernamePasswordAuthenticationToken(user, null);
                        SecurityContextHolder.getContext().setAuthentication(authentication);
                    } catch (Exception e ) {
                        SecurityContextHolder.clearContext();
                    }
                    break;
                }
            }
        }
        chain.doFilter(request, response);
    }
}
