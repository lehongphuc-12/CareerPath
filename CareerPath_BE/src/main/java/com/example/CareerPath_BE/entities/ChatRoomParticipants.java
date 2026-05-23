package com.example.CareerPath_BE.entities;

import jakarta.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "chat_room_participants")
public class ChatRoomParticipants implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id")
    private ChatRooms chatRooms;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private Users users;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "joined_at", updatable = false)
    private Date joinedAt = new Date();

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "last_read_at")
    private Date lastReadAt = new Date();

    public ChatRoomParticipants() {
    }

    public ChatRoomParticipants(ChatRooms chatRooms, Users users) {
        this.chatRooms = chatRooms;
        this.users = users;
    }

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public ChatRooms getChatRooms() {
        return this.chatRooms;
    }

    public void setChatRooms(ChatRooms chatRooms) {
        this.chatRooms = chatRooms;
    }

    public Users getUsers() {
        return this.users;
    }

    public void setUsers(Users users) {
        this.users = users;
    }

    public Date getJoinedAt() {
        return this.joinedAt;
    }

    public void setJoinedAt(Date joinedAt) {
        this.joinedAt = joinedAt;
    }

    public Date getLastReadAt() {
        return this.lastReadAt;
    }

    public void setLastReadAt(Date lastReadAt) {
        this.lastReadAt = lastReadAt;
    }
}
