package com.portfolio.dto.request;

import lombok.*;
import java.util.Set;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class BlogRequest {
    private String title;
    private String slug;
    private String content;
    private String excerpt;
    private String coverImage;
    private Integer readTime;
    private Boolean published;
    private Set<String> tags;
}
