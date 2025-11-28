package com.internship.votingSystem.exceptions;

public class InvalidElectionStateException extends  RuntimeException{
    public InvalidElectionStateException(String message){
        super(message);
    }
}