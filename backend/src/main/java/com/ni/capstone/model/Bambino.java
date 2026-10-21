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

/** La persona seguita nel diario. Appartiene a un solo genitore. */
@Entity
@Table(name = "bambini")
@Getter
@Setter
@NoArgsConstructor
public class Bambino {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    private Integer eta;

    @Column(length = 2000)
    private String noteGenerali;

    @ManyToOne(optional = false)
    @JoinColumn(name = "genitore_id", nullable = false)
    private User genitore;
}
