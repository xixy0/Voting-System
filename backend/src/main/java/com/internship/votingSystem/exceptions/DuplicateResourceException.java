package com.internship.votingSystem.exceptions;

public class DuplicateResourceException extends  RuntimeException{
    public DuplicateResourceException(String message){
        super(message);
    }
}