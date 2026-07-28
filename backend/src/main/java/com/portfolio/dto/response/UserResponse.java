package com.portfolio.dto.response;

import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class UserResponse {
    private Long id;
    private String email;
    private String name;
    private String profilePicture;
}
