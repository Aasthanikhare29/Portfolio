package com.portfolio.repository;

import com.portfolio.entity.Skill;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SkillRepository extends JpaRepository<Skill, Long> {
    List<Skill> findAllByOrderBySortOrderAsc();
    List<Skill> findByCategoryOrderBySortOrderAsc(String category);
}
