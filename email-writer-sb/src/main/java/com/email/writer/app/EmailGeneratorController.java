package com.email.writer.app;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/email")
@AllArgsConstructor
@CrossOrigin(origins = "*") // Allow all origins for CORS
public class EmailGeneratorController {

    private final EmailGeneratorService emailGeneratorService;
    @PostMapping("/generate")
    public ResponseEntity<String> generateEmail(@RequestBody EmailRequest emailRequest) {
 
        String response = emailGeneratorService.generateEmailReply(emailRequest);
        // Return the generated email content
        return ResponseEntity.ok(response);
    }

    

 
}   