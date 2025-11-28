package com.internship.votingSystem.service.ServiceImpl;

import com.internship.votingSystem.DTO.CandidateDTO;
import com.internship.votingSystem.ElectionStatus;
import com.internship.votingSystem.entity.Candidate;
import com.internship.votingSystem.entity.Election;
import com.internship.votingSystem.exceptions.InvalidElectionStateException;
import com.internship.votingSystem.exceptions.ResourceNotFoundException;
import com.internship.votingSystem.repository.CandidateRepository;
import com.internship.votingSystem.repository.ElectionRepository;
import com.internship.votingSystem.service.CandidateService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CandidateServiceImpl implements CandidateService {

    private final CandidateRepository candidateRepository;;
    private final ElectionRepository electionRepository;
    private final ModelMapper modelMapper;

    @Override
    public CandidateDTO addCandidate(CandidateDTO candidateDTO) {

        Election election = electionRepository.findById(candidateDTO.getElectionId()).orElseThrow(
                ()->new ResourceNotFoundException("Election not found"));

        if(election.getElectionStatus() != ElectionStatus.SCHEDULED){
            throw new InvalidElectionStateException("Can only add candidates to scheduled elecction");
        }

        Candidate candidate = modelMapper.map(candidateDTO,Candidate.class);
        candidate.setElection(election);
        Candidate saved = candidateRepository.save(candidate);

        return modelMapper.map(saved,CandidateDTO.class);
    }

    @Override
    public List<CandidateDTO> getCandidatesByElection(Long electionId) {
       List<Candidate> candidates = candidateRepository.findByElectionId(electionId);
       return candidates.stream()
               .map(candidate->modelMapper.map(candidate,CandidateDTO.class))
               .collect(Collectors.toList());
    }

    @Override
    public void deleteCandidate(Long candidateId) {

        Candidate candidate = candidateRepository.findById(candidateId).orElseThrow(
               ()-> new ResourceNotFoundException("Candidate not found"));
        if(candidate.getElection().getElectionStatus() != ElectionStatus.SCHEDULED){
           throw new InvalidElectionStateException("Cannot delete candidate from active election");
        }

       candidateRepository.delete(candidate);

    }
}
