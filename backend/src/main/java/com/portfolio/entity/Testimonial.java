package com.portfolio.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "testimonials")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Testimonial {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String role;

    private String company;

    @Column(columnDefinition = "TEXT")
    private String content;

    private Integer rating;

    @Column(name = "avatar_url")
    private String avatarUrl;

    private Boolean featured;

    private Integer sortOrder;
}
