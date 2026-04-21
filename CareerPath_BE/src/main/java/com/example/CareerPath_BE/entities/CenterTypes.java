package com.example.CareerPath_BE.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "center_types")
public class CenterTypes  implements java.io.Serializable {


     @Id
     @GeneratedValue(strategy = GenerationType.IDENTITY)
     @Column(name = "type_id")
     private Integer typeId;

     @Column(name = "name")
     private String name;

    public CenterTypes() {
    }

    public CenterTypes(String name) {
       this.name = name;
    }
   
    public Integer getTypeId() {
        return this.typeId;
    }
    
    public void setTypeId(Integer typeId) {
        this.typeId = typeId;
    }
    public String getName() {
        return this.name;
    }
    
    public void setName(String name) {
        this.name = name;
    }




}


