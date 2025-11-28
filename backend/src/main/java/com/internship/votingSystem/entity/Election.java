package com.internship.votingSystem.entity;

import com.internship.votingSystem.ElectionStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "election")
public class Election {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long electionId;

    @Column(nullable = false)
    private String electionTitle;

    @Column(length = 1000)
    private String electionDescription;

    @Column(nullable = false)
    private LocalDateTime electionStartTime;

    @Column(nullable = false)
    private LocalDateTime electionEndTime;

    @Enumerated(EnumType.STRING)
    private ElectionStatus electionStatus;

    @OneToMany(mappedBy = "election",cascade = CascadeType.ALL)
    private List<Vote> votes;

    @OneToMany(mappedBy = "election",cascade = CascadeType.ALL)
    private List<Candidate> candidates;

 }
