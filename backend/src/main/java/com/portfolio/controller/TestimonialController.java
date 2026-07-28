package com.portfolio.controller;

import com.portfolio.dto.request.TestimonialRequest;
import com.portfolio.dto.response.ApiResponse;
import com.portfolio.entity.Testimonial;
import com.portfolio.service.TestimonialService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class TestimonialController {

    private final TestimonialService testimonialService;

    @GetMapping("/testimonials")
    public ResponseEntity<ApiResponse<List<Testimonial>>> getAll() {
        return ResponseEntity.ok(ApiResponse.success(testimonialService.getAllTestimonials()));
    }

    @GetMapping("/testimonials/featured")
    public ResponseEntity<ApiResponse<List<Testimonial>>> getFeatured() {
        return ResponseEntity.ok(ApiResponse.success(testimonialService.getFeaturedTestimonials()));
    }

    @GetMapping("/testimonials/{id}")
    public ResponseEntity<ApiResponse<Testimonial>> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(testimonialService.getTestimonialById(id)));
    }

    @PostMapping("/admin/testimonials")
    public ResponseEntity<ApiResponse<Testimonial>> create(@RequestBody TestimonialRequest request) {
        return ResponseEntity.ok(ApiResponse.success(testimonialService.createTestimonial(request), "Testimonial created"));
    }

    @PutMapping("/admin/testimonials/{id}")
    public ResponseEntity<ApiResponse<Testimonial>> update(@PathVariable Long id, @RequestBody TestimonialRequest request) {
        return ResponseEntity.ok(ApiResponse.success(testimonialService.updateTestimonial(id, request), "Testimonial updated"));
    }

    @DeleteMapping("/admin/testimonials/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        testimonialService.deleteTestimonial(id);
        return ResponseEntity.ok(ApiResponse.success(null, "Testimonial deleted"));
    }
}
