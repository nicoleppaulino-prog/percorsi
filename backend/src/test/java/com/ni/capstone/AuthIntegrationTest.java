package com.ni.capstone;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.util.UUID;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/** Registrazione, login e protezione delle pagine riservate. */
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class AuthIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    private String emailNuova() {
        return "utente-" + UUID.randomUUID() + "@esempio.it";
    }

    private String corpoRegistrazione(String email, String ruolo) {
        return "{\"email\":\"" + email + "\",\"password\":\"password123\",\"nome\":\"Test\",\"ruolo\":\"" + ruolo + "\"}";
    }

    @Test
    void registrazioneRestituisceTokenENonEsponeLaPassword() throws Exception {
        String email = emailNuova();

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(corpoRegistrazione(email, "GENITORE")))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.token").isNotEmpty())
                .andExpect(jsonPath("$.utente.email").value(email))
                .andExpect(jsonPath("$.utente.ruolo").value("GENITORE"))
                .andExpect(jsonPath("$.utente.password").doesNotExist());
    }

    @Test
    void registrareDueVolteLaStessaEmailDaConflitto() throws Exception {
        String email = emailNuova();
        String corpo = corpoRegistrazione(email, "GENITORE");

        mockMvc.perform(post("/api/auth/register").contentType(MediaType.APPLICATION_JSON).content(corpo))
                .andExpect(status().isCreated());
        mockMvc.perform(post("/api/auth/register").contentType(MediaType.APPLICATION_JSON).content(corpo))
                .andExpect(status().isConflict());
    }

    @Test
    void passwordTroppoCortaVieneRifiutataConErroreDiValidazione() throws Exception {
        String corpo = "{\"email\":\"" + emailNuova() + "\",\"password\":\"corta\",\"nome\":\"Test\",\"ruolo\":\"GENITORE\"}";

        mockMvc.perform(post("/api/auth/register").contentType(MediaType.APPLICATION_JSON).content(corpo))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").isNotEmpty());
    }

    @Test
    void loginConPasswordSbagliataDa401() throws Exception {
        String email = emailNuova();
        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(corpoRegistrazione(email, "GENITORE")))
                .andExpect(status().isCreated());

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"email\":\"" + email + "\",\"password\":\"sbagliata123\"}"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void loginCorrettoRestituisceToken() throws Exception {
        String email = emailNuova();
        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(corpoRegistrazione(email, "UTENTE_COMMUNITY")))
                .andExpect(status().isCreated());

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"email\":\"" + email + "\",\"password\":\"password123\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").isNotEmpty());
    }

    @Test
    void senzaTokenLeRisorseProtetteDanno401() throws Exception {
        mockMvc.perform(get("/api/bambini")).andExpect(status().isUnauthorized());
        mockMvc.perform(get("/api/post")).andExpect(status().isUnauthorized());
    }

    @Test
    void chiNonEGenitoreNonPuoUsareIlDiario() throws Exception {
        String email = emailNuova();
        String risposta = mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(corpoRegistrazione(email, "UTENTE_COMMUNITY")))
                .andReturn().getResponse().getContentAsString();
        String token = objectMapper.readTree(risposta).get("token").asText();

        mockMvc.perform(get("/api/bambini").header("Authorization", "Bearer " + token))
                .andExpect(status().isForbidden());
        // ...ma la community e' aperta a tutti gli utenti registrati
        mockMvc.perform(get("/api/post").header("Authorization", "Bearer " + token))
                .andExpect(status().isOk());
    }
}
