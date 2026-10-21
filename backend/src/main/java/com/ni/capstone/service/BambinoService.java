package com.ni.capstone.service;

import com.ni.capstone.dto.BambinoRequest;
import com.ni.capstone.exception.NotFoundException;
import com.ni.capstone.model.Bambino;
import com.ni.capstone.model.User;
import com.ni.capstone.repository.BambinoRepository;
import com.ni.capstone.repository.EventoSensorialeRepository;
import com.ni.capstone.repository.ProgressoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BambinoService {

    private final BambinoRepository bambinoRepository;
    private final EventoSensorialeRepository eventoRepository;
    private final ProgressoRepository progressoRepository;
    private final UserService userService;

    public List<Bambino> elenco(String emailGenitore) {
        return bambinoRepository.findByGenitoreEmailOrderByIdAsc(emailGenitore);
    }

    public Bambino crea(BambinoRequest richiesta, String emailGenitore) {
        User genitore = userService.trovaPerEmail(emailGenitore);

        Bambino bambino = new Bambino();
        bambino.setNome(richiesta.nome().trim());
        bambino.setEta(richiesta.eta());
        bambino.setNoteGenerali(richiesta.noteGenerali());
        bambino.setGenitore(genitore);
        return bambinoRepository.save(bambino);
    }

    /**
     * Controllo di privacy usato da tutto il diario: restituisce il bambino solo se e' di questo genitore.
     * Se e' di un altro risponde "non trovato", cosi' non si rivela nemmeno che esiste.
     */
    public Bambino trova(Long id, String emailGenitore) {
        return bambinoRepository.findByIdAndGenitoreEmail(id, emailGenitore)
                .orElseThrow(() -> new NotFoundException("Bambino non trovato"));
    }

    @Transactional
    public void elimina(Long id, String emailGenitore) {
        Bambino bambino = trova(id, emailGenitore);
        eventoRepository.deleteByBambinoId(id);
        progressoRepository.deleteByBambinoId(id);
        bambinoRepository.delete(bambino);
    }
}
