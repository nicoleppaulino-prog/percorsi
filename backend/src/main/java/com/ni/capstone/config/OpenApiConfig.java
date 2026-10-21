package com.ni.capstone.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import org.springframework.context.annotation.Configuration;

/**
 * Configura la documentazione Swagger: disponibile su /swagger-ui.html.
 * Il pulsante "Authorize" permette di incollare il token JWT ottenuto dal login.
 */
@Configuration
@OpenAPIDefinition(info = @Info(
        title = "Percorsi API",
        version = "1.0",
        description = "API del diario per famiglie di bambini con autismo e della community di Percorsi."))
@SecurityScheme(
        name = "bearerAuth",
        type = SecuritySchemeType.HTTP,
        scheme = "bearer",
        bearerFormat = "JWT")
public class OpenApiConfig {
}
