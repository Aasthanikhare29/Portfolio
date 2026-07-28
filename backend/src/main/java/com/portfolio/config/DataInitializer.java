package com.portfolio.config;

import com.portfolio.entity.*;
import com.portfolio.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final ProfileRepository profileRepository;
    private final SiteSettingsRepository settingsRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (userRepository.count() == 0) {
            User admin = User.builder()
                    .email("admin@portfolio.com")
                    .password(passwordEncoder.encode("admin123"))
                    .name("Admin User")
                    .build();
            userRepository.save(admin);
            System.out.println("Default admin user created: admin@portfolio.com / admin123");
        }

        if (profileRepository.count() == 0) {
            Profile profile = Profile.builder()
                    .id(1L)
                    .name("Your Name")
                    .title("Full Stack Developer")
                    .subtitle("Building amazing web experiences")
                    .shortBio("A passionate developer")
                    .availableForHire(true)
                    .build();
            profileRepository.save(profile);
        }

        if (settingsRepository.count() == 0) {
            SiteSettings settings = SiteSettings.builder()
                    .id(1L)
                    .siteTitle("Portfolio")
                    .enableAnimations(true)
                    .darkModeDefault(false)
                    .showThemeToggle(true)
                    .enableBlog(true)
                    .enableTestimonials(true)
                    .enableServices(true)
                    .enableCertificates(true)
                    .build();
            settingsRepository.save(settings);
        }
    }
}
