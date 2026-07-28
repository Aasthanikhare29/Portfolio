package com.portfolio.service.impl;

import com.portfolio.dto.request.SkillRequest;
import com.portfolio.entity.Skill;
import com.portfolio.exception.ResourceNotFoundException;
import com.portfolio.repository.SkillRepository;
import com.portfolio.service.SkillService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SkillServiceImpl implements SkillService {

    private final SkillRepository skillRepository;

    @Override
    public List<Skill> getAllSkills() {
        return skillRepository.findAllByOrderBySortOrderAsc();
    }

    @Override
    public Skill getSkillById(Long id) {
        return skillRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Skill", id));
    }

    @Override
    @Transactional
    public Skill createSkill(SkillRequest request) {
        Skill skill = Skill.builder()
                .name(request.getName())
                .category(request.getCategory())
                .proficiency(request.getProficiency())
                .icon(request.getIcon())
                .iconColor(request.getIconColor())
                .sortOrder(request.getSortOrder())
                .build();
        return skillRepository.save(skill);
    }

    @Override
    @Transactional
    public Skill updateSkill(Long id, SkillRequest request) {
        Skill skill = getSkillById(id);
        if (request.getName() != null) skill.setName(request.getName());
        if (request.getCategory() != null) skill.setCategory(request.getCategory());
        if (request.getProficiency() != null) skill.setProficiency(request.getProficiency());
        if (request.getIcon() != null) skill.setIcon(request.getIcon());
        if (request.getIconColor() != null) skill.setIconColor(request.getIconColor());
        if (request.getSortOrder() != null) skill.setSortOrder(request.getSortOrder());
        return skillRepository.save(skill);
    }

    @Override
    @Transactional
    public void deleteSkill(Long id) {
        skillRepository.delete(getSkillById(id));
    }
}
