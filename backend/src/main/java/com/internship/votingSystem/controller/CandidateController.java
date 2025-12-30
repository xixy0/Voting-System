package com.internship.votingSystem.controller;

import com.internship.votingSystem.DTO.CandidateDTO;
import com.internship.votingSystem.exceptions.ResourceNotFoundException;
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

    @DeleteMapping("/{candidateId}")
    public ResponseEntity<?> deleteCandidate(
            @PathVariable Long candidateId
    ){
        try{
            candidateService.deleteCandidate(candidateId);
            return ResponseEntity.status(HttpStatus.OK).body("Candidate Deleted");
        }catch (ResourceNotFoundException ex){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }

    @GetMapping("{electionId}")
    ResponseEntity<?> getCandidatesByElection(
            @PathVariable Long electionId
    ){
        try{
            return ResponseEntity.status(HttpStatus.OK).body(candidateService.getCandidatesByElection(electionId));
        }catch (ResourceNotFoundException ex){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No candidates found");
        }
    }

    @GetMapping("/getAll")
    ResponseEntity<?> getAllCandidates(){
        try {
            return ResponseEntity.status(HttpStatus.OK).body(candidateService.getAll());
        }catch (RuntimeException ex){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }



}
