package com.internship.votingSystem.exceptions;

public class ResourceNotFoundException extends  RuntimeException {
    public ResourceNotFoundException(String message){
        super(message);
    }
}
