package com.portfolio.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "profile")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Profile {
    @Id
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String title;

    private String subtitle;
    private String bio;

    @Column(columnDefinition = "TEXT")
    private String about;

    @Column(name = "profile_picture")
    private String profilePicture;

    @Column(name = "resume_url")
    private String resumeUrl;

    @Column(name = "github_url")
    private String githubUrl;

    @Column(name = "linkedin_url")
    private String linkedinUrl;

    @Column(name = "twitter_url")
    private String twitterUrl;

    @Column(name = "website_url")
    private String websiteUrl;

    private String email;
    private String phone;
    private String location;

    @Column(name = "available_for_hire")
    private Boolean availableForHire;

    @Column(name = "short_bio", length = 300)
    private String shortBio;

    private String greeting;

    @Column(name = "typing_words", columnDefinition = "TEXT")
    private String typingWords;
}
