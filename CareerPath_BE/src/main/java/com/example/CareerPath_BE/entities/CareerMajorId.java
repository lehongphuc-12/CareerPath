package com.example.CareerPath_BE.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import java.io.Serializable;
import java.util.Objects;

/**
 * Composite Primary Key cho bảng Career_Major
 */
@Embeddable
public class CareerMajorId implements Serializable {

    @Column(name = "careerid")
    private Integer careerId;

    @Column(name = "majorid")
    private Integer majorId;

    public CareerMajorId() {}

    public CareerMajorId(Integer careerId, Integer majorId) {
        this.careerId = careerId;
        this.majorId = majorId;
    }

    public Integer getCareerId() { return careerId; }
    public void setCareerId(Integer careerId) { this.careerId = careerId; }

    public Integer getMajorId() { return majorId; }
    public void setMajorId(Integer majorId) { this.majorId = majorId; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof CareerMajorId)) return false;
        CareerMajorId that = (CareerMajorId) o;
        return Objects.equals(careerId, that.careerId) && Objects.equals(majorId, that.majorId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(careerId, majorId);
    }
}
