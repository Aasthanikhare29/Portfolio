package com.portfolio.controller;

import com.portfolio.dto.request.SettingsRequest;
import com.portfolio.dto.response.ApiResponse;
import com.portfolio.entity.SiteSettings;
import com.portfolio.service.SiteSettingsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class SettingsController {

    private final SiteSettingsService settingsService;

    @GetMapping("/settings")
    public ResponseEntity<ApiResponse<SiteSettings>> getSettings() {
        return ResponseEntity.ok(ApiResponse.success(settingsService.getSettings()));
    }

    @PutMapping("/admin/settings")
    public ResponseEntity<ApiResponse<SiteSettings>> updateSettings(@RequestBody SettingsRequest request) {
        return ResponseEntity.ok(ApiResponse.success(settingsService.updateSettings(request), "Settings updated"));
    }
}
