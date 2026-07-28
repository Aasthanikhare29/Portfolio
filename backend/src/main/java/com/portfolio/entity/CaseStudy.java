package com.portfolio.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "case_studies")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class CaseStudy {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    private String slug;

    @Column(nullable = false)
    private String client;

    private String role;
    private String duration;

    @Column(columnDefinition = "TEXT")
    private String overview;

    @Column(columnDefinition = "TEXT")
    private String challenge;

    @Column(columnDefinition = "TEXT")
    private String solution;

    @Column(columnDefinition = "TEXT")
    private String results;

    @Column(name = "cover_image")
    private String coverImage;

    @Column(name = "project_url")
    private String projectUrl;

    private Boolean featured;

    @Column(name = "completion_date")
    private LocalDate completionDate;

    @Column(name = "created_at")
    private LocalDate createdAt;

    @OneToMany(mappedBy = "caseStudy", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<CaseStudyGalleryImage> galleryImages = new ArrayList<>();
}
