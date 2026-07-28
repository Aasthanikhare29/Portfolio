package com.portfolio.controller;

import com.portfolio.dto.response.ApiResponse;
import com.portfolio.entity.CaseStudy;
import com.portfolio.service.CaseStudyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class CaseStudyController {

    private final CaseStudyService caseStudyService;

    @GetMapping("/case-studies")
    public ResponseEntity<ApiResponse<List<CaseStudy>>> getAll() {
        return ResponseEntity.ok(ApiResponse.success(caseStudyService.getAllCaseStudies()));
    }

    @GetMapping("/case-studies/{id}")
    public ResponseEntity<ApiResponse<CaseStudy>> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(caseStudyService.getCaseStudyById(id)));
    }

    @GetMapping("/case-studies/slug/{slug}")
    public ResponseEntity<ApiResponse<CaseStudy>> getBySlug(@PathVariable String slug) {
        return ResponseEntity.ok(ApiResponse.success(caseStudyService.getCaseStudyBySlug(slug)));
    }

    @PostMapping("/admin/case-studies")
    public ResponseEntity<ApiResponse<CaseStudy>> create(@RequestBody CaseStudy caseStudy) {
        return ResponseEntity.ok(ApiResponse.success(caseStudyService.createCaseStudy(caseStudy), "Case study created"));
    }

    @PutMapping("/admin/case-studies/{id}")
    public ResponseEntity<ApiResponse<CaseStudy>> update(@PathVariable Long id, @RequestBody CaseStudy caseStudy) {
        return ResponseEntity.ok(ApiResponse.success(caseStudyService.updateCaseStudy(id, caseStudy), "Case study updated"));
    }

    @DeleteMapping("/admin/case-studies/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        caseStudyService.deleteCaseStudy(id);
        return ResponseEntity.ok(ApiResponse.success(null, "Case study deleted"));
    }
}
