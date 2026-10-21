package com.ni.capstone.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record PostRequest(
        @NotBlank(message = "Il titolo è obbligatorio")
        @Size(max = 150, message = "Il titolo è troppo lungo (massimo 150 caratteri)")
        String titolo,

        @NotBlank(message = "Il testo è obbligatorio")
        @Size(max = 5000, message = "Il testo è troppo lungo (massimo 5000 caratteri)")
        String testo,

        @Size(max = 60, message = "La categoria è troppo lunga")
        String categoria) {
}
