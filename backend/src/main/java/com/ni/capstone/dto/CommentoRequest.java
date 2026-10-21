package com.ni.capstone.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CommentoRequest(
        @NotBlank(message = "Scrivi qualcosa prima di inviare")
        @Size(max = 2000, message = "Il commento è troppo lungo (massimo 2000 caratteri)")
        String testo) {
}
