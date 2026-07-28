package com.portfolio.controller;

import com.portfolio.dto.request.ProfileRequest;
import com.portfolio.dto.response.ApiResponse;
import com.portfolio.entity.Profile;
import com.portfolio.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;

    @GetMapping("/profile")
    public ResponseEntity<ApiResponse<Profile>> getProfile() {
        return ResponseEntity.ok(ApiResponse.success(profileService.getProfile()));
    }

    @PutMapping("/admin/profile")
    public ResponseEntity<ApiResponse<Profile>> updateProfile(@RequestBody ProfileRequest request) {
        return ResponseEntity.ok(ApiResponse.success(profileService.updateProfile(request)));
    }
}
