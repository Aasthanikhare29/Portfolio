package com.portfolio.dto.request;

import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class SkillRequest {
    private String name;
    private String category;
    private Integer proficiency;
    private String icon;
    private String iconColor;
    private Integer sortOrder;
}
