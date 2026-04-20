package com.example.CareerPath_BE.entities;

import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "genders")
public class Genders  implements java.io.Serializable {


     @Id
     @GeneratedValue(strategy = GenerationType.IDENTITY)
     @Column(name = "gender_id")
     private Integer genderId;

     @Column(name = "name")
     private String name;

     @OneToMany(fetch = FetchType.LAZY, mappedBy = "genders")
     private Set<UserProfiles> userProfileses = new HashSet<>(0);

    public Genders() {
    }

    public Genders(String name, Set<UserProfiles> userProfileses) {
       this.name = name;
       this.userProfileses = userProfileses;
    }
   
    public Integer getGenderId() {
        return this.genderId;
    }
    
    public void setGenderId(Integer genderId) {
        this.genderId = genderId;
    }
    public String getName() {
        return this.name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    public Set<UserProfiles> getUserProfileses() {
        return this.userProfileses;
    }
    
    public void setUserProfileses(Set<UserProfiles> userProfileses) {
        this.userProfileses = userProfileses;
    }




}


