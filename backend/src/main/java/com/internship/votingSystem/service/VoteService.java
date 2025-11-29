package com.internship.votingSystem.service;

import com.internship.votingSystem.DTO.VoteRequestDTO;
import com.internship.votingSystem.DTO.VoteResultDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface VoteService {
    void castVote(String username, VoteRequestDTO voteRequestDTO);
    List<VoteResultDTO> getElectionResults(Long electionId);
    boolean hasVoted(String username,Long electionId);

}
