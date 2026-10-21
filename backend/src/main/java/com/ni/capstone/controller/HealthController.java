package com.ni.capstone.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/** Indirizzo semplice per controllare che il server sia acceso (usato dai servizi di hosting). */
@RestController
@RequestMapping("/api/health")
public class HealthController {

    @GetMapping
    public Map<String, String> stato() {
        return Map.of("status", "ok");
    }
}
