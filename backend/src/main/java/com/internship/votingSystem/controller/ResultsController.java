package com.internship.votingSystem.controller;

import com.internship.votingSystem.DTO.VoteResultDTO;
import com.internship.votingSystem.service.VoteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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

    @GetMapping("/elections/{electionId}")
    public ResponseEntity<List<?>> getResults(@PathVariable Long electionId) {
        try {
            return ResponseEntity.ok(voteService.getElectionResults(electionId));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(List.of(e.getMessage()));
        }
    }
}

