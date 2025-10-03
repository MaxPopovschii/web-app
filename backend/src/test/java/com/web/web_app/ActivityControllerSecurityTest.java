package com.web.web_app;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class ActivityControllerSecurityTest {
    @Autowired
    private MockMvc mockMvc;

    @Test
    @WithMockUser(username = "admin@ecopasso.com", authorities = {"ADMIN"})
    void adminCanAccessActivities() throws Exception {
        mockMvc.perform(get("/api/activities").accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(username = "user@ecopasso.com", authorities = {"USER"})
    void userCanAccessActivities() throws Exception {
        mockMvc.perform(get("/api/activities").accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(username = "guest@ecopasso.com", authorities = {"GUEST"})
    void guestCannotAccessActivities() throws Exception {
        mockMvc.perform(get("/api/activities").accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isForbidden());
    }
}
