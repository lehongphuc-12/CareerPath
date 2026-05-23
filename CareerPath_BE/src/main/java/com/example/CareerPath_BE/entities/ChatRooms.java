package com.example.CareerPath_BE.entities;

import jakarta.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "chat_rooms")
public class ChatRooms implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "room_id")
    private Integer roomId;

    @Column(name = "name")
    private String name;

    @Column(name = "is_group")
    private Boolean isGroup = false;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_at", updatable = false)
    private Date createdAt = new Date();

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "updated_at")
    private Date updatedAt = new Date();

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "chatRooms")
    private Set<ChatRoomParticipants> chatRoomParticipants = new HashSet<>(0);

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "chatRooms")
    private Set<ChatMessages> chatMessages = new HashSet<>(0);

    public ChatRooms() {
    }

    public ChatRooms(String name, Boolean isGroup) {
        this.name = name;
        this.isGroup = isGroup;
    }

    public Integer getRoomId() {
        return this.roomId;
    }

    public void setRoomId(Integer roomId) {
        this.roomId = roomId;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean getIsGroup() {
        return this.isGroup;
    }

    public void setIsGroup(Boolean isGroup) {
        this.isGroup = isGroup;
    }

    public Date getCreatedAt() {
        return this.createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getUpdatedAt() {
        return this.updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Set<ChatRoomParticipants> getChatRoomParticipants() {
        return this.chatRoomParticipants;
    }

    public void setChatRoomParticipants(Set<ChatRoomParticipants> chatRoomParticipants) {
        this.chatRoomParticipants = chatRoomParticipants;
    }

    public Set<ChatMessages> getChatMessages() {
        return this.chatMessages;
    }

    public void setChatMessages(Set<ChatMessages> chatMessages) {
        this.chatMessages = chatMessages;
    }
}
