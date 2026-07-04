package com.example.CareerPath_BE.entities;

import jakarta.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "test_attempts")
public class TestAttempts implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "attempt_id")
    private Integer attemptId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private Users users;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "test_id", nullable = false)
    private Tests tests;

    @Column(name = "mbti_type", length = 4)
    private String mbtiType;

    @Column(name = "total_questions")
    private Integer totalQuestions;

    @Column(name = "completed_questions")
    private Integer completedQuestions;

    @Column(name = "score_e")
    private Integer scoreE = 0;

    @Column(name = "score_i")
    private Integer scoreI = 0;

    @Column(name = "score_s")
    private Integer scoreS = 0;

    @Column(name = "score_n")
    private Integer scoreN = 0;

    @Column(name = "score_t")
    private Integer scoreT = 0;

    @Column(name = "score_f")
    private Integer scoreF = 0;

    @Column(name = "score_j")
    private Integer scoreJ = 0;

    @Column(name = "score_p")
    private Integer scoreP = 0;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "completed_at")
    private Date completedAt;

    @Column(name = "result_summary", columnDefinition = "NVARCHAR(MAX)")
    private String resultSummary;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "testAttempts")
    private Set<UserAnswers> userAnswerses = new HashSet<>(0);

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "testAttempts")
    private Set<TestFeedbacks> testFeedbackses = new HashSet<>(0);

    public TestAttempts() {
    }

    public Integer getAttemptId() {
        return attemptId;
    }

    public void setAttemptId(Integer attemptId) {
        this.attemptId = attemptId;
    }

    public Users getUsers() {
        return users;
    }

    public void setUsers(Users users) {
        this.users = users;
    }

    public Tests getTests() {
        return tests;
    }

    public void setTests(Tests tests) {
        this.tests = tests;
    }

    public String getMbtiType() {
        return mbtiType;
    }

    public void setMbtiType(String mbtiType) {
        this.mbtiType = mbtiType;
    }

    public Integer getTotalQuestions() {
        return totalQuestions;
    }

    public void setTotalQuestions(Integer totalQuestions) {
        this.totalQuestions = totalQuestions;
    }

    public Integer getCompletedQuestions() {
        return completedQuestions;
    }

    public void setCompletedQuestions(Integer completedQuestions) {
        this.completedQuestions = completedQuestions;
    }

    public Integer getScoreE() {
        return scoreE;
    }

    public void setScoreE(Integer scoreE) {
        this.scoreE = scoreE;
    }

    public Integer getScoreI() {
        return scoreI;
    }

    public void setScoreI(Integer scoreI) {
        this.scoreI = scoreI;
    }

    public Integer getScoreS() {
        return scoreS;
    }

    public void setScoreS(Integer scoreS) {
        this.scoreS = scoreS;
    }

    public Integer getScoreN() {
        return scoreN;
    }

    public void setScoreN(Integer scoreN) {
        this.scoreN = scoreN;
    }

    public Integer getScoreT() {
        return scoreT;
    }

    public void setScoreT(Integer scoreT) {
        this.scoreT = scoreT;
    }

    public Integer getScoreF() {
        return scoreF;
    }

    public void setScoreF(Integer scoreF) {
        this.scoreF = scoreF;
    }

    public Integer getScoreJ() {
        return scoreJ;
    }

    public void setScoreJ(Integer scoreJ) {
        this.scoreJ = scoreJ;
    }

    public Integer getScoreP() {
        return scoreP;
    }

    public void setScoreP(Integer scoreP) {
        this.scoreP = scoreP;
    }

    public Date getCompletedAt() {
        return completedAt;
    }

    public void setCompletedAt(Date completedAt) {
        this.completedAt = completedAt;
    }

    public String getResultSummary() {
        return resultSummary;
    }

    public void setResultSummary(String resultSummary) {
        this.resultSummary = resultSummary;
    }

    public Set<UserAnswers> getUserAnswerses() {
        return userAnswerses;
    }

    public void setUserAnswerses(Set<UserAnswers> userAnswerses) {
        this.userAnswerses = userAnswerses;
    }

    public Set<TestFeedbacks> getTestFeedbackses() {
        return testFeedbackses;
    }

    public void setTestFeedbackses(Set<TestFeedbacks> testFeedbackses) {
        this.testFeedbackses = testFeedbackses;
    }
}
