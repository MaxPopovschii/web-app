package com.web.web_app.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserDto {
    @NotNull
    @Size(min = 1, max = 30)
    private String name;
    @NotNull
    @Size(min = 1, max = 50)
    private String surname;
    @NotNull
    @Size(min = 1, max = 50)
    @Email
    private String email;
    @NotNull
    private String password;
}
