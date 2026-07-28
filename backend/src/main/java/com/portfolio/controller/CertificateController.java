package com.portfolio.controller;

import com.portfolio.dto.request.CertificateRequest;
import com.portfolio.dto.response.ApiResponse;
import com.portfolio.entity.Certificate;
import com.portfolio.service.CertificateService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class CertificateController {

    private final CertificateService certificateService;

    @GetMapping("/certificates")
    public ResponseEntity<ApiResponse<List<Certificate>>> getAll() {
        return ResponseEntity.ok(ApiResponse.success(certificateService.getAllCertificates()));
    }

    @GetMapping("/certificates/{id}")
    public ResponseEntity<ApiResponse<Certificate>> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(certificateService.getCertificateById(id)));
    }

    @PostMapping("/admin/certificates")
    public ResponseEntity<ApiResponse<Certificate>> create(@RequestBody CertificateRequest request) {
        return ResponseEntity.ok(ApiResponse.success(certificateService.createCertificate(request), "Certificate created"));
    }

    @PutMapping("/admin/certificates/{id}")
    public ResponseEntity<ApiResponse<Certificate>> update(@PathVariable Long id, @RequestBody CertificateRequest request) {
        return ResponseEntity.ok(ApiResponse.success(certificateService.updateCertificate(id, request), "Certificate updated"));
    }

    @DeleteMapping("/admin/certificates/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        certificateService.deleteCertificate(id);
        return ResponseEntity.ok(ApiResponse.success(null, "Certificate deleted"));
    }
}
