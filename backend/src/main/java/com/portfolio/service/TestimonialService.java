package com.portfolio.service;

import com.portfolio.dto.request.TestimonialRequest;
import com.portfolio.entity.Testimonial;
import java.util.List;

public interface TestimonialService {
    List<Testimonial> getAllTestimonials();
    List<Testimonial> getFeaturedTestimonials();
    Testimonial getTestimonialById(Long id);
    Testimonial createTestimonial(TestimonialRequest request);
    Testimonial updateTestimonial(Long id, TestimonialRequest request);
    void deleteTestimonial(Long id);
}
