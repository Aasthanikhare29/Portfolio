package com.portfolio.service.impl;

import com.portfolio.dto.request.LoginRequest;
import com.portfolio.dto.response.LoginResponse;
import com.portfolio.dto.response.UserResponse;
import com.portfolio.entity.User;
import com.portfolio.repository.UserRepository;
import com.portfolio.security.JwtTokenProvider;
import com.portfolio.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final JwtTokenProvider tokenProvider;
    private final PasswordEncoder passwordEncoder;

    @Override
    public LoginResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BadCredentialsException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new BadCredentialsException("Invalid email or password");
        }

        String token = tokenProvider.generateToken(user.getEmail());

        return LoginResponse.builder()
                .token(token)
                .user(UserResponse.builder()
                        .id(user.getId())
                        .email(user.getEmail())
                        .name(user.getName())
                        .profilePicture(user.getProfilePicture())
                        .build())
                .build();
    }
}
