package com.example.CareerPath_BE.services.imple;

import com.example.CareerPath_BE.dtos.Assessment.ChoiceResponseDto;
import com.example.CareerPath_BE.dtos.Assessment.QuestionResponseDto;
import com.example.CareerPath_BE.entities.Questions;
import com.example.CareerPath_BE.repositories.QuestionsRepository;
import com.example.CareerPath_BE.services.IQuestionService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
public class QuestionService implements IQuestionService {

    private final QuestionsRepository questionsRepository;

    public QuestionService(QuestionsRepository questionsRepository) {
        this.questionsRepository = questionsRepository;
    }

    @Override
    @Transactional
    public List<QuestionResponseDto> getAllQuestions() {
        return questionsRepository.findAllWithChoices()
                .stream()
                .sorted(Comparator.comparing(Questions::getQuestionId))
                .map(question -> new QuestionResponseDto(
                        question.getQuestionId(),
                        question.getContent(),
                        question.getDimension(),
                        question.getChoiceses()
                                .stream()
                                .sorted(Comparator
                                        .comparing((com.example.CareerPath_BE.entities.Choices choice) -> choice.getScoreValue(), Comparator.nullsLast(Integer::compareTo))
                                        .thenComparing(com.example.CareerPath_BE.entities.Choices::getChoiceId))
                                .map(choice -> new ChoiceResponseDto(
                                        choice.getChoiceId(),
                                        choice.getContent(),
                                        choice.getScoreValue()
                                ))
                                .toList()
                ))
                .toList();
    }
}
