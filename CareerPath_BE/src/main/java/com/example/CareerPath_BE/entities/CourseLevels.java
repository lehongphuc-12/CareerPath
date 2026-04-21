package com.example.CareerPath_BE.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "course_levels")
public class CourseLevels  implements java.io.Serializable {


     @Id
     @GeneratedValue(strategy = GenerationType.IDENTITY)
     @Column(name = "level_id")
     private Integer levelId;

     @Column(name = "name")
     private String name;

    public CourseLevels() {
    }

    public CourseLevels(String name) {
       this.name = name;
    }
   
    public Integer getLevelId() {
        return this.levelId;
    }
    
    public void setLevelId(Integer levelId) {
        this.levelId = levelId;
    }
    public String getName() {
        return this.name;
    }
    
    public void setName(String name) {
        this.name = name;
    }




}


