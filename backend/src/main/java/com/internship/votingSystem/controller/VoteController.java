package com.internship.votingSystem.controller;

import com.internship.votingSystem.service.VoterService;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class VoteController {
    private final VoterService voteService;

    public VoteController(VoterService voteService) {
        this.voteService = voteService;
    }
}
