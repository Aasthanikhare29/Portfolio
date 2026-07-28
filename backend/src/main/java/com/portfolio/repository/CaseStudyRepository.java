package com.portfolio.repository;

import com.portfolio.entity.CaseStudy;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface CaseStudyRepository extends JpaRepository<CaseStudy, Long> {
    List<CaseStudy> findAllByOrderByCompletionDateDesc();
    List<CaseStudy> findByFeaturedTrueOrderByCompletionDateDesc();
    Optional<CaseStudy> findBySlug(String slug);
}
