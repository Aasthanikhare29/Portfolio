package com.portfolio.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class ContactRequest {
    @NotBlank
    private String name;

    @NotBlank @Email
    private String email;

    private String subject;

    @NotBlank
    private String message;
}
