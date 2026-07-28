package com.portfolio.controller;

import com.portfolio.dto.request.ProjectRequest;
import com.portfolio.dto.response.ApiResponse;
import com.portfolio.entity.Project;
import com.portfolio.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;

    @GetMapping("/projects")
    public ResponseEntity<ApiResponse<List<Project>>> getAllProjects() {
        return ResponseEntity.ok(ApiResponse.success(projectService.getAllProjects()));
    }

    @GetMapping("/projects/featured")
    public ResponseEntity<ApiResponse<List<Project>>> getFeaturedProjects() {
        return ResponseEntity.ok(ApiResponse.success(projectService.getFeaturedProjects()));
    }

    @GetMapping("/projects/{id}")
    public ResponseEntity<ApiResponse<Project>> getProjectById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(projectService.getProjectById(id)));
    }

    @GetMapping("/projects/slug/{slug}")
    public ResponseEntity<ApiResponse<Project>> getProjectBySlug(@PathVariable String slug) {
        return ResponseEntity.ok(ApiResponse.success(projectService.getProjectBySlug(slug)));
    }

    @PostMapping("/admin/projects")
    public ResponseEntity<ApiResponse<Project>> createProject(@RequestBody ProjectRequest request) {
        return ResponseEntity.ok(ApiResponse.success(projectService.createProject(request), "Project created"));
    }

    @PutMapping("/admin/projects/{id}")
    public ResponseEntity<ApiResponse<Project>> updateProject(@PathVariable Long id, @RequestBody ProjectRequest request) {
        return ResponseEntity.ok(ApiResponse.success(projectService.updateProject(id, request), "Project updated"));
    }

    @DeleteMapping("/admin/projects/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteProject(@PathVariable Long id) {
        projectService.deleteProject(id);
        return ResponseEntity.ok(ApiResponse.success(null, "Project deleted"));
    }
}
