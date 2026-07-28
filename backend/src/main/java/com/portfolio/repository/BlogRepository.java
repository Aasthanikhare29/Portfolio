package com.portfolio.repository;

import com.portfolio.entity.Blog;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface BlogRepository extends JpaRepository<Blog, Long> {
    List<Blog> findAllByOrderByCreatedAtDesc();
    List<Blog> findByPublishedTrueOrderByPublishedAtDesc();
    Optional<Blog> findBySlug(String slug);
}
