package com.portfolio.dto.request;

import lombok.*;
import java.time.LocalDate;
import java.util.List;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class ProjectRequest {
    private String title;
    private String slug;
    private String description;
    private String shortSummary;
    private String techStack;
    private String liveUrl;
    private String githubUrl;
    private String coverImage;
    private String category;
    private LocalDate startDate;
    private LocalDate endDate;
    private Boolean featured;
    private Integer sortOrder;
    private List<String> technologies;
    private List<String> features;
    private List<String> galleryImages;
    private List<String> galleryCaptions;
}
