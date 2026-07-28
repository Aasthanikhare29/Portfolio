package com.portfolio.controller;

import com.portfolio.dto.request.EducationRequest;
import com.portfolio.dto.response.ApiResponse;
import com.portfolio.entity.Education;
import com.portfolio.service.EducationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class EducationController {

    private final EducationService educationService;

    @GetMapping("/education")
    public ResponseEntity<ApiResponse<List<Education>>> getAll() {
        return ResponseEntity.ok(ApiResponse.success(educationService.getAllEducations()));
    }

    @GetMapping("/education/{id}")
    public ResponseEntity<ApiResponse<Education>> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(educationService.getEducationById(id)));
    }

    @PostMapping("/admin/education")
    public ResponseEntity<ApiResponse<Education>> create(@RequestBody EducationRequest request) {
        return ResponseEntity.ok(ApiResponse.success(educationService.createEducation(request), "Education created"));
    }

    @PutMapping("/admin/education/{id}")
    public ResponseEntity<ApiResponse<Education>> update(@PathVariable Long id, @RequestBody EducationRequest request) {
        return ResponseEntity.ok(ApiResponse.success(educationService.updateEducation(id, request), "Education updated"));
    }

    @DeleteMapping("/admin/education/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        educationService.deleteEducation(id);
        return ResponseEntity.ok(ApiResponse.success(null, "Education deleted"));
    }
}
