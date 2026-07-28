package com.portfolio.dto.request;

import lombok.*;
import java.time.LocalDate;
import java.util.List;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class ExperienceRequest {
    private String company;
    private String role;
    private String location;
    private String description;
    private LocalDate startDate;
    private LocalDate endDate;
    private Boolean current;
    private String companyLogo;
    private String companyUrl;
    private Integer sortOrder;
    private List<String> skills;
}
