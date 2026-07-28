package com.portfolio.dto.request;

import lombok.*;
import java.util.List;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class ServiceRequest {
    private String title;
    private String description;
    private String icon;
    private String iconColor;
    private String imageUrl;
    private Boolean featured;
    private Integer sortOrder;
    private List<String> features;
}
