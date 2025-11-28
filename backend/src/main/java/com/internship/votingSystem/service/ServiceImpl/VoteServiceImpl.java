package com.internship.votingSystem.service.ServiceImpl;

import com.internship.votingSystem.DTO.VoteResultDTO;
import com.internship.votingSystem.DTO.VoterRequestDTO;
import com.internship.votingSystem.ElectionStatus;
import com.internship.votingSystem.entity.*;
import com.internship.votingSystem.exceptions.DuplicateResourceException;
import com.internship.votingSystem.exceptions.InvalidElectionStateException;
import com.internship.votingSystem.exceptions.ResourceNotFoundException;
import com.internship.votingSystem.repository.*;
import com.internship.votingSystem.service.VoteService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VoteServiceImpl implements VoteService {

    private final VoteRepository voteRepository;
    private final VoterRepository voterRepository;
    private final ElectionRepository electionRepository;
    private final UserRepository userRepository;
    private final CandidateRepository candidateRepository;

    @Override
    public void castVote(String username, VoterRequestDTO voterRequestDTO) {

        User user = userRepository.findByUsername(username).orElseThrow(
                ()-> new ResourceNotFoundException("User not found"));
        Voter voter = voterRepository.findByUser(user)
                .orElseThrow(()-> new ResourceNotFoundException("Voter not found"));
        Election election = electionRepository.findById(voterRequestDTO.getElectionId()).orElseThrow(
                ()-> new ResourceNotFoundException("Election not found"));

        if(election.getElectionStatus() != ElectionStatus.ACTIVE){
            throw new InvalidElectionStateException("Election not active");
        }

        LocalDateTime now = LocalDateTime.now();

        if(now.isBefore(election.getElectionStartTime()) || now.isAfter(election.getElectionEndTime())){
            throw new InvalidElectionStateException("Election voting not allowed at the time");
        }

        if(voteRepository.existsByVoterAndElection(voter,election)){
            throw new DuplicateResourceException("You have already voted");
        }

        Candidate candidate = candidateRepository.findById(voterRequestDTO.getCandidateId()).orElseThrow(
                ()-> new ResourceNotFoundException("Candidate not found"));

        if(!candidate.getElection().getElectionId().equals(election.getElectionId())){
            throw  new InvalidElectionStateException("Candidate not in this election");
        }

        Vote vote = new Vote();
        vote.setVoter(voter);
        vote.setCandidate(candidate);
        vote.setElection(election);
        vote.setVoteTime(now);

        voteRepository.save(vote);

    }

    @Override
    public List<VoteResultDTO> getElectionResults(long electionId) {
        Election election = electionRepository.findById(electionId)
                .orElseThrow(()->new ResourceNotFoundException("Election not found"));

        List<Candidate> candidates = candidateRepository.findByElectionId(electionId);
        long totalVotes = voteRepository.countByCandidateId(electionId);

        return candidates.stream()
                .map(candidate -> {
                    long voteCount = voteRepository.countByCandidateId(candidate.getCandidateId());
                    double percentage = totalVotes > 0 ? (voteCount * 100.0 / totalVotes) : 0;
                    return new VoteResultDTO(
                            candidate.getCandidateId(),
                            candidate.getCandidateName(),
                            candidate.getCandidateParty(),
                            voteCount,
                            percentage
                    );
                })
                .sorted(Comparator.comparing(VoteResultDTO :: getVoteCount).reversed())
                .collect(Collectors.toList());
    }

    @Override
    public boolean hasVoted(String username, Long electionId) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(()-> new ResourceNotFoundException("User not found"));
        Voter voter = voterRepository.findByUser(user)
                .orElseThrow(()-> new ResourceNotFoundException("Voter not found"));
        Election election = electionRepository.findById(electionId)
                .orElseThrow(()-> new ResourceNotFoundException("Election not found"));

        return voteRepository.existsByVoterAndElection(voter,election);

    }
}
