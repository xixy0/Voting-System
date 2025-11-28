package com.internship.votingSystem.service;

import com.internship.votingSystem.DTO.UserDTO;
import com.internship.votingSystem.DTO.VoterRegistrationDTO;
import com.internship.votingSystem.entity.Voter;
import org.springframework.stereotype.Service;

@Service
public interface VoterService {
    UserDTO registerVoter(VoterRegistrationDTO voterRegistrationDTO);
    Voter getVoterByUsername(String username);
}
