package com.portfolio.service;

import com.portfolio.dto.request.CertificateRequest;
import com.portfolio.entity.Certificate;
import java.util.List;

public interface CertificateService {
    List<Certificate> getAllCertificates();
    Certificate getCertificateById(Long id);
    Certificate createCertificate(CertificateRequest request);
    Certificate updateCertificate(Long id, CertificateRequest request);
    void deleteCertificate(Long id);
}
