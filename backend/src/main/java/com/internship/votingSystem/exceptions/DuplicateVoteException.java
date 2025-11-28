package com.internship.votingSystem.exceptions;

public class DuplicateVoteException extends  RuntimeException{
    public DuplicateVoteException(String message){
        super(message);
    }
}
