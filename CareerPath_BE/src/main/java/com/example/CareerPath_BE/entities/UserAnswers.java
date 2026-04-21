package com.example.CareerPath_BE.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "user_answers")
public class UserAnswers  implements java.io.Serializable {


     @Id
     @GeneratedValue(strategy = GenerationType.IDENTITY)
     @Column(name = "answer_id")
     private Integer answerId;

     @ManyToOne(fetch = FetchType.LAZY)
     @JoinColumn(name = "choice_id")
     private Choices choices;

     @ManyToOne(fetch = FetchType.LAZY)
     @JoinColumn(name = "question_id")
     private Questions questions;

     @ManyToOne(fetch = FetchType.LAZY)
     @JoinColumn(name = "user_id")
     private Users users;

    public UserAnswers() {
    }

    public UserAnswers(Choices choices, Questions questions, Users users) {
       this.choices = choices;
       this.questions = questions;
       this.users = users;
    }
   
    public Integer getAnswerId() {
        return this.answerId;
    }
    
    public void setAnswerId(Integer answerId) {
        this.answerId = answerId;
    }
    public Choices getChoices() {
        return this.choices;
    }
    
    public void setChoices(Choices choices) {
        this.choices = choices;
    }
    public Questions getQuestions() {
        return this.questions;
    }
    
    public void setQuestions(Questions questions) {
        this.questions = questions;
    }
    public Users getUsers() {
        return this.users;
    }
    
    public void setUsers(Users users) {
        this.users = users;
    }




}


