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

/** Un momento in cui il bambino ha reagito forte a uno stimolo (rumore, luce, folla...). */
@Entity
@Table(name = "eventi_sensoriali")
@Getter
@Setter
@NoArgsConstructor
public class EventoSensoriale {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDateTime dataOra;

    private String luogo;

    /** Cosa ha scatenato la reazione. Piu' stimoli sono separati da virgola (es. "Rumore, Luci"). */
    private String stimolo;

    @Column(length = 1000)
    private String reazioneOsservata;

    @Column(length = 1000)
    private String cosaHaAiutato;

    /** Da 1 (lieve) a 5 (molto forte). */
    @Column(nullable = false)
    private Integer intensita;

    @ManyToOne(optional = false)
    @JoinColumn(name = "bambino_id", nullable = false)
    private Bambino bambino;
}
