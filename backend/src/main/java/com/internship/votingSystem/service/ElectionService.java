package com.internship.votingSystem.service;

import com.internship.votingSystem.DTO.ElectionDTO;
import com.internship.votingSystem.ElectionStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ElectionService {
    ElectionDTO createElection(ElectionDTO electionDTO);
    List<ElectionDTO> getAllElections();
    List<ElectionDTO> getActiveElections();
    ElectionDTO updateElectionStatus(Long electionId, ElectionStatus electionStatus);
    ElectionDTO  getElectionById(Long electionId);
}
