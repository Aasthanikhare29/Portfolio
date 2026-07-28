package com.portfolio.dto.response;

import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class LoginResponse {
    private String token;
    @Builder.Default private String tokenType = "Bearer";
    private UserResponse user;
}
