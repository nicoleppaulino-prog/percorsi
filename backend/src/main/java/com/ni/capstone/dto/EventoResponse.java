package com.ni.capstone.dto;

import com.ni.capstone.model.EventoSensoriale;

import java.time.LocalDateTime;

public record EventoResponse(
        Long id,
        LocalDateTime dataOra,
        String luogo,
        String stimolo,
        String reazioneOsservata,
        String cosaHaAiutato,
        Integer intensita) {

    public static EventoResponse from(EventoSensoriale evento) {
        return new EventoResponse(
                evento.getId(),
                evento.getDataOra(),
                evento.getLuogo(),
                evento.getStimolo(),
                evento.getReazioneOsservata(),
                evento.getCosaHaAiutato(),
                evento.getIntensita());
    }
}
