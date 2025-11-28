package com.internship.votingSystem.controller;

import com.internship.votingSystem.service.VoterService;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class VoterController {
    private final VoterService voteService;

    public VoterController(VoterService voteService) {
        this.voteService = voteService;
    }
}
