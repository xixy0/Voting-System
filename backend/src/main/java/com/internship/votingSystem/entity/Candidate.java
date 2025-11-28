package com.internship.votingSystem.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "candidate")
public class Candidate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long candidateId;

    @Column(nullable = false)
    private String candidateName;

    private String candidateParty;

    @Column(length = 1000)
    private String candidateDescription;

    @ManyToOne
    @JoinColumn(name = "election_id",nullable = false)
    private Election election;

    @OneToMany(mappedBy = "candidate",cascade = CascadeType.ALL)
    private List<Vote> votes;

}
