package com.example.CareerPath_BE.entities;

import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "questions")
public class Questions implements java.io.Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "question_id")
    private Integer questionId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "test_id")
    private Tests tests;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dimension_id")
    private TestDimensions testDimensions;

    @Column(name = "content", nullable = false, columnDefinition = "NVARCHAR(MAX)")
    private String content;

    @Column(name = "direction", length = 1, nullable = false)
    private String direction;

    @Column(name = "question_order")
    private Integer questionOrder;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "questions")
    private Set<Choices> choiceses = new HashSet<>(0);

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "questions")
    private Set<UserAnswers> userAnswerses = new HashSet<>(0);

    public Questions() {
    }

    public Questions(Tests tests, TestDimensions testDimensions, String content, String direction, Integer questionOrder, Set<Choices> choiceses, Set<UserAnswers> userAnswerses) {
        this.tests = tests;
        this.testDimensions = testDimensions;
        this.content = content;
        this.direction = direction;
        this.questionOrder = questionOrder;
        this.choiceses = choiceses;
        this.userAnswerses = userAnswerses;
    }

    public Integer getQuestionId() {
        return this.questionId;
    }

    public void setQuestionId(Integer questionId) {
        this.questionId = questionId;
    }

    public Tests getTests() {
        return this.tests;
    }

    public void setTests(Tests tests) {
        this.tests = tests;
    }

    public TestDimensions getTestDimensions() {
        return this.testDimensions;
    }

    public void setTestDimensions(TestDimensions testDimensions) {
        this.testDimensions = testDimensions;
    }

    public String getContent() {
        return this.content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getDirection() {
        return this.direction;
    }

    public void setDirection(String direction) {
        this.direction = direction;
    }

    public Integer getQuestionOrder() {
        return this.questionOrder;
    }

    public void setQuestionOrder(Integer questionOrder) {
        this.questionOrder = questionOrder;
    }

    public Set<Choices> getChoiceses() {
        return this.choiceses;
    }

    public void setChoiceses(Set<Choices> choiceses) {
        this.choiceses = choiceses;
    }

    public Set<UserAnswers> getUserAnswerses() {
        return this.userAnswerses;
    }

    public void setUserAnswerses(Set<UserAnswers> userAnswerses) {
        this.userAnswerses = userAnswerses;
    }
}
