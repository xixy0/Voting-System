package com.internship.votingSystem.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CandidateDTO {

    private Long candidateId;
    private String candidateName;
    private String candidateParty;
    private String candidateDescription;
    private Long electionId;

}
