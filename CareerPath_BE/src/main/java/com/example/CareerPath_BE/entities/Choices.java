package com.example.CareerPath_BE.entities;

import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "choices")
public class Choices implements java.io.Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "choice_id")
    private Integer choiceId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id")
    private Questions questions;

    @Column(name = "content")
    private String content;

    @Column(name = "score_value", nullable = false)
    private Integer scoreValue;

    @Column(name = "choice_order")
    private Integer choiceOrder;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "choices")
    private Set<UserAnswers> userAnswerses = new HashSet<>(0);

    public Choices() {
    }

    public Choices(Questions questions, String content, Integer scoreValue, Integer choiceOrder, Set<UserAnswers> userAnswerses) {
        this.questions = questions;
        this.content = content;
        this.scoreValue = scoreValue;
        this.choiceOrder = choiceOrder;
        this.userAnswerses = userAnswerses;
    }

    public Integer getChoiceId() {
        return this.choiceId;
    }

    public void setChoiceId(Integer choiceId) {
        this.choiceId = choiceId;
    }

    public Questions getQuestions() {
        return this.questions;
    }

    public void setQuestions(Questions questions) {
        this.questions = questions;
    }

    public String getContent() {
        return this.content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Integer getScoreValue() {
        return this.scoreValue;
    }

    public void setScoreValue(Integer scoreValue) {
        this.scoreValue = scoreValue;
    }

    public Integer getChoiceOrder() {
        return this.choiceOrder;
    }

    public void setChoiceOrder(Integer choiceOrder) {
        this.choiceOrder = choiceOrder;
    }

    public Set<UserAnswers> getUserAnswerses() {
        return this.userAnswerses;
    }

    public void setUserAnswerses(Set<UserAnswers> userAnswerses) {
        this.userAnswerses = userAnswerses;
    }
}
