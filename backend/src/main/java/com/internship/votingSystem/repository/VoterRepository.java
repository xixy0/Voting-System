package com.internship.votingSystem.repository;

import com.internship.votingSystem.entity.User;
import com.internship.votingSystem.entity.Voter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VoterRepository extends JpaRepository<Voter,Long> {
    Optional<Voter> findByUser(User user);
    Optional<Voter> findByVoterIdNumber(String voterIdNumber);
    boolean existsByVoterIdNumber(String voterIdNumber);
}
