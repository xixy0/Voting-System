package com.internship.votingSystem.service.ServiceImpl;

import com.internship.votingSystem.DTO.AuthRequest;
import com.internship.votingSystem.DTO.AuthResponse;
import com.internship.votingSystem.entity.User;
import com.internship.votingSystem.exceptions.ResourceNotFoundException;
import com.internship.votingSystem.repository.UserRepository;
import com.internship.votingSystem.security.CustomUserDetailsService;
import com.internship.votingSystem.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final CustomUserDetailsService customUserDetailsService;
    private final AuthenticationManager authenticationManager;

    public AuthResponse authenticate(AuthRequest authRequest){
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authRequest.getUsername(),
                        authRequest.getPassword()
                )
        );

        User user = userRepository.findByUsername(authRequest.getUsername())
                .orElseThrow(()-> new UsernameNotFoundException("User not found"));

        UserDetails userDetails = customUserDetailsService.loadUserByUsername(authRequest.getUsername());

        String token = jwtService.generateToken(userDetails);
        return new AuthResponse(token,authRequest.getUsername(),authRequest.getPassword());
    }
}
