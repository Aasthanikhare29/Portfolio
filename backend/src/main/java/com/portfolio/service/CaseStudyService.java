package com.portfolio.service;

import com.portfolio.entity.CaseStudy;
import java.util.List;

public interface CaseStudyService {
    List<CaseStudy> getAllCaseStudies();
    CaseStudy getCaseStudyById(Long id);
    CaseStudy getCaseStudyBySlug(String slug);
    CaseStudy createCaseStudy(CaseStudy caseStudy);
    CaseStudy updateCaseStudy(Long id, CaseStudy caseStudy);
    void deleteCaseStudy(Long id);
}
