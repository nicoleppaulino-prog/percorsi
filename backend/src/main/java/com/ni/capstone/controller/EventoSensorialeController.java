package com.ni.capstone.controller;

import com.ni.capstone.dto.EventoRequest;
import com.ni.capstone.dto.EventoResponse;
import com.ni.capstone.service.EventoSensorialeService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/bambini/{bambinoId}/eventi-sensoriali")
@RequiredArgsConstructor
@Tag(name = "Eventi sensoriali", description = "Episodi di disagio sensoriale di un bambino (solo genitori)")
@SecurityRequirement(name = "bearerAuth")
public class EventoSensorialeController {

    private final EventoSensorialeService eventoService;

    @GetMapping
    public List<EventoResponse> elenco(@PathVariable("bambinoId") Long bambinoId, Principal principal) {
        return eventoService.elenco(bambinoId, principal.getName()).stream()
                .map(EventoResponse::from)
                .toList();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public EventoResponse registra(@PathVariable("bambinoId") Long bambinoId,
                                   @Valid @RequestBody EventoRequest richiesta,
                                   Principal principal) {
        return EventoResponse.from(eventoService.registra(bambinoId, richiesta, principal.getName()));
    }

    @DeleteMapping("/{eventoId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void elimina(@PathVariable("bambinoId") Long bambinoId,
                        @PathVariable("eventoId") Long eventoId,
                        Principal principal) {
        eventoService.elimina(bambinoId, eventoId, principal.getName());
    }
}
