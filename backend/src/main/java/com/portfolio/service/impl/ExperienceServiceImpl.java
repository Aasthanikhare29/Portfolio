package com.portfolio.service.impl;

import com.portfolio.dto.request.ExperienceRequest;
import com.portfolio.entity.Experience;
import com.portfolio.entity.ExperienceSkill;
import com.portfolio.exception.ResourceNotFoundException;
import com.portfolio.repository.ExperienceRepository;
import com.portfolio.service.ExperienceService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.IntStream;

@Service
@RequiredArgsConstructor
public class ExperienceServiceImpl implements ExperienceService {

    private final ExperienceRepository experienceRepository;

    @Override
    public List<Experience> getAllExperiences() {
        return experienceRepository.findAllByOrderBySortOrderAsc();
    }

    @Override
    public Experience getExperienceById(Long id) {
        return experienceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Experience", id));
    }

    @Override
    @Transactional
    public Experience createExperience(ExperienceRequest request) {
        Experience exp = Experience.builder()
                .company(request.getCompany())
                .role(request.getRole())
                .location(request.getLocation())
                .description(request.getDescription())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .current(request.getCurrent())
                .companyLogo(request.getCompanyLogo())
                .companyUrl(request.getCompanyUrl())
                .sortOrder(request.getSortOrder())
                .build();

        if (request.getSkills() != null) {
            List<ExperienceSkill> skills = IntStream.range(0, request.getSkills().size())
                    .mapToObj(i -> ExperienceSkill.builder()
                            .experience(exp)
                            .name(request.getSkills().get(i))
                            .sortOrder(i)
                            .build())
                    .toList();
            exp.setSkills(skills);
        }

        return experienceRepository.save(exp);
    }

    @Override
    @Transactional
    public Experience updateExperience(Long id, ExperienceRequest request) {
        Experience exp = getExperienceById(id);
        if (request.getCompany() != null) exp.setCompany(request.getCompany());
        if (request.getRole() != null) exp.setRole(request.getRole());
        if (request.getLocation() != null) exp.setLocation(request.getLocation());
        if (request.getDescription() != null) exp.setDescription(request.getDescription());
        if (request.getStartDate() != null) exp.setStartDate(request.getStartDate());
        if (request.getEndDate() != null) exp.setEndDate(request.getEndDate());
        if (request.getCurrent() != null) exp.setCurrent(request.getCurrent());
        if (request.getCompanyLogo() != null) exp.setCompanyLogo(request.getCompanyLogo());
        if (request.getCompanyUrl() != null) exp.setCompanyUrl(request.getCompanyUrl());
        if (request.getSortOrder() != null) exp.setSortOrder(request.getSortOrder());

        if (request.getSkills() != null) {
            exp.getSkills().clear();
            List<ExperienceSkill> skills = IntStream.range(0, request.getSkills().size())
                    .mapToObj(i -> ExperienceSkill.builder()
                            .experience(exp)
                            .name(request.getSkills().get(i))
                            .sortOrder(i)
                            .build())
                    .toList();
            exp.getSkills().addAll(skills);
        }

        return experienceRepository.save(exp);
    }

    @Override
    @Transactional
    public void deleteExperience(Long id) {
        experienceRepository.delete(getExperienceById(id));
    }
}
