package com.example.CareerPath_BE.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "roadmap_item_types")
public class RoadmapItemTypes  implements java.io.Serializable {


     @Id
     @GeneratedValue(strategy = GenerationType.IDENTITY)
     @Column(name = "roadmap_item_type_id")
     private Integer roadmapItemTypeId;

     @Column(name = "name")
     private String name;

    public RoadmapItemTypes() {
    }

    public RoadmapItemTypes(String name) {
       this.name = name;
    }
   
    public Integer getRoadmapItemTypeId() {
        return this.roadmapItemTypeId;
    }
    
    public void setRoadmapItemTypeId(Integer roadmapItemTypeId) {
        this.roadmapItemTypeId = roadmapItemTypeId;
    }
    public String getName() {
        return this.name;
    }
    
    public void setName(String name) {
        this.name = name;
    }




}


