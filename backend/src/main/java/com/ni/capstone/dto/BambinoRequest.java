package com.ni.capstone.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record BambinoRequest(
        @NotBlank(message = "Il nome è obbligatorio")
        @Size(max = 80, message = "Il nome è troppo lungo")
        String nome,

        @Min(value = 0, message = "L'età non può essere negativa")
        @Max(value = 30, message = "L'età deve essere al massimo 30")
        Integer eta,

        @Size(max = 2000, message = "Le note sono troppo lunghe (massimo 2000 caratteri)")
        String noteGenerali) {
}
