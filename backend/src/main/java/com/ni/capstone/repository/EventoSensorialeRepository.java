package com.ni.capstone.repository;

import com.ni.capstone.model.EventoSensoriale;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EventoSensorialeRepository extends JpaRepository<EventoSensoriale, Long> {

    List<EventoSensoriale> findByBambinoIdOrderByDataOraDesc(Long bambinoId);

    Optional<EventoSensoriale> findByIdAndBambinoId(Long id, Long bambinoId);

    void deleteByBambinoId(Long bambinoId);
}
