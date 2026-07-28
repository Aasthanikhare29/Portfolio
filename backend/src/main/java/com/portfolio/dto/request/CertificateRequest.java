package com.portfolio.dto.request;

import lombok.*;
import java.time.LocalDate;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class CertificateRequest {
    private String title;
    private String issuer;
    private LocalDate issueDate;
    private LocalDate expiryDate;
    private String credentialUrl;
    private String credentialId;
    private String imageUrl;
    private Integer sortOrder;
}
