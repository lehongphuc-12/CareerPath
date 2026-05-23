package com.example.CareerPath_BE.entities;

import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "tests")
public class Tests  implements java.io.Serializable {


     @Id
     @GeneratedValue(strategy = GenerationType.IDENTITY)
     @Column(name = "test_id")
     private Integer testId;

     @ManyToOne(fetch = FetchType.LAZY)
     @JoinColumn(name = "type_id")
     private TestTypes testTypes;

     @Column(name = "name")
     private String name;

     @Column(name = "description", columnDefinition = "NVARCHAR(MAX)")
     private String description;

     @Temporal(TemporalType.TIMESTAMP)
     @Column(name = "created_at", updatable = false)
     private java.util.Date createdAt = new java.util.Date();

     @OneToMany(fetch = FetchType.LAZY, mappedBy = "tests")
     private Set<Questions> questionses = new HashSet<>(0);

     @OneToMany(fetch = FetchType.LAZY, mappedBy = "tests")
     private Set<TestDimensions> testDimensions = new HashSet<>(0);

    public Tests() {
    }

    public Tests(TestTypes testTypes, String name, String description, java.util.Date createdAt, Set<Questions> questionses, Set<TestDimensions> testDimensions) {
       this.testTypes = testTypes;
       this.name = name;
       this.description = description;
       this.createdAt = createdAt;
       this.questionses = questionses;
       this.testDimensions = testDimensions;
    }
   
    public Integer getTestId() {
        return this.testId;
    }
    
    public void setTestId(Integer testId) {
        this.testId = testId;
    }
    public TestTypes getTestTypes() {
        return this.testTypes;
    }
    
    public void setTestTypes(TestTypes testTypes) {
        this.testTypes = testTypes;
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

    public java.util.Date getCreatedAt() {
        return this.createdAt;
    }

    public void setCreatedAt(java.util.Date createdAt) {
        this.createdAt = createdAt;
    }

    public Set<Questions> getQuestionses() {
        return this.questionses;
    }
    
    public void setQuestionses(Set<Questions> questionses) {
        this.questionses = questionses;
    }

    public Set<TestDimensions> getTestDimensions() {
        return this.testDimensions;
    }

    public void setTestDimensions(Set<TestDimensions> testDimensions) {
        this.testDimensions = testDimensions;
    }




}


