package com.internship.votingSystem.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "vote")
public class Vote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long voteId;

    @Column(nullable = false)
    private LocalDateTime voteTime;

    @ManyToOne
    @JoinColumn(name = "voter_id",nullable = false)
    private Voter voter;

    @ManyToOne
    @JoinColumn(name = "election_id",nullable = false)
    private Election election;

    @ManyToOne
    @JoinColumn(name = "candidate_id",nullable = false)
    private Candidate candidate;


}
