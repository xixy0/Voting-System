package com.internship.votingSystem.service;

import com.internship.votingSystem.DTO.CandidateDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CandidateService {
    CandidateDTO addCandidate(CandidateDTO candidateDTO);
    List<CandidateDTO> getCandidatesByElection(Long electionId);
    void deleteCandidate(Long candidateId);
}
