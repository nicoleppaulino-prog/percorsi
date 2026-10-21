package com.ni.capstone.exception;

import com.ni.capstone.dto.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.util.LinkedHashMap;
import java.util.Map;

/**
 * Trasforma ogni eccezione in una risposta JSON con lo stesso formato ({"message": "..."}),
 * cosi' il frontend sa sempre come leggere un errore.
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ErrorResponse> nonTrovato(NotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse(ex.getMessage()));
    }

    @ExceptionHandler(ConflictException.class)
    public ResponseEntity<ErrorResponse> conflitto(ConflictException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(new ErrorResponse(ex.getMessage()));
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ErrorResponse> vietato(AccessDeniedException ex) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new ErrorResponse(ex.getMessage()));
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ErrorResponse> credenzialiErrate(BadCredentialsException ex) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(new ErrorResponse("Email o password non corretti"));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> validazione(MethodArgumentNotValidException ex) {
        Map<String, String> errori = new LinkedHashMap<>();
        for (FieldError errore : ex.getBindingResult().getFieldErrors()) {
            errori.putIfAbsent(errore.getField(), errore.getDefaultMessage());
        }
        String messaggio = errori.values().stream().findFirst().orElse("Dati non validi");
        return ResponseEntity.badRequest().body(new ErrorResponse(messaggio, errori));
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ErrorResponse> corpoIllegibile(HttpMessageNotReadableException ex) {
        return ResponseEntity.badRequest().body(new ErrorResponse("Richiesta non valida: controlla i dati inviati"));
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ErrorResponse> parametroErrato(MethodArgumentTypeMismatchException ex) {
        return ResponseEntity.badRequest().body(new ErrorResponse("Parametro non valido: " + ex.getName()));
    }
}
