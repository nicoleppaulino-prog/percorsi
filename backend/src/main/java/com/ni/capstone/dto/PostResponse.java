package com.ni.capstone.dto;

import com.ni.capstone.model.Post;

import java.time.LocalDateTime;

public record PostResponse(
        Long id,
        String titolo,
        String testo,
        String categoria,
        LocalDateTime dataCreazione,
        AutoreResponse autore,
        long numeroCommenti) {

    public static PostResponse from(Post post, long numeroCommenti) {
        return new PostResponse(
                post.getId(),
                post.getTitolo(),
                post.getTesto(),
                post.getCategoria(),
                post.getDataCreazione(),
                AutoreResponse.from(post.getAutore()),
                numeroCommenti);
    }
}
