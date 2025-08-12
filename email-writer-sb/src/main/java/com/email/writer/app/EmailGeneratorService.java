package com.email.writer.app;

import java.util.List;
import java.util.Map;

// import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class EmailGeneratorService {

    private static final Logger logger = LoggerFactory.getLogger(EmailGeneratorService.class);

    private final WebClient webClient;



    public EmailGeneratorService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.build();
    }

    public String generateEmailReply(EmailRequest emailRequest) {
        logger.info("Received email request: {}", emailRequest);

        String prompt = buildPrompt(emailRequest);
        logger.debug("Generated prompt: {}", prompt);

        Map<String, Object> requestBody = Map.of(
            "contents", List.of(
                Map.of(
                    "parts", List.of(
                        Map.of("text", prompt)
                    )
                )
            )
        );


        logger.debug("Request body prepared: {}", requestBody);

        String response;
        try {
            response = webClient.post()
                .uri("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCi1Gq24bFr-Tii76IypiACMgOgzCryPi4")
                .header("Content-Type", "application/json")
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .block();

            logger.info("Received raw response from Gemini: {}", response);
        } catch (Exception e) {
            logger.error("Error calling Gemini API", e);
            return "Error calling Gemini API: " + e.getMessage();
        }

        return extractResponseContent(response);
    }

    private String extractResponseContent(String response) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode rootNode = mapper.readTree(response);

            JsonNode candidates = rootNode.path("candidates");
            if (!candidates.isArray() || candidates.isEmpty()) {
                logger.warn("No candidates found in response");
                return "No response candidates found.";
            }

            JsonNode textNode = candidates.get(0).path("content").path("parts").get(0).path("text");
            if (textNode.isMissingNode()) {
                logger.warn("Text node missing in response");
                return "Response format incorrect or missing text.";
            }

            return textNode.asText();

        } catch (Exception e) {
            logger.error("Error parsing Gemini response", e);
            return "Error parsing response: " + e.getMessage();
        }
    }

    private String buildPrompt(EmailRequest emailRequest) {
        StringBuilder prompt = new StringBuilder();
        prompt.append("Generate an email with the following content. Please don't generate a request line.");

        if (emailRequest.getTone() != null && !emailRequest.getTone().isEmpty()) {
            prompt.append(" Use a ").append(emailRequest.getTone()).append(" tone.");
        }

        prompt.append("\nOriginal email:\n").append(emailRequest.getEmailContent());

        return prompt.toString();
    }
}
