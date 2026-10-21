package com.ni.capstone.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public record ProgressoRequest(
        @NotNull(message = "Indica la data")
        LocalDate data,

        @NotBlank(message = "Scegli un'area")
        @Size(max = 60, message = "Il nome dell'area è troppo lungo")
        String area,

        @Size(max = 2000, message = "La nota è troppo lunga (massimo 2000 caratteri)")
        String nota) {
}
