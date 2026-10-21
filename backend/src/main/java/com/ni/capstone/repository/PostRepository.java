package com.ni.capstone.repository;

import com.ni.capstone.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {

    List<Post> findAllByOrderByDataCreazioneDesc();

    List<Post> findByCategoriaOrderByDataCreazioneDesc(String categoria);
}
