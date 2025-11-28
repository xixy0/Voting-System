package com.internship.votingSystem.DTO;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VoterRequestDTO {

    @NotNull(message = "Election ID is required")
    private Long electionId;

    @NotNull(message = "Candidate ID is required")
    private Long candidateId;

}

