package com.portfolio.service;

import com.portfolio.dto.request.SettingsRequest;
import com.portfolio.entity.SiteSettings;

public interface SiteSettingsService {
    SiteSettings getSettings();
    SiteSettings updateSettings(SettingsRequest request);
}
