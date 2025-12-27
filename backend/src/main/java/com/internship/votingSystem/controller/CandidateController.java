package com.internship.votingSystem.controller;

import com.internship.votingSystem.DTO.CandidateDTO;
import com.internship.votingSystem.service.CandidateService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/candidates")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ROLE_ADMIN')")
public class CandidateController {

    private final  CandidateService candidateService;

    @PostMapping
    public ResponseEntity<?> addCandidate(@Valid @RequestBody CandidateDTO candidateDTO){
        try {
            CandidateDTO created = candidateService.addCandidate(candidateDTO);
            return new ResponseEntity<>(created, HttpStatus.CREATED);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }


    @PostMapping("/{id}")
    public ResponseEntity<?> updateCandidate(
            @PathVariable Long id,
            @Valid @RequestBody CandidateDTO candidateDTO){
        try {
            return ResponseEntity.ok(candidateService.updateCandidate(candidateDTO));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
