package com.ni.capstone.service;

import com.ni.capstone.dto.PostRequest;
import com.ni.capstone.exception.NotFoundException;
import com.ni.capstone.model.Post;
import com.ni.capstone.model.User;
import com.ni.capstone.repository.CommentoRepository;
import com.ni.capstone.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final CommentoRepository commentoRepository;
    private final UserService userService;

    /** Tutti i post, dal piu' recente; se si indica una categoria, solo quelli di quella categoria. */
    public List<Post> elenco(String categoria) {
        if (categoria == null || categoria.isBlank()) {
            return postRepository.findAllByOrderByDataCreazioneDesc();
        }
        return postRepository.findByCategoriaOrderByDataCreazioneDesc(categoria);
    }

    public Post trova(Long id) {
        return postRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Post non trovato"));
    }

    public long numeroCommenti(Long postId) {
        return commentoRepository.countByPostId(postId);
    }

    public Post crea(PostRequest richiesta, String emailAutore) {
        User autore = userService.trovaPerEmail(emailAutore);

        Post post = new Post();
        post.setTitolo(richiesta.titolo().trim());
        post.setTesto(richiesta.testo().trim());
        post.setCategoria(richiesta.categoria());
        post.setAutore(autore);
        post.setDataCreazione(LocalDateTime.now());
        return postRepository.save(post);
    }

    /** Solo l'autore puo' eliminare il proprio post (i commenti spariscono con lui). */
    @Transactional
    public void elimina(Long id, String emailRichiedente) {
        Post post = trova(id);
        if (!post.getAutore().getEmail().equals(emailRichiedente)) {
            throw new AccessDeniedException("Puoi eliminare solo i tuoi post");
        }
        postRepository.delete(post);
    }
}
