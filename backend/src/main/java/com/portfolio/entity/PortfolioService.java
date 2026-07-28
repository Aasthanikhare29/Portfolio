package com.portfolio.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "portfolio_services")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class PortfolioService {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String icon;

    @Column(name = "icon_color")
    private String iconColor;

    @Column(name = "image_url")
    private String imageUrl;

    private Boolean featured;

    private Integer sortOrder;

    @OneToMany(mappedBy = "service", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<ServiceFeature> features = new ArrayList<>();
}
