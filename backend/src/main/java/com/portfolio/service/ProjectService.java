package com.portfolio.service;

import com.portfolio.dto.request.ProjectRequest;
import com.portfolio.entity.Project;
import java.util.List;

public interface ProjectService {
    List<Project> getAllProjects();
    List<Project> getFeaturedProjects();
    Project getProjectById(Long id);
    Project getProjectBySlug(String slug);
    Project createProject(ProjectRequest request);
    Project updateProject(Long id, ProjectRequest request);
    void deleteProject(Long id);
}
