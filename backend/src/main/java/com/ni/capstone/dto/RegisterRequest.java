package com.ni.capstone.dto;

import com.ni.capstone.model.User;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record RegisterRequest(
        @NotBlank(message = "L'email è obbligatoria")
        @Email(message = "Inserisci un'email valida")
        @Size(max = 120, message = "L'email è troppo lunga")
        String email,

        @NotBlank(message = "La password è obbligatoria")
        @Size(min = 8, max = 72, message = "La password deve avere tra 8 e 72 caratteri")
        String password,

        @NotBlank(message = "Il nome è obbligatorio")
        @Size(max = 80, message = "Il nome è troppo lungo")
        String nome,

        @NotNull(message = "Scegli come vuoi usare Percorsi")
        User.Ruolo ruolo) {
}
