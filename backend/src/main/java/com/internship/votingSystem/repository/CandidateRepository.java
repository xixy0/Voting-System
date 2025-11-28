package com.internship.votingSystem.repository;

import com.internship.votingSystem.entity.Candidate;
import com.internship.votingSystem.entity.Election;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CandidateRepository extends JpaRepository<Candidate,Long> {
    List<Candidate> findByElection(Election election);
    List<Candidate> findByElectionId(Long electionId);
    long countByElectionId(Long electionId);
}
