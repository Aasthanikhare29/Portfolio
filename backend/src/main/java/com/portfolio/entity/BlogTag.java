package com.portfolio.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "blog_tags")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class BlogTag {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @ManyToMany(mappedBy = "tags")
    @Builder.Default
    private Set<Blog> blogs = new HashSet<>();
}
