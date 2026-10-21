package com.ni.capstone.dto;

import com.ni.capstone.model.Progresso;

import java.time.LocalDate;

public record ProgressoResponse(Long id, LocalDate data, String area, String nota) {

    public static ProgressoResponse from(Progresso progresso) {
        return new ProgressoResponse(progresso.getId(), progresso.getData(), progresso.getArea(), progresso.getNota());
    }
}
