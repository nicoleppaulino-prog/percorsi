package com.ni.capstone.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

/** Crea e verifica i token JWT: il "braccialetto" che prova chi sei senza rifare il login a ogni richiesta. */
@Component
public class JwtUtil {

    @Value("${app.jwt.secret}")
    private String secret;

    @Value("${app.jwt.expiration-ms}")
    private long expirationMs;

    /** Se la chiave e' troppo corta l'app non parte, con un messaggio chiaro. */
    @PostConstruct
    void controllaChiave() {
        if (secret == null || secret.getBytes(StandardCharsets.UTF_8).length < 32) {
            throw new IllegalStateException(
                    "La chiave JWT (app.jwt.secret / variabile JWT_SECRET) deve avere almeno 32 caratteri");
        }
    }

    private Key chiaveDiFirma() {
        return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    public String generaToken(String email) {
        Date ora = new Date();
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(ora)
                .setExpiration(new Date(ora.getTime() + expirationMs))
                .signWith(chiaveDiFirma(), SignatureAlgorithm.HS256)
                .compact();
    }

    public String estraiEmail(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(chiaveDiFirma())
                .build()
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();
    }

    /** Vero solo se il token e' stato firmato da noi e non e' scaduto. */
    public boolean isTokenValido(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(chiaveDiFirma()).build().parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
