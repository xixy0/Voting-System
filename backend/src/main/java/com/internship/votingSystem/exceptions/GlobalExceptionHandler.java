package com.internship.votingSystem.exceptions;

import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.stream.Collectors;


@RestController
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleResourceNotFound(ResourceNotFoundException ex){
        ErrorResponse response = new ErrorResponse(
                HttpStatus.NOT_FOUND.value(),
                ex.getMessage(),
                LocalDateTime.now()
        );

        return new ResponseEntity<>(response,HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(DuplicateVoteException.class)
    public ResponseEntity<ErrorResponse> handleDuplicateVote(DuplicateVoteException ex){
        ErrorResponse response = new ErrorResponse(
                HttpStatus.CONFLICT.value(),
                ex.getMessage(),
                LocalDateTime.now()
        );

        return new ResponseEntity<>(response,HttpStatus.CONFLICT);
    }

    @ExceptionHandler(InvalidElectionStateException.class)
    public ResponseEntity<ErrorResponse> handleInvalidElectionState(InvalidElectionStateException ex){
        ErrorResponse response = new ErrorResponse(
                HttpStatus.BAD_REQUEST.value(),
                ex.getMessage(),
                LocalDateTime.now()
        );

        return new ResponseEntity<>(response,HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationError(MethodArgumentNotValidException ex){
         String message = ex.getBindingResult().getFieldErrors().stream()
                 .map(DefaultMessageSourceResolvable::getDefaultMessage)
                 .collect(Collectors.joining(", "));

         ErrorResponse response = new ErrorResponse(
                 HttpStatus.BAD_REQUEST.value(),
                 message,
                 LocalDateTime.now()
         );
        return new ResponseEntity<>(response,HttpStatus.BAD_REQUEST);
    }

}
