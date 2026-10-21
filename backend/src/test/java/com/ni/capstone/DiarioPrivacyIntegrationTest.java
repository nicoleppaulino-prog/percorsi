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

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/** Il diario e' privato: ogni genitore vede solo i dati dei propri bambini. */
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class DiarioPrivacyIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    private String registraGenitore() throws Exception {
        String corpo = "{\"email\":\"genitore-" + UUID.randomUUID()
                + "@esempio.it\",\"password\":\"password123\",\"nome\":\"Genitore\",\"ruolo\":\"GENITORE\"}";
        String risposta = mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(corpo))
                .andReturn().getResponse().getContentAsString();
        return "Bearer " + objectMapper.readTree(risposta).get("token").asText();
    }

    private long creaBambino(String autorizzazione) throws Exception {
        String risposta = mockMvc.perform(post("/api/bambini")
                        .header("Authorization", autorizzazione)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"nome\":\"Marco\",\"eta\":7,\"noteGenerali\":\"Ama i treni\"}"))
                .andExpect(status().isCreated())
                .andReturn().getResponse().getContentAsString();
        return objectMapper.readTree(risposta).get("id").asLong();
    }

    @Test
    void ilGenitoreRegistraEVedeUnEventoSensoriale() throws Exception {
        String genitore = registraGenitore();
        long bambinoId = creaBambino(genitore);

        mockMvc.perform(post("/api/bambini/" + bambinoId + "/eventi-sensoriali")
                        .header("Authorization", genitore)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"dataOra\":\"2026-10-20T14:30\",\"luogo\":\"Supermercato\","
                                + "\"stimolo\":\"Rumore, Luci\",\"intensita\":4}"))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.intensita").value(4));

        mockMvc.perform(get("/api/bambini/" + bambinoId + "/eventi-sensoriali")
                        .header("Authorization", genitore))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].luogo").value("Supermercato"));
    }

    @Test
    void lIntensitaFuoriScalaVieneRifiutata() throws Exception {
        String genitore = registraGenitore();
        long bambinoId = creaBambino(genitore);

        mockMvc.perform(post("/api/bambini/" + bambinoId + "/eventi-sensoriali")
                        .header("Authorization", genitore)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"dataOra\":\"2026-10-20T14:30\",\"intensita\":9}"))
                .andExpect(status().isBadRequest());
    }

    @Test
    void unAltroGenitoreNonVedeNeModificaIDatiDegliAltri() throws Exception {
        String proprietario = registraGenitore();
        String estraneo = registraGenitore();
        long bambinoId = creaBambino(proprietario);

        mockMvc.perform(get("/api/bambini/" + bambinoId).header("Authorization", estraneo))
                .andExpect(status().isNotFound());
        mockMvc.perform(get("/api/bambini/" + bambinoId + "/eventi-sensoriali").header("Authorization", estraneo))
                .andExpect(status().isNotFound());
        mockMvc.perform(delete("/api/bambini/" + bambinoId).header("Authorization", estraneo))
                .andExpect(status().isNotFound());

        // il proprietario, invece, lo vede
        mockMvc.perform(get("/api/bambini/" + bambinoId).header("Authorization", proprietario))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nome").value("Marco"));
    }

    @Test
    void nellaCommunitySoloLAutorePuoEliminareIlProprioPost() throws Exception {
        String autore = registraGenitore();
        String altro = registraGenitore();

        String risposta = mockMvc.perform(post("/api/post")
                        .header("Authorization", autore)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"titolo\":\"Consigli per la scuola\",\"testo\":\"Come vi trovate?\",\"categoria\":\"Scuola\"}"))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.autore.email").doesNotExist())
                .andReturn().getResponse().getContentAsString();
        long postId = objectMapper.readTree(risposta).get("id").asLong();

        mockMvc.perform(delete("/api/post/" + postId).header("Authorization", altro))
                .andExpect(status().isForbidden());
        mockMvc.perform(delete("/api/post/" + postId).header("Authorization", autore))
                .andExpect(status().isNoContent());
    }
}
