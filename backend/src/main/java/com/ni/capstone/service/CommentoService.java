package com.ni.capstone.service;

import com.ni.capstone.dto.CommentoRequest;
import com.ni.capstone.exception.NotFoundException;
import com.ni.capstone.model.Commento;
import com.ni.capstone.model.Post;
import com.ni.capstone.model.User;
import com.ni.capstone.repository.CommentoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentoService {

    private final CommentoRepository commentoRepository;
    private final PostService postService;
    private final UserService userService;

    public List<Commento> elenco(Long postId) {
        postService.trova(postId); // se il post non esiste -> 404
        return commentoRepository.findByPostIdOrderByDataCreazioneAsc(postId);
    }

    public Commento crea(Long postId, CommentoRequest richiesta, String emailAutore) {
        Post post = postService.trova(postId);
        User autore = userService.trovaPerEmail(emailAutore);

        Commento commento = new Commento();
        commento.setPost(post);
        commento.setAutore(autore);
        commento.setTesto(richiesta.testo().trim());
        commento.setDataCreazione(LocalDateTime.now());
        return commentoRepository.save(commento);
    }

    /** Solo l'autore puo' eliminare il proprio commento. */
    public void elimina(Long postId, Long commentoId, String emailRichiedente) {
        Commento commento = commentoRepository.findById(commentoId)
                .filter(c -> c.getPost().getId().equals(postId))
                .orElseThrow(() -> new NotFoundException("Commento non trovato"));

        if (!commento.getAutore().getEmail().equals(emailRichiedente)) {
            throw new AccessDeniedException("Puoi eliminare solo i tuoi commenti");
        }
        commentoRepository.delete(commento);
    }
}
