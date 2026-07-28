package com.portfolio.service.impl;

import com.portfolio.dto.request.ProjectRequest;
import com.portfolio.entity.Project;
import com.portfolio.entity.ProjectFeature;
import com.portfolio.entity.ProjectGalleryImage;
import com.portfolio.entity.ProjectTechnology;
import com.portfolio.exception.ResourceNotFoundException;
import com.portfolio.repository.ProjectRepository;
import com.portfolio.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.IntStream;

@Service
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;

    @Override
    public List<Project> getAllProjects() {
        return projectRepository.findAllByOrderBySortOrderAsc();
    }

    @Override
    public List<Project> getFeaturedProjects() {
        return projectRepository.findByFeaturedTrueOrderBySortOrderAsc();
    }

    @Override
    public Project getProjectById(Long id) {
        return projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project", id));
    }

    @Override
    public Project getProjectBySlug(String slug) {
        return projectRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with slug: " + slug));
    }

    @Override
    @Transactional
    public Project createProject(ProjectRequest request) {
        Project project = Project.builder()
                .title(request.getTitle())
                .slug(request.getSlug())
                .description(request.getDescription())
                .shortSummary(request.getShortSummary())
                .techStack(request.getTechStack())
                .liveUrl(request.getLiveUrl())
                .githubUrl(request.getGithubUrl())
                .coverImage(request.getCoverImage())
                .category(request.getCategory())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .featured(request.getFeatured() != null ? request.getFeatured() : false)
                .sortOrder(request.getSortOrder())
                .createdAt(LocalDate.now())
                .build();

        if (request.getTechnologies() != null) {
            List<ProjectTechnology> techs = IntStream.range(0, request.getTechnologies().size())
                    .mapToObj(i -> ProjectTechnology.builder()
                            .project(project)
                            .name(request.getTechnologies().get(i))
                            .sortOrder(i)
                            .build())
                    .toList();
            project.setTechnologies(techs);
        }

        if (request.getFeatures() != null) {
            List<ProjectFeature> features = IntStream.range(0, request.getFeatures().size())
                    .mapToObj(i -> ProjectFeature.builder()
                            .project(project)
                            .feature(request.getFeatures().get(i))
                            .sortOrder(i)
                            .build())
                    .toList();
            project.setFeatures(features);
        }

        if (request.getGalleryImages() != null) {
            List<ProjectGalleryImage> images = IntStream.range(0, request.getGalleryImages().size())
                    .mapToObj(i -> ProjectGalleryImage.builder()
                            .project(project)
                            .url(request.getGalleryImages().get(i))
                            .caption(request.getGalleryCaptions() != null && i < request.getGalleryCaptions().size()
                                    ? request.getGalleryCaptions().get(i) : null)
                            .sortOrder(i)
                            .build())
                    .toList();
            project.setGalleryImages(images);
        }

        return projectRepository.save(project);
    }

    @Override
    @Transactional
    public Project updateProject(Long id, ProjectRequest request) {
        Project project = getProjectById(id);

        if (request.getTitle() != null) project.setTitle(request.getTitle());
        if (request.getSlug() != null) project.setSlug(request.getSlug());
        if (request.getDescription() != null) project.setDescription(request.getDescription());
        if (request.getShortSummary() != null) project.setShortSummary(request.getShortSummary());
        if (request.getTechStack() != null) project.setTechStack(request.getTechStack());
        if (request.getLiveUrl() != null) project.setLiveUrl(request.getLiveUrl());
        if (request.getGithubUrl() != null) project.setGithubUrl(request.getGithubUrl());
        if (request.getCoverImage() != null) project.setCoverImage(request.getCoverImage());
        if (request.getCategory() != null) project.setCategory(request.getCategory());
        if (request.getStartDate() != null) project.setStartDate(request.getStartDate());
        if (request.getEndDate() != null) project.setEndDate(request.getEndDate());
        if (request.getFeatured() != null) project.setFeatured(request.getFeatured());
        if (request.getSortOrder() != null) project.setSortOrder(request.getSortOrder());

        if (request.getTechnologies() != null) {
            project.getTechnologies().clear();
            List<ProjectTechnology> techs = IntStream.range(0, request.getTechnologies().size())
                    .mapToObj(i -> ProjectTechnology.builder()
                            .project(project)
                            .name(request.getTechnologies().get(i))
                            .sortOrder(i)
                            .build())
                    .toList();
            project.getTechnologies().addAll(techs);
        }

        if (request.getFeatures() != null) {
            project.getFeatures().clear();
            List<ProjectFeature> features = IntStream.range(0, request.getFeatures().size())
                    .mapToObj(i -> ProjectFeature.builder()
                            .project(project)
                            .feature(request.getFeatures().get(i))
                            .sortOrder(i)
                            .build())
                    .toList();
            project.getFeatures().addAll(features);
        }

        if (request.getGalleryImages() != null) {
            project.getGalleryImages().clear();
            List<ProjectGalleryImage> images = IntStream.range(0, request.getGalleryImages().size())
                    .mapToObj(i -> ProjectGalleryImage.builder()
                            .project(project)
                            .url(request.getGalleryImages().get(i))
                            .caption(request.getGalleryCaptions() != null && i < request.getGalleryCaptions().size()
                                    ? request.getGalleryCaptions().get(i) : null)
                            .sortOrder(i)
                            .build())
                    .toList();
            project.getGalleryImages().addAll(images);
        }

        return projectRepository.save(project);
    }

    @Override
    @Transactional
    public void deleteProject(Long id) {
        Project project = getProjectById(id);
        projectRepository.delete(project);
    }
}
