package com.example.CareerPath_BE.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "career_mbti_matches")
public class CareerMbtiMatches implements java.io.Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "career_id")
    private Careers careers;

    @Column(name = "mbti_type", length = 4, nullable = false)
    private String mbtiType;

    @Column(name = "compatibility_score")
    private Integer compatibilityScore = 0;

    public CareerMbtiMatches() {
    }

    public CareerMbtiMatches(Careers careers, String mbtiType, Integer compatibilityScore) {
        this.careers = careers;
        this.mbtiType = mbtiType;
        this.compatibilityScore = compatibilityScore;
    }

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Careers getCareers() {
        return this.careers;
    }

    public void setCareers(Careers careers) {
        this.careers = careers;
    }

    public String getMbtiType() {
        return this.mbtiType;
    }

    public void setMbtiType(String mbtiType) {
        this.mbtiType = mbtiType;
    }

    public Integer getCompatibilityScore() {
        return this.compatibilityScore;
    }

    public void setCompatibilityScore(Integer compatibilityScore) {
        this.compatibilityScore = compatibilityScore;
    }
}
