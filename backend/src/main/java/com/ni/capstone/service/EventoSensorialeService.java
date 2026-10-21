package com.ni.capstone.service;

import com.ni.capstone.dto.EventoRequest;
import com.ni.capstone.exception.NotFoundException;
import com.ni.capstone.model.Bambino;
import com.ni.capstone.model.EventoSensoriale;
import com.ni.capstone.repository.EventoSensorialeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EventoSensorialeService {

    private final EventoSensorialeRepository eventoRepository;
    private final BambinoService bambinoService;

    public List<EventoSensoriale> elenco(Long bambinoId, String emailGenitore) {
        bambinoService.trova(bambinoId, emailGenitore); // verifica che il bambino sia di questo genitore
        return eventoRepository.findByBambinoIdOrderByDataOraDesc(bambinoId);
    }

    public EventoSensoriale registra(Long bambinoId, EventoRequest richiesta, String emailGenitore) {
        Bambino bambino = bambinoService.trova(bambinoId, emailGenitore);

        EventoSensoriale evento = new EventoSensoriale();
        evento.setBambino(bambino);
        evento.setDataOra(richiesta.dataOra());
        evento.setLuogo(richiesta.luogo());
        evento.setStimolo(richiesta.stimolo());
        evento.setReazioneOsservata(richiesta.reazioneOsservata());
        evento.setCosaHaAiutato(richiesta.cosaHaAiutato());
        evento.setIntensita(richiesta.intensita());
        return eventoRepository.save(evento);
    }

    public void elimina(Long bambinoId, Long eventoId, String emailGenitore) {
        bambinoService.trova(bambinoId, emailGenitore);
        EventoSensoriale evento = eventoRepository.findByIdAndBambinoId(eventoId, bambinoId)
                .orElseThrow(() -> new NotFoundException("Evento non trovato"));
        eventoRepository.delete(evento);
    }
}
