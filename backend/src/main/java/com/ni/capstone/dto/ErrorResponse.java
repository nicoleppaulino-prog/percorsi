package com.ni.capstone.dto;

import java.util.Map;

/** Formato unico di tutti gli errori: un messaggio leggibile e, se serve, il dettaglio per campo. */
public record ErrorResponse(String message, Map<String, String> errors) {

    public ErrorResponse(String message) {
        this(message, null);
    }
}
