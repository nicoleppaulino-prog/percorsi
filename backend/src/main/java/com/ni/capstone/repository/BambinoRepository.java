package com.ni.capstone.repository;

import com.ni.capstone.model.Bambino;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BambinoRepository extends JpaRepository<Bambino, Long> {

    /** Tutti i bambini di un genitore (cercato per email). */
    List<Bambino> findByGenitoreEmailOrderByIdAsc(String email);

    /** Un bambino, ma solo se appartiene davvero a quel genitore: e' il controllo di privacy. */
    Optional<Bambino> findByIdAndGenitoreEmail(Long id, String email);
}
