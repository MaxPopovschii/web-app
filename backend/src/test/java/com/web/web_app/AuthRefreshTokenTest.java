package com.web.web_app;

import com.web.web_app.utilities.JWTUtil;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@SpringBootTest
@AutoConfigureMockMvc
public class AuthRefreshTokenTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private JWTUtil jwtUtil;

    @Test
    void validRefreshTokenReturnsNewTokens() throws Exception {
        String email = "test@ecopasso.com";
        String refreshToken = jwtUtil.generateRefreshToken(email);
        mockMvc.perform(post("/auth/refresh-token")
                .cookie(new javax.servlet.http.Cookie("refreshToken", refreshToken))
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.accessToken").exists())
                .andExpect(jsonPath("$.refreshToken").exists());
    }

    @Test
    void invalidRefreshTokenReturnsUnauthorized() throws Exception {
        mockMvc.perform(post("/auth/refresh-token")
                .cookie(new javax.servlet.http.Cookie("refreshToken", "invalid.token"))
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isUnauthorized());
    }
}
