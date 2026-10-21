package com.ni.capstone.dto;

import com.ni.capstone.model.Bambino;

public record BambinoResponse(Long id, String nome, Integer eta, String noteGenerali) {

    public static BambinoResponse from(Bambino bambino) {
        return new BambinoResponse(bambino.getId(), bambino.getNome(), bambino.getEta(), bambino.getNoteGenerali());
    }
}
