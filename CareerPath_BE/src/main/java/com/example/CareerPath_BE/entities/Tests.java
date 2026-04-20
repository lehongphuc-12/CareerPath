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
     @JoinColumn(name = "test_type_id")
     private TestTypes testTypes;

     @Column(name = "name")
     private String name;

     @OneToMany(fetch = FetchType.LAZY, mappedBy = "tests")
     private Set<Questions> questionses = new HashSet<>(0);

    public Tests() {
    }

    public Tests(TestTypes testTypes, String name, Set<Questions> questionses) {
       this.testTypes = testTypes;
       this.name = name;
       this.questionses = questionses;
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
    public Set<Questions> getQuestionses() {
        return this.questionses;
    }
    
    public void setQuestionses(Set<Questions> questionses) {
        this.questionses = questionses;
    }




}


