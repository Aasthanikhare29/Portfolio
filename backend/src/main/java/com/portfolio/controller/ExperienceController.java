package com.portfolio.controller;

import com.portfolio.dto.request.ExperienceRequest;
import com.portfolio.dto.response.ApiResponse;
import com.portfolio.entity.Experience;
import com.portfolio.service.ExperienceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ExperienceController {

    private final ExperienceService experienceService;

    @GetMapping("/experiences")
    public ResponseEntity<ApiResponse<List<Experience>>> getAll() {
        return ResponseEntity.ok(ApiResponse.success(experienceService.getAllExperiences()));
    }

    @GetMapping("/experiences/{id}")
    public ResponseEntity<ApiResponse<Experience>> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(experienceService.getExperienceById(id)));
    }

    @PostMapping("/admin/experiences")
    public ResponseEntity<ApiResponse<Experience>> create(@RequestBody ExperienceRequest request) {
        return ResponseEntity.ok(ApiResponse.success(experienceService.createExperience(request), "Experience created"));
    }

    @PutMapping("/admin/experiences/{id}")
    public ResponseEntity<ApiResponse<Experience>> update(@PathVariable Long id, @RequestBody ExperienceRequest request) {
        return ResponseEntity.ok(ApiResponse.success(experienceService.updateExperience(id, request), "Experience updated"));
    }

    @DeleteMapping("/admin/experiences/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        experienceService.deleteExperience(id);
        return ResponseEntity.ok(ApiResponse.success(null, "Experience deleted"));
    }
}
