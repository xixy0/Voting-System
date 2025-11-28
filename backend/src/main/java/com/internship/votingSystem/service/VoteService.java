package com.internship.votingSystem.service;

import com.internship.votingSystem.DTO.VoteResultDTO;
import com.internship.votingSystem.DTO.VoterRequestDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface VoteService {
    void castVote(String username, VoterRequestDTO voterRequestDTO);
    List<VoteResultDTO> getElectionResults(long electionId);
    boolean hasVoted(String username,Long electionId);
}
