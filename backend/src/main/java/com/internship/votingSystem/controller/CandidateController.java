package com.internship.votingSystem.controller;

import com.internship.votingSystem.DTO.CandidateDTO;
import com.internship.votingSystem.service.CandidateService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/candidates")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class CandidateController {
    private final  CandidateService candidateService;

    @PostMapping
    public ResponseEntity<CandidateDTO> addCandidate(@Valid @RequestBody CandidateDTO candidateDTO){
        CandidateDTO created = candidateService.addCandidate(candidateDTO);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CandidateDTO> updateCandidate(
            @PathVariable Long id,
            @Valid @RequestBody CandidateDTO candidateDTO){
        return ResponseEntity.ok(candidateService.updateCandidate(candidateDTO));
    }
}
