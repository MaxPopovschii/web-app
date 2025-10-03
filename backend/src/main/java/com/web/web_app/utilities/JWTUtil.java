package com.web.web_app.utilities;

import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;

@Component
public class JWTUtil {
    @Value("${jwt_secret}")
    private String secret;

    public String generateToken(String email) throws IllegalArgumentException, JWTCreationException {
        long expirationMillis = 1000 * 60 * 60 * 2; // 2 ore
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + expirationMillis);
        return JWT.create()
                .withSubject("User Detail")
                .withClaim("email", email)
                .withIssuedAt(now)
                .withExpiresAt(expiryDate)
                .withIssuer("EcoFootPrint")
                .sign(Algorithm.HMAC256(secret));
    }

    public String validateTokenAndRetrieveSubject(String token) throws JWTVerificationException {
        JWTVerifier verifier = JWT.require(Algorithm.HMAC256(secret))
                .withSubject("User Detail")
                .withIssuer("EcoFootPrint")
                .build();
        DecodedJWT jwt = verifier.verify(token);
        Date expiresAt = jwt.getExpiresAt();
        if (expiresAt != null && expiresAt.before(new Date())) {
            throw new JWTVerificationException("Token expired");
        }
        return jwt.getClaim("email").asString();
    }

    // Genera un refresh token con scadenza più lunga
    public String generateRefreshToken(String email) {
        long expirationMillis = 1000L * 60 * 60 * 24 * 7; // 7 giorni
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + expirationMillis);
        return JWT.create()
                .withSubject("RefreshToken")
                .withClaim("email", email)
                .withIssuedAt(now)
                .withExpiresAt(expiryDate)
                .withIssuer("EcoFootPrint")
                .sign(Algorithm.HMAC256(secret));
    }

    // Valida il refresh token e restituisce l'email
    public String validateRefreshTokenAndRetrieveSubject(String token) throws JWTVerificationException {
        JWTVerifier verifier = JWT.require(Algorithm.HMAC256(secret))
                .withSubject("RefreshToken")
                .withIssuer("EcoFootPrint")
                .build();
        DecodedJWT jwt = verifier.verify(token);
        Date expiresAt = jwt.getExpiresAt();
        if (expiresAt != null && expiresAt.before(new Date())) {
            throw new JWTVerificationException("Refresh token expired");
        }
        return jwt.getClaim("email").asString();
    }
}
