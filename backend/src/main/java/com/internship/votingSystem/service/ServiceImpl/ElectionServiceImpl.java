package com.internship.votingSystem.service.ServiceImpl;

import com.internship.votingSystem.DTO.ElectionDTO;
import com.internship.votingSystem.ElectionStatus;
import com.internship.votingSystem.entity.Election;
import com.internship.votingSystem.exceptions.InvalidElectionStateException;
import com.internship.votingSystem.exceptions.ResourceNotFoundException;
import com.internship.votingSystem.repository.CandidateRepository;
import com.internship.votingSystem.repository.ElectionRepository;
import com.internship.votingSystem.service.ElectionService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ElectionServiceImpl implements ElectionService {

    private final ElectionRepository electionRepository;
    private final CandidateRepository candidateRepository;
    private final ModelMapper modelMapper;

    @Override
    public ElectionDTO createElection(ElectionDTO electionDTO) {

        if(electionDTO.getElectionStartTime().isAfter(electionDTO.getElectionEndTime())){
            throw new InvalidElectionStateException("Invalid time period scheduled!");
        }

        Election election = modelMapper.map(electionDTO,Election.class);
        election.setElectionStatus(ElectionStatus.SCHEDULED);
        Election saved = electionRepository.save(election);

        ElectionDTO result =  modelMapper.map(saved,ElectionDTO.class);
        result.setCandidateCount(0);
        return result;

    }

    @Override
    public List<ElectionDTO> getAllElections() {

        return electionRepository.findAll().stream()
                .map(election -> {
                    ElectionDTO electionDTO = modelMapper.map(election,ElectionDTO.class);
                    electionDTO.setCandidateCount(election.getCandidates().size());
                    return electionDTO;
                })
                .collect(Collectors.toList());
    }

    @Override
    public List<ElectionDTO> getActiveElections() {
        return electionRepository.findActiveElections().stream()
                .map(election -> modelMapper.map(election,ElectionDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public ElectionDTO updateElectionStatus(Long electionId, ElectionStatus electionStatus) {
        Election election = electionRepository.findById(electionId).orElseThrow(
                ()-> new ResourceNotFoundException("Election not found"));
        election.setElectionStatus(electionStatus);
        Election saved = electionRepository.save(election);

        return modelMapper.map(saved,ElectionDTO.class);
    }
}
