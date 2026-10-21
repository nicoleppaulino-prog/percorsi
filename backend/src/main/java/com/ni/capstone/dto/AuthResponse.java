package com.ni.capstone.dto;

/** Risposta a registrazione e login: il "braccialetto" (token) e i dati dell'utente. */
public record AuthResponse(String token, UserResponse utente) {
}
