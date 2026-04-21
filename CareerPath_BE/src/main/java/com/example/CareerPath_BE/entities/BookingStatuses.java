package com.example.CareerPath_BE.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "booking_statuses")
public class BookingStatuses  implements java.io.Serializable {


     @Id
     @GeneratedValue(strategy = GenerationType.IDENTITY)
     @Column(name = "status_id")
     private Integer statusId;

     @Column(name = "name")
     private String name;

    public BookingStatuses() {
    }

    public BookingStatuses(String name) {
       this.name = name;
    }
   
    public Integer getStatusId() {
        return this.statusId;
    }
    
    public void setStatusId(Integer statusId) {
        this.statusId = statusId;
    }
    public String getName() {
        return this.name;
    }
    
    public void setName(String name) {
        this.name = name;
    }




}


