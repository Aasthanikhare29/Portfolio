package com.portfolio.repository;

import com.portfolio.entity.BlogTag;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface BlogTagRepository extends JpaRepository<BlogTag, Long> {
    Optional<BlogTag> findByName(String name);
}
