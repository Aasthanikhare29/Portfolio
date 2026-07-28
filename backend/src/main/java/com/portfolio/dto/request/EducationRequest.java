package com.portfolio.dto.request;

import lombok.*;
import java.time.LocalDate;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class EducationRequest {
    private String institution;
    private String degree;
    private String field;
    private String description;
    private LocalDate startDate;
    private LocalDate endDate;
    private Double gpa;
    private String institutionLogo;
    private Integer sortOrder;
}
