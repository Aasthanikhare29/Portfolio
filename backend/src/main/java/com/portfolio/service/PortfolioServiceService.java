package com.portfolio.service;

import com.portfolio.dto.request.ServiceRequest;
import com.portfolio.entity.PortfolioService;
import java.util.List;

public interface PortfolioServiceService {
    List<PortfolioService> getAllServices();
    List<PortfolioService> getFeaturedServices();
    PortfolioService getServiceById(Long id);
    PortfolioService createService(ServiceRequest request);
    PortfolioService updateService(Long id, ServiceRequest request);
    void deleteService(Long id);
}
