package com.ni.capstone.dto;

import com.ni.capstone.model.Commento;

import java.time.LocalDateTime;

public record CommentoResponse(Long id, String testo, LocalDateTime dataCreazione, AutoreResponse autore) {

    public static CommentoResponse from(Commento commento) {
        return new CommentoResponse(
                commento.getId(),
                commento.getTesto(),
                commento.getDataCreazione(),
                AutoreResponse.from(commento.getAutore()));
    }
}
