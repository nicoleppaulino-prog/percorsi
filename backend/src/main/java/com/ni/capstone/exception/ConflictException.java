package com.ni.capstone.exception;

/** L'operazione e' in conflitto con i dati esistenti (es. email gia' registrata). Diventa un errore 409. */
public class ConflictException extends RuntimeException {

    public ConflictException(String message) {
        super(message);
    }
}
