package com.ni.capstone.repository;

import com.ni.capstone.model.Progresso;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProgressoRepository extends JpaRepository<Progresso, Long> {

    List<Progresso> findByBambinoIdOrderByDataDescIdDesc(Long bambinoId);

    Optional<Progresso> findByIdAndBambinoId(Long id, Long bambinoId);

    void deleteByBambinoId(Long bambinoId);
}
