package com.portfolio.dto.request;

import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class TestimonialRequest {
    private String name;
    private String role;
    private String company;
    private String content;
    private Integer rating;
    private String avatarUrl;
    private Boolean featured;
    private Integer sortOrder;
}
