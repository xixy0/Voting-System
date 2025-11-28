package com.internship.votingSystem.controller;

import com.internship.votingSystem.service.CandidateService;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CandidateController {
    private final  CandidateService candidateService;

    public CandidateController(CandidateService candidateService) {
        this.candidateService = candidateService;
    }
}
