package com.example.CareerPath_BE.entities;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "user_answers", uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "question_id"}))
public class UserAnswers implements java.io.Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "answer_id")
    private Integer answerId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private Users users;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id")
    private Questions questions;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "choice_id")
    private Choices choices;

    @Column(name = "answer_score")
    private Integer answerScore;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_at", updatable = false)
    private Date createdAt = new Date();

    public UserAnswers() {
    }

    public UserAnswers(Users users, Questions questions, Choices choices, Integer answerScore, Date createdAt) {
        this.users = users;
        this.questions = questions;
        this.choices = choices;
        this.answerScore = answerScore;
        this.createdAt = createdAt;
    }

    public Integer getAnswerId() {
        return this.answerId;
    }

    public void setAnswerId(Integer answerId) {
        this.answerId = answerId;
    }

    public Users getUsers() {
        return this.users;
    }

    public void setUsers(Users users) {
        this.users = users;
    }

    public Questions getQuestions() {
        return this.questions;
    }

    public void setQuestions(Questions questions) {
        this.questions = questions;
    }

    public Choices getChoices() {
        return this.choices;
    }

    public void setChoices(Choices choices) {
        this.choices = choices;
    }

    public Integer getAnswerScore() {
        return this.answerScore;
    }

    public void setAnswerScore(Integer answerScore) {
        this.answerScore = answerScore;
    }

    public Date getCreatedAt() {
        return this.createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
}
