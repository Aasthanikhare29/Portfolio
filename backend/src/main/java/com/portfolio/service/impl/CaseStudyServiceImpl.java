package com.portfolio.service.impl;

import com.portfolio.entity.CaseStudy;
import com.portfolio.exception.ResourceNotFoundException;
import com.portfolio.repository.CaseStudyRepository;
import com.portfolio.service.CaseStudyService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CaseStudyServiceImpl implements CaseStudyService {

    private final CaseStudyRepository caseStudyRepository;

    @Override
    public List<CaseStudy> getAllCaseStudies() {
        return caseStudyRepository.findAllByOrderByCompletionDateDesc();
    }

    @Override
    public CaseStudy getCaseStudyById(Long id) {
        return caseStudyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("CaseStudy", id));
    }

    @Override
    public CaseStudy getCaseStudyBySlug(String slug) {
        return caseStudyRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("CaseStudy not found with slug: " + slug));
    }

    @Override
    @Transactional
    public CaseStudy createCaseStudy(CaseStudy caseStudy) {
        if (caseStudy.getCreatedAt() == null) caseStudy.setCreatedAt(LocalDate.now());
        return caseStudyRepository.save(caseStudy);
    }

    @Override
    @Transactional
    public CaseStudy updateCaseStudy(Long id, CaseStudy updated) {
        CaseStudy cs = getCaseStudyById(id);
        if (updated.getTitle() != null) cs.setTitle(updated.getTitle());
        if (updated.getSlug() != null) cs.setSlug(updated.getSlug());
        if (updated.getClient() != null) cs.setClient(updated.getClient());
        if (updated.getRole() != null) cs.setRole(updated.getRole());
        if (updated.getDuration() != null) cs.setDuration(updated.getDuration());
        if (updated.getOverview() != null) cs.setOverview(updated.getOverview());
        if (updated.getChallenge() != null) cs.setChallenge(updated.getChallenge());
        if (updated.getSolution() != null) cs.setSolution(updated.getSolution());
        if (updated.getResults() != null) cs.setResults(updated.getResults());
        if (updated.getCoverImage() != null) cs.setCoverImage(updated.getCoverImage());
        if (updated.getProjectUrl() != null) cs.setProjectUrl(updated.getProjectUrl());
        if (updated.getFeatured() != null) cs.setFeatured(updated.getFeatured());
        if (updated.getCompletionDate() != null) cs.setCompletionDate(updated.getCompletionDate());
        if (updated.getGalleryImages() != null) {
            cs.getGalleryImages().clear();
            cs.getGalleryImages().addAll(updated.getGalleryImages());
        }
        return caseStudyRepository.save(cs);
    }

    @Override
    @Transactional
    public void deleteCaseStudy(Long id) {
        caseStudyRepository.delete(getCaseStudyById(id));
    }
}
