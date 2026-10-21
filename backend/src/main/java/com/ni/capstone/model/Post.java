package com.ni.capstone.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/** Un messaggio pubblicato nella community. */
@Entity
@Table(name = "post")
@Getter
@Setter
@NoArgsConstructor
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String titolo;

    @Column(nullable = false, length = 5000)
    private String testo;

    private String categoria;

    @Column(nullable = false)
    private LocalDateTime dataCreazione;

    @ManyToOne(optional = false)
    @JoinColumn(name = "autore_id", nullable = false)
    private User autore;

    /**
     * Serve solo per la cancellazione a cascata: eliminando un post spariscono anche i suoi commenti.
     * Non viene mai inviata al frontend (lo fanno i DTO).
     */
    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Commento> commenti = new ArrayList<>();
}
