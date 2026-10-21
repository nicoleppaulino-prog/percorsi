package com.ni.capstone.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;

public record EventoRequest(
        @NotNull(message = "Indica quando è successo")
        LocalDateTime dataOra,

        @Size(max = 120, message = "Il luogo è troppo lungo")
        String luogo,

        @Size(max = 255, message = "Troppi stimoli indicati")
        String stimolo,

        @Size(max = 1000, message = "La descrizione della reazione è troppo lunga (massimo 1000 caratteri)")
        String reazioneOsservata,

        @Size(max = 1000, message = "Il testo su cosa ha aiutato è troppo lungo (massimo 1000 caratteri)")
        String cosaHaAiutato,

        @NotNull(message = "Indica l'intensità da 1 a 5")
        @Min(value = 1, message = "L'intensità minima è 1")
        @Max(value = 5, message = "L'intensità massima è 5")
        Integer intensita) {
}
