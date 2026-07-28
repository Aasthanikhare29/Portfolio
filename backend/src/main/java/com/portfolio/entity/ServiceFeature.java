package com.portfolio.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "service_features")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class ServiceFeature {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "service_id", nullable = false)
    private PortfolioService service;

    @Column(nullable = false)
    private String feature;

    private Integer sortOrder;
}
