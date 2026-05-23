package com.example.CareerPath_BE.services.imple;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.example.CareerPath_BE.dtos.blog.BlogAiResponseDto;

import java.nio.file.Files;
import java.nio.file.Paths;

public class TestParser {
    public static void main(String[] args) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            String logs = Files.readString(Paths.get("gemini_chat_logs.txt"));
            
            // Find the last RESPONSE block
            int lastIndex = logs.lastIndexOf("RESPONSE:");
            if (lastIndex == -1) {
                System.out.println("No RESPONSE found");
                return;
            }
            
            String responsePart = logs.substring(lastIndex + 9).trim();
            // find the end of the JSON object
            int endIndex = responsePart.lastIndexOf("-----------------------------------");
            if (endIndex != -1) {
                responsePart = responsePart.substring(0, endIndex).trim();
            }
            
            System.out.println("Response to parse:\n" + responsePart.substring(0, Math.min(200, responsePart.length())) + "...");
            
            JsonNode root = objectMapper.readTree(responsePart);
            JsonNode textNode = root.path("candidates").path(0).path("content").path("parts").path(0).path("text");
            
            String aiResponse = textNode.asText();
            System.out.println("AI Response Text (first 200 chars):\n" + aiResponse.substring(0, Math.min(200, aiResponse.length())) + "...");
            
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
            
            System.out.println("Extracted jsonPart before replacement (first 200 chars):\n" + jsonPart.substring(0, Math.min(200, jsonPart.length())) + "...");
            
            String processed = jsonPart.replace("\n", " ").replace("\r", " ");
            System.out.println("Processed jsonPart (first 200 chars):\n" + processed.substring(0, Math.min(200, processed.length())) + "...");
            
            try {
                BlogAiResponseDto dto = objectMapper.reader()
                        .with(JsonParser.Feature.ALLOW_UNQUOTED_CONTROL_CHARS)
                        .forType(BlogAiResponseDto.class)
                        .readValue(processed);
                System.out.println("Success! Parsed Title: " + dto.getTitle());
            } catch (com.fasterxml.jackson.core.JsonParseException jpe) {
                long offset = jpe.getLocation().getCharOffset();
                System.out.println("Error offset: " + offset);
                int startIdx = Math.max(0, (int) offset - 50);
                int endIdx = Math.min(processed.length(), (int) offset + 50);
                System.out.println("CONTEXT AROUND ERROR:");
                System.out.println(">>>" + processed.substring(startIdx, endIdx) + "<<<");
                throw jpe;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
