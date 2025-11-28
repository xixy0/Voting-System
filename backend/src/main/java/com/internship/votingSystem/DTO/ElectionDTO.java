package com.internship.votingSystem.DTO;

import com.internship.votingSystem.ElectionStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ElectionDTO {

    private Long electionId;
    private String electionTitle;
    private String electionDescription;
    private LocalDateTime electionStartTime;
    private LocalDateTime electionEndTime;
    private ElectionStatus electionStatus;
    private int candidateCount;

}
