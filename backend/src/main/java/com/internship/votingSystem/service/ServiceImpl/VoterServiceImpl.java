package com.internship.votingSystem.service.ServiceImpl;

import com.internship.votingSystem.DTO.UserDTO;
import com.internship.votingSystem.DTO.VoterRegistrationDTO;
import com.internship.votingSystem.Role;
import com.internship.votingSystem.entity.User;
import com.internship.votingSystem.entity.Voter;
import com.internship.votingSystem.exceptions.DuplicateResourceException;
import com.internship.votingSystem.exceptions.ResourceNotFoundException;
import com.internship.votingSystem.repository.UserRepository;
import com.internship.votingSystem.repository.VoterRepository;
import com.internship.votingSystem.service.VoterService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class VoterServiceImpl implements VoterService {

    private final VoterRepository voterRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ModelMapper modelMapper;

    @Override
    public UserDTO registerVoter(VoterRegistrationDTO voterRegistrationDTO) {

        if(userRepository.existsByUserName(voterRegistrationDTO.getUsername())){
            throw new DuplicateResourceException("Username already exists");
        }

        if(userRepository.existsByEmail(voterRegistrationDTO.getEmail())){
            throw new DuplicateResourceException("Email already exists");
        }

        if(voterRepository.existsByVoterIdNumber(voterRegistrationDTO.getVoterIdNumber())){
            throw new DuplicateResourceException("Voter ID already registered");
        }

        User user = new User();
        user.setUsername(voterRegistrationDTO.getUsername());
        user.setEmail(voterRegistrationDTO.getEmail());
        user.setPassword(passwordEncoder.encode(voterRegistrationDTO.getPassword()));
        user.setRole(Role.VOTER);
        user.setActive(true);

        Voter voter = new Voter();
        voter.setUser(user);
        voter.setVoterIdNumber(voterRegistrationDTO.getVoterIdNumber());
        voter.setRegisterTime(LocalDateTime.now());

        user.setVoter(voter);
        User saved = userRepository.save(user);

        return modelMapper.map(saved,UserDTO.class);

    }

    @Override
    public Voter getVoterByUsername(String username) {

        User user = userRepository.findByUsername(username).orElseThrow(
                ()->new ResourceNotFoundException("User not found"));

        return voterRepository.findByUser(user).orElseThrow(
                ()->new ResourceNotFoundException("Voter not found"));

    }
}
