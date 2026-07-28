package com.portfolio.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "site_settings")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class SiteSettings {
    @Id
    private Long id;

    @Column(name = "site_title")
    private String siteTitle;

    @Column(name = "site_description", columnDefinition = "TEXT")
    private String siteDescription;

    @Column(name = "site_logo")
    private String siteLogo;

    @Column(name = "favicon")
    private String favicon;

    @Column(name = "meta_keywords")
    private String metaKeywords;

    @Column(name = "google_analytics_id")
    private String googleAnalyticsId;

    @Column(name = "enable_animations")
    private Boolean enableAnimations;

    @Column(name = "primary_color")
    private String primaryColor;

    @Column(name = "secondary_color")
    private String secondaryColor;

    @Column(name = "accent_color")
    private String accentColor;

    @Column(name = "dark_mode_default")
    private Boolean darkModeDefault;

    @Column(name = "footer_text")
    private String footerText;

    @Column(name = "copyright_text")
    private String copyrightText;

    @Column(name = "show_theme_toggle")
    private Boolean showThemeToggle;

    @Column(name = "contact_email")
    private String contactEmail;

    @Column(name = "enable_blog")
    private Boolean enableBlog;

    @Column(name = "enable_testimonials")
    private Boolean enableTestimonials;

    @Column(name = "enable_services")
    private Boolean enableServices;

    @Column(name = "enable_certificates")
    private Boolean enableCertificates;

    @Column(name = "about_me_html", columnDefinition = "TEXT")
    private String aboutMeHtml;
}
