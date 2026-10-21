package com.ni.capstone.dto;

import com.ni.capstone.model.User;

/** Chi ha scritto un post o un commento: solo nome e ruolo, mai email o password. */
public record AutoreResponse(Long id, String nome, String ruolo) {

    public static AutoreResponse from(User user) {
        return new AutoreResponse(user.getId(), user.getNome(), user.getRuolo().name());
    }
}
