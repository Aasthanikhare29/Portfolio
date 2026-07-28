package com.portfolio.service.impl;

import com.portfolio.dto.request.EducationRequest;
import com.portfolio.entity.Education;
import com.portfolio.exception.ResourceNotFoundException;
import com.portfolio.repository.EducationRepository;
import com.portfolio.service.EducationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EducationServiceImpl implements EducationService {

    private final EducationRepository educationRepository;

    @Override
    public List<Education> getAllEducations() {
        return educationRepository.findAllByOrderBySortOrderAsc();
    }

    @Override
    public Education getEducationById(Long id) {
        return educationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Education", id));
    }

    @Override
    @Transactional
    public Education createEducation(EducationRequest request) {
        Education edu = Education.builder()
                .institution(request.getInstitution())
                .degree(request.getDegree())
                .field(request.getField())
                .description(request.getDescription())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .gpa(request.getGpa())
                .institutionLogo(request.getInstitutionLogo())
                .sortOrder(request.getSortOrder())
                .build();
        return educationRepository.save(edu);
    }

    @Override
    @Transactional
    public Education updateEducation(Long id, EducationRequest request) {
        Education edu = getEducationById(id);
        if (request.getInstitution() != null) edu.setInstitution(request.getInstitution());
        if (request.getDegree() != null) edu.setDegree(request.getDegree());
        if (request.getField() != null) edu.setField(request.getField());
        if (request.getDescription() != null) edu.setDescription(request.getDescription());
        if (request.getStartDate() != null) edu.setStartDate(request.getStartDate());
        if (request.getEndDate() != null) edu.setEndDate(request.getEndDate());
        if (request.getGpa() != null) edu.setGpa(request.getGpa());
        if (request.getInstitutionLogo() != null) edu.setInstitutionLogo(request.getInstitutionLogo());
        if (request.getSortOrder() != null) edu.setSortOrder(request.getSortOrder());
        return educationRepository.save(edu);
    }

    @Override
    @Transactional
    public void deleteEducation(Long id) {
        educationRepository.delete(getEducationById(id));
    }
}
