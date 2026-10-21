package com.ni.capstone.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * Il "buttafuori": gira una volta per ogni richiesta, prima dei controller.
 * Se trova un token valido nell'header "Authorization: Bearer ...", dice a Spring chi e' l'utente.
 * Se il token manca o non e' valido non blocca nulla: sara' la SecurityConfig a decidere
 * se quell'indirizzo richiede il login.
 */
@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final CustomUserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        String intestazione = request.getHeader("Authorization");

        if (intestazione != null
                && intestazione.startsWith("Bearer ")
                && SecurityContextHolder.getContext().getAuthentication() == null) {

            String token = intestazione.substring(7);

            if (jwtUtil.isTokenValido(token)) {
                try {
                    String email = jwtUtil.estraiEmail(token);
                    UserDetails utente = userDetailsService.loadUserByUsername(email);

                    UsernamePasswordAuthenticationToken autenticazione =
                            new UsernamePasswordAuthenticationToken(utente, null, utente.getAuthorities());
                    autenticazione.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(autenticazione);
                } catch (UsernameNotFoundException e) {
                    // L'utente del token non esiste piu': il token viene semplicemente ignorato.
                }
            }
        }

        filterChain.doFilter(request, response);
    }
}
