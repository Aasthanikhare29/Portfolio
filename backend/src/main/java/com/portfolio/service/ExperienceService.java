package com.portfolio.service;

import com.portfolio.dto.request.ExperienceRequest;
import com.portfolio.entity.Experience;
import java.util.List;

public interface ExperienceService {
    List<Experience> getAllExperiences();
    Experience getExperienceById(Long id);
    Experience createExperience(ExperienceRequest request);
    Experience updateExperience(Long id, ExperienceRequest request);
    void deleteExperience(Long id);
}
