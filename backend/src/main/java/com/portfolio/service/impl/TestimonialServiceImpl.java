package com.portfolio.service.impl;

import com.portfolio.dto.request.TestimonialRequest;
import com.portfolio.entity.Testimonial;
import com.portfolio.exception.ResourceNotFoundException;
import com.portfolio.repository.TestimonialRepository;
import com.portfolio.service.TestimonialService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TestimonialServiceImpl implements TestimonialService {

    private final TestimonialRepository testimonialRepository;

    @Override
    public List<Testimonial> getAllTestimonials() {
        return testimonialRepository.findAllByOrderBySortOrderAsc();
    }

    @Override
    public List<Testimonial> getFeaturedTestimonials() {
        return testimonialRepository.findByFeaturedTrueOrderBySortOrderAsc();
    }

    @Override
    public Testimonial getTestimonialById(Long id) {
        return testimonialRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Testimonial", id));
    }

    @Override
    @Transactional
    public Testimonial createTestimonial(TestimonialRequest request) {
        Testimonial testimonial = Testimonial.builder()
                .name(request.getName())
                .role(request.getRole())
                .company(request.getCompany())
                .content(request.getContent())
                .rating(request.getRating())
                .avatarUrl(request.getAvatarUrl())
                .featured(request.getFeatured() != null ? request.getFeatured() : false)
                .sortOrder(request.getSortOrder())
                .build();
        return testimonialRepository.save(testimonial);
    }

    @Override
    @Transactional
    public Testimonial updateTestimonial(Long id, TestimonialRequest request) {
        Testimonial testimonial = getTestimonialById(id);
        if (request.getName() != null) testimonial.setName(request.getName());
        if (request.getRole() != null) testimonial.setRole(request.getRole());
        if (request.getCompany() != null) testimonial.setCompany(request.getCompany());
        if (request.getContent() != null) testimonial.setContent(request.getContent());
        if (request.getRating() != null) testimonial.setRating(request.getRating());
        if (request.getAvatarUrl() != null) testimonial.setAvatarUrl(request.getAvatarUrl());
        if (request.getFeatured() != null) testimonial.setFeatured(request.getFeatured());
        if (request.getSortOrder() != null) testimonial.setSortOrder(request.getSortOrder());
        return testimonialRepository.save(testimonial);
    }

    @Override
    @Transactional
    public void deleteTestimonial(Long id) {
        testimonialRepository.delete(getTestimonialById(id));
    }
}
