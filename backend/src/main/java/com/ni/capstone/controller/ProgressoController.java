package com.ni.capstone.controller;

import com.ni.capstone.dto.ProgressoRequest;
import com.ni.capstone.dto.ProgressoResponse;
import com.ni.capstone.service.ProgressoService;
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
@RequestMapping("/api/bambini/{bambinoId}/progressi")
@RequiredArgsConstructor
@Tag(name = "Progressi", description = "Note sui progressi di un bambino (solo genitori)")
@SecurityRequirement(name = "bearerAuth")
public class ProgressoController {

    private final ProgressoService progressoService;

    @GetMapping
    public List<ProgressoResponse> elenco(@PathVariable("bambinoId") Long bambinoId, Principal principal) {
        return progressoService.elenco(bambinoId, principal.getName()).stream()
                .map(ProgressoResponse::from)
                .toList();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ProgressoResponse registra(@PathVariable("bambinoId") Long bambinoId,
                                      @Valid @RequestBody ProgressoRequest richiesta,
                                      Principal principal) {
        return ProgressoResponse.from(progressoService.registra(bambinoId, richiesta, principal.getName()));
    }

    @DeleteMapping("/{progressoId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void elimina(@PathVariable("bambinoId") Long bambinoId,
                        @PathVariable("progressoId") Long progressoId,
                        Principal principal) {
        progressoService.elimina(bambinoId, progressoId, principal.getName());
    }
}
