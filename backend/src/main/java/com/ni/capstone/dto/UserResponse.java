package com.ni.capstone.dto;

import com.ni.capstone.model.User;

/** I dati pubblici di un utente: volutamente senza password. */
public record UserResponse(Long id, String nome, String email, String ruolo) {

    public static UserResponse from(User user) {
        return new UserResponse(user.getId(), user.getNome(), user.getEmail(), user.getRuolo().name());
    }
}
