package com.portfolio.controller;

import com.portfolio.dto.request.ServiceRequest;
import com.portfolio.dto.response.ApiResponse;
import com.portfolio.entity.PortfolioService;
import com.portfolio.service.PortfolioServiceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ServiceController {

    private final PortfolioServiceService serviceService;

    @GetMapping("/services")
    public ResponseEntity<ApiResponse<List<PortfolioService>>> getAll() {
        return ResponseEntity.ok(ApiResponse.success(serviceService.getAllServices()));
    }

    @GetMapping("/services/featured")
    public ResponseEntity<ApiResponse<List<PortfolioService>>> getFeatured() {
        return ResponseEntity.ok(ApiResponse.success(serviceService.getFeaturedServices()));
    }

    @GetMapping("/services/{id}")
    public ResponseEntity<ApiResponse<PortfolioService>> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(serviceService.getServiceById(id)));
    }

    @PostMapping("/admin/services")
    public ResponseEntity<ApiResponse<PortfolioService>> create(@RequestBody ServiceRequest request) {
        return ResponseEntity.ok(ApiResponse.success(serviceService.createService(request), "Service created"));
    }

    @PutMapping("/admin/services/{id}")
    public ResponseEntity<ApiResponse<PortfolioService>> update(@PathVariable Long id, @RequestBody ServiceRequest request) {
        return ResponseEntity.ok(ApiResponse.success(serviceService.updateService(id, request), "Service updated"));
    }

    @DeleteMapping("/admin/services/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        serviceService.deleteService(id);
        return ResponseEntity.ok(ApiResponse.success(null, "Service deleted"));
    }
}
