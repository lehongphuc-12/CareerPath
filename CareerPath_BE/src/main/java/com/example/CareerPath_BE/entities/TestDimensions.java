package com.example.CareerPath_BE.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "test_dimensions")
public class TestDimensions  implements java.io.Serializable {


     @Id
     @GeneratedValue(strategy = GenerationType.IDENTITY)
     @Column(name = "dimension_id")
     private Integer dimensionId;

     @Column(name = "name")
     private String name;

    public TestDimensions() {
    }

    public TestDimensions(String name) {
       this.name = name;
    }
   
    public Integer getDimensionId() {
        return this.dimensionId;
    }
    
    public void setDimensionId(Integer dimensionId) {
        this.dimensionId = dimensionId;
    }
    public String getName() {
        return this.name;
    }
    
    public void setName(String name) {
        this.name = name;
    }




}


