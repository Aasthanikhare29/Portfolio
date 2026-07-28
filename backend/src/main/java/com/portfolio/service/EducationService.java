package com.portfolio.service;

import com.portfolio.dto.request.EducationRequest;
import com.portfolio.entity.Education;
import java.util.List;

public interface EducationService {
    List<Education> getAllEducations();
    Education getEducationById(Long id);
    Education createEducation(EducationRequest request);
    Education updateEducation(Long id, EducationRequest request);
    void deleteEducation(Long id);
}
