package com.ni.capstone.controller;

import com.ni.capstone.dto.PostRequest;
import com.ni.capstone.dto.PostResponse;
import com.ni.capstone.model.Post;
import com.ni.capstone.service.PostService;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/post")
@RequiredArgsConstructor
@Tag(name = "Community - post", description = "Post condivisi tra tutti gli utenti registrati")
@SecurityRequirement(name = "bearerAuth")
public class PostController {

    private final PostService postService;

    // La community e' condivisa per scelta: qui non c'e' il controllo "appartenenza" del diario.
    @GetMapping
    public List<PostResponse> elenco(@RequestParam(name = "categoria", required = false) String categoria) {
        return postService.elenco(categoria).stream()
                .map(this::aRisposta)
                .toList();
    }

    @GetMapping("/{id}")
    public PostResponse dettaglio(@PathVariable("id") Long id) {
        return aRisposta(postService.trova(id));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public PostResponse crea(@Valid @RequestBody PostRequest richiesta, Principal principal) {
        return aRisposta(postService.crea(richiesta, principal.getName()));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void elimina(@PathVariable("id") Long id, Principal principal) {
        postService.elimina(id, principal.getName());
    }

    private PostResponse aRisposta(Post post) {
        return PostResponse.from(post, postService.numeroCommenti(post.getId()));
    }
}
