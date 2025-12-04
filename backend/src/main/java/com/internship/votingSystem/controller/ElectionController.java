package com.internship.votingSystem.controller;

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

    @GetMapping("/getAll")
    public ResponseEntity<List<?>> getAllElections(){
        try {
            return ResponseEntity.ok(electionService.getAllElections());
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(List.of(e.getMessage()));
        }
    }

    @GetMapping("/active")
    public ResponseEntity<List<?>> getActiveElections(){
        try {
            return ResponseEntity.ok(electionService.getActiveElections());
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(List.of(e.getMessage()));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getElectionById(@PathVariable Long id){
        try {
            return ResponseEntity.ok(electionService.getElectionById(id));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/{id}/candidates")
    public ResponseEntity<List<?>> getCandidates(@PathVariable Long id){
        try {
            return ResponseEntity.ok(candidateService.getCandidatesByElection(id));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(List.of(e.getMessage()));
        }
    }

    @PostMapping()
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createElection(@Valid @RequestBody ElectionDTO electionDTO){
        try {
            ElectionDTO created = electionService.createElection(electionDTO);
            return new ResponseEntity<>(created, HttpStatus.CREATED);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PutMapping("{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateStatus(
            @PathVariable Long id,
            @RequestParam ElectionStatus status){
        try{
            return ResponseEntity.ok(electionService.updateElectionStatus(id, status));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
