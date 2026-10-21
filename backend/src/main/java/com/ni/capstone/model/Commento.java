package com.ni.capstone.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

/** Una risposta a un post della community. */
@Entity
@Table(name = "commenti")
@Getter
@Setter
@NoArgsConstructor
public class Commento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 2000)
    private String testo;

    @Column(nullable = false)
    private LocalDateTime dataCreazione;

    @ManyToOne(optional = false)
    @JoinColumn(name = "autore_id", nullable = false)
    private User autore;

    @ManyToOne(optional = false)
    @JoinColumn(name = "post_id", nullable = false)
    private Post post;
}
