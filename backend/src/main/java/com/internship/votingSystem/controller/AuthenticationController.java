package com.internship.votingSystem.controller;

import com.internship.votingSystem.DTO.AuthRequest;
import com.internship.votingSystem.DTO.AuthResponse;
import com.internship.votingSystem.DTO.UserDTO;
import com.internship.votingSystem.DTO.VoterRegistrationDTO;
import com.internship.votingSystem.service.ServiceImpl.AuthenticationService;
import com.internship.votingSystem.service.VoterService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;;
    private final VoterService voterService;

    @PostMapping("/register")
    public ResponseEntity<UserDTO> register(@Valid @RequestBody VoterRegistrationDTO voterRegistrationDTO){
        UserDTO user = voterService.registerVoter(voterRegistrationDTO);
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody AuthRequest request){
        AuthResponse response = authenticationService.authenticate(request);
        return ResponseEntity.ok(response);
    }
}
