package com.ni.capstone.controller;

import com.ni.capstone.dto.CommentoRequest;
import com.ni.capstone.dto.CommentoResponse;
import com.ni.capstone.service.CommentoService;
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
@RequestMapping("/api/post/{postId}/commenti")
@RequiredArgsConstructor
@Tag(name = "Community - commenti", description = "Commenti ai post della community")
@SecurityRequirement(name = "bearerAuth")
public class CommentoController {

    private final CommentoService commentoService;

    @GetMapping
    public List<CommentoResponse> elenco(@PathVariable("postId") Long postId) {
        return commentoService.elenco(postId).stream()
                .map(CommentoResponse::from)
                .toList();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CommentoResponse crea(@PathVariable("postId") Long postId,
                                 @Valid @RequestBody CommentoRequest richiesta,
                                 Principal principal) {
        return CommentoResponse.from(commentoService.crea(postId, richiesta, principal.getName()));
    }

    @DeleteMapping("/{commentoId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void elimina(@PathVariable("postId") Long postId,
                        @PathVariable("commentoId") Long commentoId,
                        Principal principal) {
        commentoService.elimina(postId, commentoId, principal.getName());
    }
}
