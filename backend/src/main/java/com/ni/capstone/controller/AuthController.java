package com.ni.capstone.controller;

import com.ni.capstone.dto.AuthResponse;
import com.ni.capstone.dto.LoginRequest;
import com.ni.capstone.dto.RegisterRequest;
import com.ni.capstone.dto.UserResponse;
import com.ni.capstone.model.User;
import com.ni.capstone.security.JwtUtil;
import com.ni.capstone.service.UserService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Tag(name = "Autenticazione", description = "Registrazione, login e profilo")
public class AuthController {

    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public AuthResponse registra(@Valid @RequestBody RegisterRequest richiesta) {
        User utente = userService.registra(richiesta);
        // Dopo la registrazione l'utente e' subito loggato: gli diamo il token.
        return new AuthResponse(jwtUtil.generaToken(utente.getEmail()), UserResponse.from(utente));
    }

    @PostMapping("/login")
    public AuthResponse login(@Valid @RequestBody LoginRequest richiesta) {
        String email = richiesta.email().trim().toLowerCase();

        // Controlla email e password. Se sono sbagliate lancia BadCredentialsException (-> 401).
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, richiesta.password()));

        User utente = userService.trovaPerEmail(email);
        return new AuthResponse(jwtUtil.generaToken(utente.getEmail()), UserResponse.from(utente));
    }

    /** Il profilo di chi e' loggato: il frontend lo usa per ripristinare la sessione. */
    @GetMapping("/me")
    @SecurityRequirement(name = "bearerAuth")
    public UserResponse profilo(Principal principal) {
        return UserResponse.from(userService.trovaPerEmail(principal.getName()));
    }
}
