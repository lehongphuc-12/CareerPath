package com.example.CareerPath_BE.entities;

import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "test_dimensions")
public class TestDimensions implements java.io.Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "dimension_id")
    private Integer dimensionId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "test_id")
    private Tests tests;

    @Column(name = "code", length = 10, nullable = false)
    private String code;

    @Column(name = "name", length = 100)
    private String name;

    @Column(name = "positive_side", length = 1)
    private String positiveSide;

    @Column(name = "negative_side", length = 1)
    private String negativeSide;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "testDimensions")
    private Set<Questions> questionses = new HashSet<>(0);

    public TestDimensions() {
    }

    public TestDimensions(Tests tests, String code, String name, String positiveSide, String negativeSide, Set<Questions> questionses) {
        this.tests = tests;
        this.code = code;
        this.name = name;
        this.positiveSide = positiveSide;
        this.negativeSide = negativeSide;
        this.questionses = questionses;
    }

    public Integer getDimensionId() {
        return this.dimensionId;
    }

    public void setDimensionId(Integer dimensionId) {
        this.dimensionId = dimensionId;
    }

    public Tests getTests() {
        return this.tests;
    }

    public void setTests(Tests tests) {
        this.tests = tests;
    }

    public String getCode() {
        return this.code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPositiveSide() {
        return this.positiveSide;
    }

    public void setPositiveSide(String positiveSide) {
        this.positiveSide = positiveSide;
    }

    public String getNegativeSide() {
        return this.negativeSide;
    }

    public void setNegativeSide(String negativeSide) {
        this.negativeSide = negativeSide;
    }

    public Set<Questions> getQuestionses() {
        return this.questionses;
    }

    public void setQuestionses(Set<Questions> questionses) {
        this.questionses = questionses;
    }
}
