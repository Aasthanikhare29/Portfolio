package com.portfolio.service.impl;

import com.portfolio.dto.request.CertificateRequest;
import com.portfolio.entity.Certificate;
import com.portfolio.exception.ResourceNotFoundException;
import com.portfolio.repository.CertificateRepository;
import com.portfolio.service.CertificateService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CertificateServiceImpl implements CertificateService {

    private final CertificateRepository certificateRepository;

    @Override
    public List<Certificate> getAllCertificates() {
        return certificateRepository.findAllByOrderBySortOrderAsc();
    }

    @Override
    public Certificate getCertificateById(Long id) {
        return certificateRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Certificate", id));
    }

    @Override
    @Transactional
    public Certificate createCertificate(CertificateRequest request) {
        Certificate certificate = Certificate.builder()
                .title(request.getTitle())
                .issuer(request.getIssuer())
                .issueDate(request.getIssueDate())
                .expiryDate(request.getExpiryDate())
                .credentialUrl(request.getCredentialUrl())
                .credentialId(request.getCredentialId())
                .imageUrl(request.getImageUrl())
                .sortOrder(request.getSortOrder())
                .build();
        return certificateRepository.save(certificate);
    }

    @Override
    @Transactional
    public Certificate updateCertificate(Long id, CertificateRequest request) {
        Certificate certificate = getCertificateById(id);
        if (request.getTitle() != null) certificate.setTitle(request.getTitle());
        if (request.getIssuer() != null) certificate.setIssuer(request.getIssuer());
        if (request.getIssueDate() != null) certificate.setIssueDate(request.getIssueDate());
        if (request.getExpiryDate() != null) certificate.setExpiryDate(request.getExpiryDate());
        if (request.getCredentialUrl() != null) certificate.setCredentialUrl(request.getCredentialUrl());
        if (request.getCredentialId() != null) certificate.setCredentialId(request.getCredentialId());
        if (request.getImageUrl() != null) certificate.setImageUrl(request.getImageUrl());
        if (request.getSortOrder() != null) certificate.setSortOrder(request.getSortOrder());
        return certificateRepository.save(certificate);
    }

    @Override
    @Transactional
    public void deleteCertificate(Long id) {
        certificateRepository.delete(getCertificateById(id));
    }
}
