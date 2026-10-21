package com.ni.capstone.service;

import com.ni.capstone.dto.RegisterRequest;
import com.ni.capstone.exception.ConflictException;
import com.ni.capstone.exception.NotFoundException;
import com.ni.capstone.model.User;
import com.ni.capstone.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public User registra(RegisterRequest richiesta) {
        String email = richiesta.email().trim().toLowerCase();

        if (userRepository.existsByEmail(email)) {
            throw new ConflictException("Esiste già un account con questa email");
        }

        User utente = new User();
        utente.setEmail(email);
        // La password non viene mai salvata in chiaro: si salva solo il suo "trito" bcrypt.
        utente.setPassword(passwordEncoder.encode(richiesta.password()));
        utente.setNome(richiesta.nome().trim());
        utente.setRuolo(richiesta.ruolo());
        return userRepository.save(utente);
    }

    public User trovaPerEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException("Utente non trovato"));
    }
}
