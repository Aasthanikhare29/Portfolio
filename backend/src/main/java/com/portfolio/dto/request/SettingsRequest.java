package com.portfolio.dto.request;

import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class SettingsRequest {
    private String siteTitle;
    private String siteDescription;
    private String siteLogo;
    private String favicon;
    private String metaKeywords;
    private String googleAnalyticsId;
    private Boolean enableAnimations;
    private String primaryColor;
    private String secondaryColor;
    private String accentColor;
    private Boolean darkModeDefault;
    private String footerText;
    private String copyrightText;
    private Boolean showThemeToggle;
    private String contactEmail;
    private Boolean enableBlog;
    private Boolean enableTestimonials;
    private Boolean enableServices;
    private Boolean enableCertificates;
    private String aboutMeHtml;
}
