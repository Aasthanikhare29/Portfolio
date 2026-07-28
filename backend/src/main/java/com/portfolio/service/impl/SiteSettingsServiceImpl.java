package com.portfolio.service.impl;

import com.portfolio.dto.request.SettingsRequest;
import com.portfolio.entity.SiteSettings;
import com.portfolio.repository.SiteSettingsRepository;
import com.portfolio.service.SiteSettingsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class SiteSettingsServiceImpl implements SiteSettingsService {

    private final SiteSettingsRepository settingsRepository;

    @Override
    public SiteSettings getSettings() {
        return settingsRepository.findById(1L)
                .orElseGet(() -> settingsRepository.save(SiteSettings.builder().id(1L).build()));
    }

    @Override
    @Transactional
    public SiteSettings updateSettings(SettingsRequest request) {
        SiteSettings settings = getSettings();
        if (request.getSiteTitle() != null) settings.setSiteTitle(request.getSiteTitle());
        if (request.getSiteDescription() != null) settings.setSiteDescription(request.getSiteDescription());
        if (request.getSiteLogo() != null) settings.setSiteLogo(request.getSiteLogo());
        if (request.getFavicon() != null) settings.setFavicon(request.getFavicon());
        if (request.getMetaKeywords() != null) settings.setMetaKeywords(request.getMetaKeywords());
        if (request.getGoogleAnalyticsId() != null) settings.setGoogleAnalyticsId(request.getGoogleAnalyticsId());
        if (request.getEnableAnimations() != null) settings.setEnableAnimations(request.getEnableAnimations());
        if (request.getPrimaryColor() != null) settings.setPrimaryColor(request.getPrimaryColor());
        if (request.getSecondaryColor() != null) settings.setSecondaryColor(request.getSecondaryColor());
        if (request.getAccentColor() != null) settings.setAccentColor(request.getAccentColor());
        if (request.getDarkModeDefault() != null) settings.setDarkModeDefault(request.getDarkModeDefault());
        if (request.getFooterText() != null) settings.setFooterText(request.getFooterText());
        if (request.getCopyrightText() != null) settings.setCopyrightText(request.getCopyrightText());
        if (request.getShowThemeToggle() != null) settings.setShowThemeToggle(request.getShowThemeToggle());
        if (request.getContactEmail() != null) settings.setContactEmail(request.getContactEmail());
        if (request.getEnableBlog() != null) settings.setEnableBlog(request.getEnableBlog());
        if (request.getEnableTestimonials() != null) settings.setEnableTestimonials(request.getEnableTestimonials());
        if (request.getEnableServices() != null) settings.setEnableServices(request.getEnableServices());
        if (request.getEnableCertificates() != null) settings.setEnableCertificates(request.getEnableCertificates());
        if (request.getAboutMeHtml() != null) settings.setAboutMeHtml(request.getAboutMeHtml());
        return settingsRepository.save(settings);
    }
}
