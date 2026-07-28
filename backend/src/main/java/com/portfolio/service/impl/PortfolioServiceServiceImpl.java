package com.portfolio.service.impl;

import com.portfolio.dto.request.ServiceRequest;
import com.portfolio.entity.PortfolioService;
import com.portfolio.entity.ServiceFeature;
import com.portfolio.exception.ResourceNotFoundException;
import com.portfolio.repository.PortfolioServiceRepository;
import com.portfolio.service.PortfolioServiceService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.IntStream;

@Service
@RequiredArgsConstructor
public class PortfolioServiceServiceImpl implements PortfolioServiceService {

    private final PortfolioServiceRepository serviceRepository;

    @Override
    public List<PortfolioService> getAllServices() {
        return serviceRepository.findAllByOrderBySortOrderAsc();
    }

    @Override
    public List<PortfolioService> getFeaturedServices() {
        return serviceRepository.findByFeaturedTrueOrderBySortOrderAsc();
    }

    @Override
    public PortfolioService getServiceById(Long id) {
        return serviceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Service", id));
    }

    @Override
    @Transactional
    public PortfolioService createService(ServiceRequest request) {
        PortfolioService service = PortfolioService.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .icon(request.getIcon())
                .iconColor(request.getIconColor())
                .imageUrl(request.getImageUrl())
                .featured(request.getFeatured() != null ? request.getFeatured() : false)
                .sortOrder(request.getSortOrder())
                .build();

        if (request.getFeatures() != null) {
            List<ServiceFeature> features = IntStream.range(0, request.getFeatures().size())
                    .mapToObj(i -> ServiceFeature.builder()
                            .service(service)
                            .feature(request.getFeatures().get(i))
                            .sortOrder(i)
                            .build())
                    .toList();
            service.setFeatures(features);
        }

        return serviceRepository.save(service);
    }

    @Override
    @Transactional
    public PortfolioService updateService(Long id, ServiceRequest request) {
        PortfolioService service = getServiceById(id);
        if (request.getTitle() != null) service.setTitle(request.getTitle());
        if (request.getDescription() != null) service.setDescription(request.getDescription());
        if (request.getIcon() != null) service.setIcon(request.getIcon());
        if (request.getIconColor() != null) service.setIconColor(request.getIconColor());
        if (request.getImageUrl() != null) service.setImageUrl(request.getImageUrl());
        if (request.getFeatured() != null) service.setFeatured(request.getFeatured());
        if (request.getSortOrder() != null) service.setSortOrder(request.getSortOrder());

        if (request.getFeatures() != null) {
            service.getFeatures().clear();
            List<ServiceFeature> features = IntStream.range(0, request.getFeatures().size())
                    .mapToObj(i -> ServiceFeature.builder()
                            .service(service)
                            .feature(request.getFeatures().get(i))
                            .sortOrder(i)
                            .build())
                    .toList();
            service.getFeatures().addAll(features);
        }

        return serviceRepository.save(service);
    }

    @Override
    @Transactional
    public void deleteService(Long id) {
        serviceRepository.delete(getServiceById(id));
    }
}
