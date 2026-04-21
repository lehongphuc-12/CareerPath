package com.example.CareerPath_BE.entities;

import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "factors")
public class Factors  implements java.io.Serializable {


     @Id
     @GeneratedValue(strategy = GenerationType.IDENTITY)
     @Column(name = "factor_id")
     private Integer factorId;

     @ManyToOne(fetch = FetchType.LAZY)
     @JoinColumn(name = "factor_type_id")
     private FactorTypes factorTypes;

     @Column(name = "name")
     private String name;

     @OneToMany(fetch = FetchType.LAZY, mappedBy = "factors")
     private Set<QuestionFactors> questionFactorses = new HashSet<>(0);

     @OneToMany(fetch = FetchType.LAZY, mappedBy = "factors")
     private Set<CareerFactors> careerFactorses = new HashSet<>(0);

    public Factors() {
    }

    public Factors(FactorTypes factorTypes, String name, Set<QuestionFactors> questionFactorses, Set<CareerFactors> careerFactorses) {
       this.factorTypes = factorTypes;
       this.name = name;
       this.questionFactorses = questionFactorses;
       this.careerFactorses = careerFactorses;
    }
   
    public Integer getFactorId() {
        return this.factorId;
    }
    
    public void setFactorId(Integer factorId) {
        this.factorId = factorId;
    }
    public FactorTypes getFactorTypes() {
        return this.factorTypes;
    }
    
    public void setFactorTypes(FactorTypes factorTypes) {
        this.factorTypes = factorTypes;
    }
    public String getName() {
        return this.name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    public Set<QuestionFactors> getQuestionFactorses() {
        return this.questionFactorses;
    }
    
    public void setQuestionFactorses(Set<QuestionFactors> questionFactorses) {
        this.questionFactorses = questionFactorses;
    }
    public Set<CareerFactors> getCareerFactorses() {
        return this.careerFactorses;
    }
    
    public void setCareerFactorses(Set<CareerFactors> careerFactorses) {
        this.careerFactorses = careerFactorses;
    }




}


