package com.internship.votingSystem.controller;

import com.internship.votingSystem.DTO.VoteRequestDTO;
import com.internship.votingSystem.service.VoteService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/votes")
@PreAuthorize("hasRole('VOTER')")
public class VoteController {
    private final VoteService voteService;

    @PostMapping
    public ResponseEntity<Map<String,String>> castVote(
            @Valid @RequestBody VoteRequestDTO voteRequestDTO,
            Principal principal){
        voteService.castVote(principal.getName(), voteRequestDTO);
        return ResponseEntity.ok(Map.of("message","Vote cast successfully"));
    }

    @GetMapping("/elections/{electionId}/has-voted")
    public ResponseEntity<?> hasVoted(
            @PathVariable Long electionId,
            Principal principal){
        try {
            boolean voted = voteService.hasVoted(principal.getName(), electionId);
            return ResponseEntity.ok(Map.of("hasVoted", voted));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }


}
