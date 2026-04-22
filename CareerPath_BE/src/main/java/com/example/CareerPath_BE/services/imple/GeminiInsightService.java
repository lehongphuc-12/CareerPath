package com.example.CareerPath_BE.services.imple;

import com.example.CareerPath_BE.dtos.Assessment.AssessmentCareerMatchDto;
import com.example.CareerPath_BE.dtos.Assessment.AssessmentInsightDto;
import com.example.CareerPath_BE.dtos.Assessment.AssessmentTraitScoresDto;
import com.example.CareerPath_BE.services.IGeminiInsightService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
public class GeminiInsightService implements IGeminiInsightService {

    private final ObjectMapper objectMapper;
    private final HttpClient httpClient = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(15))
            .build();

    @Value("${gemini.api.key:}")
    private String geminiApiKey;

    @Value("${gemini.model:gemini-2.5-flash}")
    private String geminiModel;

    public GeminiInsightService(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @Override
    public AssessmentInsightDto generateAssessmentInsight(
            AssessmentTraitScoresDto traitScores,
            AssessmentTraitScoresDto preTestResult,
            Map<String, Integer> factorScores,
            List<AssessmentCareerMatchDto> recommendedCareers
    ) {
        if (geminiApiKey == null || geminiApiKey.isBlank()) {
            return fallbackInsight(traitScores, recommendedCareers);
        }

        try {
            String normalizedModel = normalizeModelName(geminiModel);
            String prompt = buildPrompt(traitScores, preTestResult, factorScores, recommendedCareers);
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
                    .timeout(Duration.ofSeconds(30))
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(requestBody, StandardCharsets.UTF_8))
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));
            if (response.statusCode() < 200 || response.statusCode() >= 300) {
                log.warn("Gemini request failed with status {}: {}", response.statusCode(), response.body());
                return fallbackInsight(traitScores, recommendedCareers);
            }

            JsonNode root = objectMapper.readTree(response.body());
            JsonNode textNode = root.path("candidates").path(0).path("content").path("parts").path(0).path("text");
            if (textNode.isMissingNode() || textNode.asText().isBlank()) {
                return fallbackInsight(traitScores, recommendedCareers);
            }

            JsonNode insightNode = objectMapper.readTree(textNode.asText());
            return new AssessmentInsightDto(
                    insightNode.path("headline").asText("Danh gia tong quan"),
                    insightNode.path("summary").asText("Ban co nhieu diem manh de tiep tuc phat trien."),
                    insightNode.path("recommendation").asText("Hay tiep tuc ren luyen va tim hieu sau hon ve nhom nghe phu hop.")
            );
        } catch (Exception e) {
            log.warn("Unable to generate Gemini insight", e);
            return fallbackInsight(traitScores, recommendedCareers);
        }
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

    private String buildPrompt(
            AssessmentTraitScoresDto traitScores,
            AssessmentTraitScoresDto preTestResult,
            Map<String, Integer> factorScores,
            List<AssessmentCareerMatchDto> recommendedCareers
    ) {
        return """
                Ban la chuyen gia huong nghiep cho hoc sinh, sinh vien.
                Hay viet nhan xet bang tieng Viet, ngan gon, ro rang, thuc te va khich le.

                Dau vao:
                - Trait scores: %s
                - Pre-test scores: %s
                - Factor scores: %s
                - Recommended careers: %s

                Yeu cau:
                - Tra ve JSON hop le duy nhat.
                - JSON phai co 3 field string: headline, summary, recommendation.
                - summary gom 2-3 cau.
                - recommendation la 1-2 cau, co tinh hanh dong cu the.
                - Khong dung markdown.
                """.formatted(traitScores, preTestResult, factorScores, recommendedCareers);
    }

    private AssessmentInsightDto fallbackInsight(
            AssessmentTraitScoresDto traitScores,
            List<AssessmentCareerMatchDto> recommendedCareers
    ) {
        String strongestTrait = findStrongestTrait(traitScores);
        String topCareer = recommendedCareers.isEmpty() ? "nhom nghe ban vua hoan thanh bai test" : recommendedCareers.get(0).name();

        return new AssessmentInsightDto(
                "Diem manh noi bat cua ban la " + strongestTrait,
                "Ket qua cho thay ban co xu huong phat huy tot o cac moi truong hoc tap va lam viec phu hop voi the manh hien tai. Nhom nghe noi bat nhat dang nghieng ve " + topCareer + ".",
                "Hay uu tien tim hieu ky hon ve 1-2 nghe dung dau danh sach va bat dau bang mot du an nho hoac lo trinh hoc co thoi han cu the."
        );
    }

    private String findStrongestTrait(AssessmentTraitScoresDto traitScores) {
        Map<String, Integer> traitMap = Map.of(
                "logic", traitScores.logic(),
                "creativity", traitScores.creativity(),
                "communication", traitScores.communication(),
                "discipline", traitScores.discipline(),
                "teamwork", traitScores.teamwork(),
                "selfLearning", traitScores.selfLearning()
        );

        return traitMap.entrySet().stream()
                .max(Map.Entry.comparingByValue())
                .map(Map.Entry::getKey)
                .orElse("kha nang tu phat trien");
    }
}
