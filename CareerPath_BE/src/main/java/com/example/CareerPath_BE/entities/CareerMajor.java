package com.example.CareerPath_BE.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.Date;
import java.util.Objects;



/**
 * Entity ánh xạ bảng Career_Major (bảng trung gian giữa Careers và Majors)
 * Sử dụng composite key (CareerId, MajorId)
 */
@Entity
@Table(name = "Career_Major")
@Getter
@Setter
@NoArgsConstructor
public class CareerMajor implements java.io.Serializable {

    @EmbeddedId
    private CareerMajorId id = new CareerMajorId();

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("careerId")
    @JoinColumn(name = "careerid")
    private Careers career;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("majorId")
    @JoinColumn(name = "majorid")
    private Majors major;

    /**
     * 1 = ngành phù hợp nhất / chính, 0 = ngành liên quan
     */
    @Column(name = "isprimary", nullable = false)
    private Boolean isPrimary = false;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "createdat", updatable = false)
    private Date createdAt = new Date();

    public CareerMajor(Careers career, Majors major, Boolean isPrimary) {
        this.career = career;
        this.major = major;
        this.isPrimary = isPrimary;
        this.id = new CareerMajorId(career.getCareerId(), major.getId());
    }
}
