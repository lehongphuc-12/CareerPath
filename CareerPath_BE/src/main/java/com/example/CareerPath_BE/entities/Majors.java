package com.example.CareerPath_BE.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "Majors")
@Getter
@Setter
@NoArgsConstructor
public class Majors implements java.io.Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "majorcode", nullable = false, length = 10)
    private String majorCode;

    @Column(name = "majorname", nullable = false, length = 255)
    private String majorName;

    @Column(name = "groupcode", length = 5)
    private String groupCode;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "createdat", updatable = false)
    private Date createdAt = new Date();

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "updatedat")
    private Date updatedAt = new Date();

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "major")
    private Set<CareerMajor> careerMajors = new HashSet<>(0);

    public Majors(String majorCode, String majorName, String groupCode) {
        this.majorCode = majorCode;
        this.majorName = majorName;
        this.groupCode = groupCode;
    }
}
