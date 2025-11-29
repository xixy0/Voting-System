package com.internship.votingSystem.controller;

import com.internship.votingSystem.DTO.CandidateDTO;
import com.internship.votingSystem.DTO.ElectionDTO;
import com.internship.votingSystem.ElectionStatus;
import com.internship.votingSystem.service.CandidateService;
import com.internship.votingSystem.service.ElectionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/elections")
@RequiredArgsConstructor
public class ElectionController {

    private final ElectionService electionService;
    private final CandidateService candidateService;

    @GetMapping
    public ResponseEntity<List<ElectionDTO>> getAllElections(){
        return ResponseEntity.ok(electionService.getAllElections());
    }

    @GetMapping("/active")
    public ResponseEntity<List<ElectionDTO>> getActiveElections(){
        return ResponseEntity.ok(electionService.getActiveElections());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ElectionDTO> getElectionById(@PathVariable Long id){
        return ResponseEntity.ok(electionService.getElectionById(id));
    }

    @GetMapping("/{id}/candidates")
    public ResponseEntity<List<CandidateDTO>> getCandidates(@PathVariable Long id){
        return ResponseEntity.ok(candidateService.getCandidatesByElection(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ElectionDTO> createElection(@Valid @RequestBody ElectionDTO electionDTO){
        ElectionDTO created = electionService.createElection(electionDTO);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @PutMapping("{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ElectionDTO> updateStatus(
            @PathVariable Long id,
            @RequestParam ElectionStatus status){
        return ResponseEntity.ok(electionService.updateElectionStatus(id, status));
    }
}
