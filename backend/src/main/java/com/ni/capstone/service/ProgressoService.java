package com.ni.capstone.service;

import com.ni.capstone.dto.ProgressoRequest;
import com.ni.capstone.exception.NotFoundException;
import com.ni.capstone.model.Bambino;
import com.ni.capstone.model.Progresso;
import com.ni.capstone.repository.ProgressoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProgressoService {

    private final ProgressoRepository progressoRepository;
    private final BambinoService bambinoService;

    public List<Progresso> elenco(Long bambinoId, String emailGenitore) {
        bambinoService.trova(bambinoId, emailGenitore);
        return progressoRepository.findByBambinoIdOrderByDataDescIdDesc(bambinoId);
    }

    public Progresso registra(Long bambinoId, ProgressoRequest richiesta, String emailGenitore) {
        Bambino bambino = bambinoService.trova(bambinoId, emailGenitore);

        Progresso progresso = new Progresso();
        progresso.setBambino(bambino);
        progresso.setData(richiesta.data());
        progresso.setArea(richiesta.area().trim());
        progresso.setNota(richiesta.nota());
        return progressoRepository.save(progresso);
    }

    public void elimina(Long bambinoId, Long progressoId, String emailGenitore) {
        bambinoService.trova(bambinoId, emailGenitore);
        Progresso progresso = progressoRepository.findByIdAndBambinoId(progressoId, bambinoId)
                .orElseThrow(() -> new NotFoundException("Progresso non trovato"));
        progressoRepository.delete(progresso);
    }
}
