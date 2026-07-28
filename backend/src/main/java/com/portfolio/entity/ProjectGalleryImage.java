package com.portfolio.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "project_gallery_images")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class ProjectGalleryImage {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

    @Column(nullable = false)
    private String url;

    private String caption;

    private Integer sortOrder;
}
