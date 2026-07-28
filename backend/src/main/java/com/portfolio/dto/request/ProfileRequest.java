package com.portfolio.dto.request;

import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class ProfileRequest {
    private String name;
    private String title;
    private String subtitle;
    private String bio;
    private String about;
    private String profilePicture;
    private String resumeUrl;
    private String githubUrl;
    private String linkedinUrl;
    private String twitterUrl;
    private String websiteUrl;
    private String email;
    private String phone;
    private String location;
    private Boolean availableForHire;
    private String shortBio;
    private String greeting;
    private String typingWords;
}
