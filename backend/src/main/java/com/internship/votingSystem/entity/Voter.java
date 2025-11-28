package com.internship.votingSystem.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "voter")
public class Voter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long voterId;

    @Column(unique = true,nullable = false)
    private String voterIdNumber;

    private LocalDateTime registerTime;

    @OneToMany(mappedBy = "voter",cascade = CascadeType.ALL)
    private List<Vote> votes;

    @OneToOne
    @JoinColumn(name = "user_id",unique = true)
    private User user;
}
