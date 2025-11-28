package com.internship.votingSystem.controller;

import com.internship.votingSystem.service.ElectionService;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ElectionController {
    private final ElectionService electionService;

    public ElectionController(ElectionService electionService) {
        this.electionService = electionService;
    }
}
