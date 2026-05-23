package com.example.CareerPath_BE.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "career_skills")
public class CareerSkills implements java.io.Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "career_id")
    private Careers careers;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "skill_id")
    private Skills skills;

    @Column(name = "importance_level")
    private Integer importanceLevel = 1;

    public CareerSkills() {
    }

    public CareerSkills(Careers careers, Skills skills, Integer importanceLevel) {
        this.careers = careers;
        this.skills = skills;
        this.importanceLevel = importanceLevel;
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

    public Skills getSkills() {
        return this.skills;
    }

    public void setSkills(Skills skills) {
        this.skills = skills;
    }

    public Integer getImportanceLevel() {
        return this.importanceLevel;
    }

    public void setImportanceLevel(Integer importanceLevel) {
        this.importanceLevel = importanceLevel;
    }
}
