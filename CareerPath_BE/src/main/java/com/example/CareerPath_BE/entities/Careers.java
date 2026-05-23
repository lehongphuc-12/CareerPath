package com.example.CareerPath_BE.entities;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "careers")
public class Careers implements java.io.Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "career_id")
    private Integer careerId;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description", columnDefinition = "NVARCHAR(MAX)")
    private String description;

    @Column(name = "min_salary")
    private BigDecimal minSalary;

    @Column(name = "max_salary")
    private BigDecimal maxSalary;

    @Column(name = "demand_level")
    private Integer demandLevel;

    @Column(name = "image")
    private String image;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_at", updatable = false)
    private Date createdAt = new Date();

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "careers")
    private Set<CareerSkills> careerSkillses = new HashSet<>(0);

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "careers")
    private Set<CareerMbtiMatches> careerMbtiMatches = new HashSet<>(0);

    public Careers() {
    }

    public Careers(String name, String description, BigDecimal minSalary, BigDecimal maxSalary, Integer demandLevel, String image, Date createdAt, Set<CareerSkills> careerSkillses, Set<CareerMbtiMatches> careerMbtiMatches) {
        this.name = name;
        this.description = description;
        this.minSalary = minSalary;
        this.maxSalary = maxSalary;
        this.demandLevel = demandLevel;
        this.image = image;
        this.createdAt = createdAt;
        this.careerSkillses = careerSkillses;
        this.careerMbtiMatches = careerMbtiMatches;
    }

    public Integer getCareerId() {
        return this.careerId;
    }

    public void setCareerId(Integer careerId) {
        this.careerId = careerId;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getMinSalary() {
        return this.minSalary;
    }

    public void setMinSalary(BigDecimal minSalary) {
        this.minSalary = minSalary;
    }

    public BigDecimal getMaxSalary() {
        return this.maxSalary;
    }

    public void setMaxSalary(BigDecimal maxSalary) {
        this.maxSalary = maxSalary;
    }

    public Integer getDemandLevel() {
        return this.demandLevel;
    }

    public void setDemandLevel(Integer demandLevel) {
        this.demandLevel = demandLevel;
    }

    public String getImage() {
        return this.image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Date getCreatedAt() {
        return this.createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Set<CareerSkills> getCareerSkillses() {
        return this.careerSkillses;
    }

    public void setCareerSkillses(Set<CareerSkills> careerSkillses) {
        this.careerSkillses = careerSkillses;
    }

    public Set<CareerMbtiMatches> getCareerMbtiMatches() {
        return this.careerMbtiMatches;
    }

    public void setCareerMbtiMatches(Set<CareerMbtiMatches> careerMbtiMatches) {
        this.careerMbtiMatches = careerMbtiMatches;
    }
}
