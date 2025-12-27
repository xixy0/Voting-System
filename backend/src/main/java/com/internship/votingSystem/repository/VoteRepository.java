package com.internship.votingSystem.repository;


import com.internship.votingSystem.entity.Election;
import com.internship.votingSystem.entity.Vote;

import com.internship.votingSystem.entity.Voter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VoteRepository extends JpaRepository<Vote,Long> {
    boolean existsByVoterAndElection(Voter voter, Election election);
    Optional<Vote> findByVoterAndElection(Voter voter,Election election);
    List<Vote> findByElection(Election election);
    Long countByCandidate_CandidateId(Long candidateId);
    Long countByElectionElectionId(Long electionId);
//    @Query("SELECT v.candidate.id as candidateId, COUNT(v) as voteCount FROM Vote v WHERE v.election.id= :electionId GROUP BY v.candidate.id")
//    List<VoteCountProjection>
}
