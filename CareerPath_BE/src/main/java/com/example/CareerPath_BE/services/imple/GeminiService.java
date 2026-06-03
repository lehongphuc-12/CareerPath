package com.example.CareerPath_BE.services.imple;

import com.example.CareerPath_BE.services.IGeminiService;
import com.example.CareerPath_BE.dtos.blog.BlogAiResponseDto;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.JsonParser;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import jakarta.annotation.PostConstruct;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
public class GeminiService implements IGeminiService {

    private final ObjectMapper objectMapper;
    private final HttpClient httpClient = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(15))
            .build();

    @Value("${gemini.api.key:}")
    private String geminiApiKey;

    @Value("${gemini.model:gemini-2.5-flash}")
    private String geminiModel;

    public GeminiService(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @PostConstruct
    public void checkConfig() {
        log.info("===== GEMINI CONFIG CHECK =====");
        log.info("System.getenv(GEMINI_API_KEY) = {}", System.getenv("GEMINI_API_KEY"));
        log.info("geminiApiKey = {}", geminiApiKey);
        log.info("geminiModel = {}", geminiModel);
        log.info("================================");
    }

    @Override
    public String generateBlogContent(String title, String requirements) {
        if (geminiApiKey == null || geminiApiKey.isBlank()) {
            throw new RuntimeException("Gemini API key is missing");
        }

        try {
            String normalizedModel = normalizeModelName(geminiModel);
            String prompt = buildBlogPrompt(title, requirements);
            
            String requestBody = objectMapper.writeValueAsString(Map.of(
                    "contents", List.of(Map.of(
                            "parts", List.of(Map.of("text", prompt))
                    )),
                    "generationConfig", Map.of(
                            "responseMimeType", "application/json"
                    )
            ));

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create("https://generativelanguage.googleapis.com/v1beta/models/" + normalizedModel + ":generateContent?key=" + geminiApiKey))
                    .timeout(Duration.ofSeconds(60))
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(requestBody, StandardCharsets.UTF_8))
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));
            logChat(prompt, response.body());
            
            if (response.statusCode() < 200 || response.statusCode() >= 300) {
                log.warn("Gemini request failed with status {}: {}", response.statusCode(), response.body());
                throw new RuntimeException("AI generation failed with status: " + response.statusCode());
            }

            JsonNode root = objectMapper.readTree(response.body());
            JsonNode textNode = root.path("candidates").path(0).path("content").path("parts").path(0).path("text");
            
            if (textNode.isMissingNode() || textNode.asText().isBlank()) {
                throw new RuntimeException("Gemini returned empty response");
            }

            String aiResponse = textNode.asText();
            String jsonPart = extractJson(aiResponse);
            BlogAiResponseDto responseDto = objectMapper.reader()
                    .with(JsonParser.Feature.ALLOW_UNQUOTED_CONTROL_CHARS)
                    .forType(BlogAiResponseDto.class)
                    .readValue(jsonPart);
            return responseDto.getContent();
        } catch (Exception e) {
            log.error("Error generating blog content", e);
            throw new RuntimeException("Failed to generate blog content: " + e.getMessage());
        }
    }

    @Override
    public BlogAiResponseDto generateFullBlog(String requirements) {
        if (geminiApiKey == null || geminiApiKey.isBlank()) {
            throw new RuntimeException("Gemini API key is missing");
        }

        try {
            String normalizedModel = normalizeModelName(geminiModel);
            String prompt = buildFullBlogPrompt(requirements);
            
            String requestBody = objectMapper.writeValueAsString(Map.of(
                    "contents", List.of(Map.of(
                            "parts", List.of(Map.of("text", prompt))
                    )),
                    "generationConfig", Map.of(
                            "responseMimeType", "application/json"
                    )
            ));

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create("https://generativelanguage.googleapis.com/v1beta/models/" + normalizedModel + ":generateContent?key=" + geminiApiKey))
                    .timeout(Duration.ofSeconds(60))
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(requestBody, StandardCharsets.UTF_8))
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));
            logChat(prompt, response.body());
            
            if (response.statusCode() < 200 || response.statusCode() >= 300) {
                log.warn("Gemini request failed with status {}: {}", response.statusCode(), response.body());
                throw new RuntimeException("AI generation failed with status: " + response.statusCode());
            }

            JsonNode root = objectMapper.readTree(response.body());
            JsonNode textNode = root.path("candidates").path(0).path("content").path("parts").path(0).path("text");
            
            if (textNode.isMissingNode() || textNode.asText().isBlank()) {
                throw new RuntimeException("Gemini returned empty response");
            }

            String aiResponse = textNode.asText();
            // Try to extract JSON from the response if AI wrapped it in markdown
            String jsonPart = extractJson(aiResponse);
            
            return objectMapper.reader()
                    .with(JsonParser.Feature.ALLOW_UNQUOTED_CONTROL_CHARS)
                    .forType(BlogAiResponseDto.class)
                    .readValue(jsonPart);
        } catch (Exception e) {
            log.error("Error generating full blog", e);
            throw new RuntimeException("Failed to generate full blog: " + e.getMessage());
        }
    }

    private String extractJson(String aiResponse) {
        String jsonPart;
        if (aiResponse.contains("```json")) {
            int start = aiResponse.indexOf("```json") + 7;
            int end = aiResponse.lastIndexOf("```");
            jsonPart = aiResponse.substring(start, end).trim();
        } else if (aiResponse.contains("```")) {
            int start = aiResponse.indexOf("```") + 3;
            int end = aiResponse.lastIndexOf("```");
            jsonPart = aiResponse.substring(start, end).trim();
        } else {
            jsonPart = aiResponse.trim();
        }
        
        // Remove literal newlines/control characters that break JSON parsing within string values
        // JSON standards require control characters like newlines to be escaped as \n
        // If the AI returns raw newlines, we replace them with spaces to keep the JSON valid
        return jsonPart.replace("\n", " ").replace("\r", " ");
    }

    private String normalizeModelName(String rawModel) {
        if (rawModel == null || rawModel.isBlank()) {
            return "gemini-2.5-flash";
        }
        String normalized = rawModel.trim();
        if (normalized.startsWith("models/")) {
            normalized = normalized.substring("models/".length());
        }
        if (normalized.endsWith(":generateContent")) {
            normalized = normalized.substring(0, normalized.indexOf(":generateContent"));
        }
        return normalized;
    }

    private void logChat(String prompt, String response) {
        try {
            String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
            String logEntry = String.format(
                "--- CHAT LOG [%s] ---\n" +
                "PROMPT:\n%s\n\n" +
                "RESPONSE:\n%s\n" +
                "-----------------------------------\n\n",
                timestamp, prompt, response
            );
            
            Files.write(
                Paths.get("gemini_chat_logs.txt"),
                logEntry.getBytes(StandardCharsets.UTF_8),
                StandardOpenOption.CREATE,
                StandardOpenOption.APPEND
            );
        } catch (Exception e) {
            log.error("Failed to write chat log to file", e);
        }
    }

    private String buildBlogPrompt(String title, String requirements) {
        return String.format(
           "You are a professional blog writer and content editor.\n" +
            "Write a detailed, engaging, and valuable blog article based on the following information:\n" +
            "- Required title: %s\n" +
            "- Additional requirements: %s\n\n" +

            "Content requirements:\n" +
            "1. Use natural, fluent Vietnamese that is professional yet approachable.\n" +
            "2. The article must be well-structured with clear sections.\n" +
            "3. Include practical insights, useful advice, and real-world examples where appropriate.\n" +
            "4. Write in a natural human-like style, avoiding robotic or repetitive wording.\n" +
            "5. The article should include:\n" +
            "   - Introduction\n" +
            "   - Main content sections\n" +
            "   - Practical examples or actionable tips\n" +
            "   - Conclusion\n" +
            "6. Use only the following HTML tags for formatting:\n" +
            "   <h2>, <h3>, <p>, <ul>, <ol>, <li>, <strong>, <em>, <blockquote>\n" +
            "7. Do NOT use Markdown formatting such as #, ##, **, or ```.\n" +
            "8. Do NOT include inline CSS, JavaScript, or any unsupported HTML tags.\n" +
            "9. The content should be suitable for insertion into a Rich Text Editor.\n\n" +

            "Response format requirements:\n" +
            "Return ONLY a valid JSON object in the following format:\n" +
            "{\n" +
            "  \"title\": \"%s\",\n" +
            "  \"content\": \"HTML content here\"\n" +
            "}\n\n" +

            "Important:\n" +
            "- Return only raw JSON.\n" +
            "- Do not wrap the response in markdown code blocks.\n" +
            "- Do not include explanations, notes, or additional text outside the JSON.\n" +
            "- Ensure all special characters and line breaks are properly escaped according to JSON standards.\n" +
            "- To prevent JSON parsing errors, do NOT use double quotes (\") inside the HTML content. Use single quotes (') or HTML entities (&quot;) instead.\n" +
            "10. The article should be approximately 600-800 words while maintaining high content quality and avoiding unnecessary repetition.\n",
            title, requirements, title
        );
    }

    private String buildFullBlogPrompt(String requirements) {
        return String.format(
            "You are a professional blog writer and content editor.\n" +
            "Suggest an engaging title and write a detailed blog article based on the following requirements:\n" +
            "- Requirements: %s\n\n" +

            "Content requirements:\n" +
            "1. Use natural, fluent Vietnamese that is professional yet approachable.\n" +
            "2. The article must be well-structured with clear sections.\n" +
            "3. Include practical insights, useful advice, and real-world examples where appropriate.\n" +
            "4. Write in a natural human-like style, avoiding robotic or repetitive wording.\n" +
            "5. The article should include:\n" +
            "   - Introduction\n" +
            "   - Main content sections\n" +
            "   - Practical examples or actionable tips\n" +
            "   - Conclusion\n" +
            "6. Use only the following HTML tags for formatting:\n" +
            "   <h2>, <h3>, <p>, <ul>, <ol>, <li>, <strong>, <em>, <blockquote>\n" +
            "7. Do NOT use Markdown formatting such as #, ##, **, or ```.\n" +
            "8. Do NOT include inline CSS, JavaScript, or any unsupported HTML tags.\n" +
            "9. The content should be suitable for insertion into a Rich Text Editor.\n\n" +

            "Response format requirements:\n" +
            "Return ONLY a valid JSON object in the following format:\n" +
            "{\n" +
            "  \"title\": \"Suggested Title Here\",\n" +
            "  \"content\": \"HTML content here\"\n" +
            "}\n\n" +

            "Important:\n" +
            "- Return only raw JSON.\n" +
            "- Do not wrap the response in markdown code blocks.\n" +
            "- Do not include explanations, notes, or additional text outside the JSON.\n" +
            "- Ensure all special characters and line breaks are properly escaped according to JSON standards.\n" +
            "- To prevent JSON parsing errors, do NOT use double quotes (\") inside the HTML content. Use single quotes (') or HTML entities (&quot;) instead.\n" +
            "10. The article should be approximately 600-800 words while maintaining high content quality and avoiding unnecessary repetition.\n",
            requirements
        );
    }
}
