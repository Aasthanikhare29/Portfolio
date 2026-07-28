package com.portfolio.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "case_study_gallery_images")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class CaseStudyGalleryImage {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "case_study_id", nullable = false)
    private CaseStudy caseStudy;

    @Column(nullable = false)
    private String url;

    private String caption;

    private Integer sortOrder;
}
