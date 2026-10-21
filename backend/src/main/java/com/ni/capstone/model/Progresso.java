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

import java.time.LocalDate;

/** Una nota su un passo avanti del bambino (comunicazione, autonomia, socialita'...). */
@Entity
@Table(name = "progressi")
@Getter
@Setter
@NoArgsConstructor
public class Progresso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDate data;

    @Column(nullable = false)
    private String area;

    @Column(length = 2000)
    private String nota;

    @ManyToOne(optional = false)
    @JoinColumn(name = "bambino_id", nullable = false)
    private Bambino bambino;
}
