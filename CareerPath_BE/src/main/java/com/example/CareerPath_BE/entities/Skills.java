package com.example.CareerPath_BE.entities;

import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "skills")
public class Skills implements java.io.Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "skill_id")
    private Integer skillId;

    @Column(name = "name", nullable = false)
    private String name;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "skills")
    private Set<CareerSkills> careerSkillses = new HashSet<>(0);

    public Skills() {
    }

    public Skills(String name, Set<CareerSkills> careerSkillses) {
        this.name = name;
        this.careerSkillses = careerSkillses;
    }

    public Integer getSkillId() {
        return this.skillId;
    }

    public void setSkillId(Integer skillId) {
        this.skillId = skillId;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<CareerSkills> getCareerSkillses() {
        return this.careerSkillses;
    }

    public void setCareerSkillses(Set<CareerSkills> careerSkillses) {
        this.careerSkillses = careerSkillses;
    }
}
