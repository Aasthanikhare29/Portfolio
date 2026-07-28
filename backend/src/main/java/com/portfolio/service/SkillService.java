package com.portfolio.service;

import com.portfolio.dto.request.SkillRequest;
import com.portfolio.entity.Skill;
import java.util.List;

public interface SkillService {
    List<Skill> getAllSkills();
    Skill getSkillById(Long id);
    Skill createSkill(SkillRequest request);
    Skill updateSkill(Long id, SkillRequest request);
    void deleteSkill(Long id);
}
