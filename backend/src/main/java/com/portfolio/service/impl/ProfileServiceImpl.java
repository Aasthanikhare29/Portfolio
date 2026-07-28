package com.portfolio.service.impl;

import com.portfolio.dto.request.ProfileRequest;
import com.portfolio.entity.Profile;
import com.portfolio.repository.ProfileRepository;
import com.portfolio.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProfileServiceImpl implements ProfileService {

    private final ProfileRepository profileRepository;

    @Override
    public Profile getProfile() {
        return profileRepository.findById(1L)
                .orElseGet(() -> profileRepository.save(Profile.builder().id(1L).name("Your Name").title("Developer").build()));
    }

    @Override
    public Profile updateProfile(ProfileRequest request) {
        Profile profile = getProfile();
        if (request.getName() != null) profile.setName(request.getName());
        if (request.getTitle() != null) profile.setTitle(request.getTitle());
        if (request.getSubtitle() != null) profile.setSubtitle(request.getSubtitle());
        if (request.getBio() != null) profile.setBio(request.getBio());
        if (request.getAbout() != null) profile.setAbout(request.getAbout());
        if (request.getProfilePicture() != null) profile.setProfilePicture(request.getProfilePicture());
        if (request.getResumeUrl() != null) profile.setResumeUrl(request.getResumeUrl());
        if (request.getGithubUrl() != null) profile.setGithubUrl(request.getGithubUrl());
        if (request.getLinkedinUrl() != null) profile.setLinkedinUrl(request.getLinkedinUrl());
        if (request.getTwitterUrl() != null) profile.setTwitterUrl(request.getTwitterUrl());
        if (request.getWebsiteUrl() != null) profile.setWebsiteUrl(request.getWebsiteUrl());
        if (request.getEmail() != null) profile.setEmail(request.getEmail());
        if (request.getPhone() != null) profile.setPhone(request.getPhone());
        if (request.getLocation() != null) profile.setLocation(request.getLocation());
        if (request.getAvailableForHire() != null) profile.setAvailableForHire(request.getAvailableForHire());
        if (request.getShortBio() != null) profile.setShortBio(request.getShortBio());
        if (request.getGreeting() != null) profile.setGreeting(request.getGreeting());
        if (request.getTypingWords() != null) profile.setTypingWords(request.getTypingWords());
        return profileRepository.save(profile);
    }
}
