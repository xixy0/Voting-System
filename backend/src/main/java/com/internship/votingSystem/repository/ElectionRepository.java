package com.internship.votingSystem.repository;

import com.internship.votingSystem.ElectionStatus;
import com.internship.votingSystem.entity.Election;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ElectionRepository extends JpaRepository<Election,Long> {
    List<Election> findByStatus(ElectionStatus status);
    List<Election> findByStartTimeBetween(LocalDateTime start,LocalDateTime end);

    @Query("SELECT e FROM Election e WHERE e.status='ACTIVE'" +"AND CURRENT_TIMESTAMP BETWEEN e.startTime AND e.endTime")
    List<Election> findActiveElections();
}
