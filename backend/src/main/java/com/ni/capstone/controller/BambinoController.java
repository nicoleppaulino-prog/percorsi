package com.ni.capstone.controller;

import com.ni.capstone.dto.BambinoRequest;
import com.ni.capstone.dto.BambinoResponse;
import com.ni.capstone.service.BambinoService;
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
@RequestMapping("/api/bambini")
@RequiredArgsConstructor
@Tag(name = "Bambini", description = "I bambini seguiti nel diario (solo genitori)")
@SecurityRequirement(name = "bearerAuth")
public class BambinoController {

    private final BambinoService bambinoService;

    @GetMapping
    public List<BambinoResponse> elenco(Principal principal) {
        return bambinoService.elenco(principal.getName()).stream()
                .map(BambinoResponse::from)
                .toList();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public BambinoResponse crea(@Valid @RequestBody BambinoRequest richiesta, Principal principal) {
        return BambinoResponse.from(bambinoService.crea(richiesta, principal.getName()));
    }

    @GetMapping("/{id}")
    public BambinoResponse dettaglio(@PathVariable("id") Long id, Principal principal) {
        return BambinoResponse.from(bambinoService.trova(id, principal.getName()));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void elimina(@PathVariable("id") Long id, Principal principal) {
        bambinoService.elimina(id, principal.getName());
    }
}
