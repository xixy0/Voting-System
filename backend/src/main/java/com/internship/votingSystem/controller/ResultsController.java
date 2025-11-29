package com.internship.votingSystem.controller;

import com.internship.votingSystem.DTO.VoteResultDTO;
import com.internship.votingSystem.service.VoteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/results")
public class ResultsController {

    private final VoteService voteService;

    @GetMapping("/elections/{electionsId}")
    public ResponseEntity<List<VoteResultDTO>> getResults(@PathVariable Long electionId) {
        return ResponseEntity.ok(voteService.getElectionResults(electionId));
    }
}

