package com.internship.votingSystem.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VoterRegistrationDTO {

    @NotBlank(message = "Username is required")
    private String username;

    @Email(message = "Valid email required")
    @NotBlank(message = "Email is required")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 8,message = "Password must be at least 8 characters")
    private  String password;

    @NotBlank(message = "Voter ID is required")
    private String voterIdNumber;

}
