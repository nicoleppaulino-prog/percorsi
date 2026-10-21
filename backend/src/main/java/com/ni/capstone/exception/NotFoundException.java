package com.ni.capstone.exception;

/** La risorsa richiesta non esiste (oppure non appartiene a chi la chiede). Diventa un errore 404. */
public class NotFoundException extends RuntimeException {

    public NotFoundException(String message) {
        super(message);
    }
}
