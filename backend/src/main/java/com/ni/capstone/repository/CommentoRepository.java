package com.ni.capstone.repository;

import com.ni.capstone.model.Commento;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentoRepository extends JpaRepository<Commento, Long> {

    List<Commento> findByPostIdOrderByDataCreazioneAsc(Long postId);

    long countByPostId(Long postId);
}
