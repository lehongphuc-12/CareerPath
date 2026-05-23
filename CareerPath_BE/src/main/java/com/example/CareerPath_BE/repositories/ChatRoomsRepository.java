package com.example.CareerPath_BE.repositories;

import com.example.CareerPath_BE.entities.ChatRooms;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ChatRoomsRepository extends JpaRepository<ChatRooms, Integer> {

    @Query("SELECT r FROM ChatRooms r WHERE r.isGroup = false AND r.roomId IN (" +
           "  SELECT p1.chatRooms.roomId FROM ChatRoomParticipants p1 WHERE p1.users.userId = :user1Id AND p1.chatRooms.roomId IN (" +
           "    SELECT p2.chatRooms.roomId FROM ChatRoomParticipants p2 WHERE p2.users.userId = :user2Id" +
           "  )" +
           ")")
    Optional<ChatRooms> findPrivateRoomBetweenUsers(@Param("user1Id") Integer user1Id, @Param("user2Id") Integer user2Id);
}
