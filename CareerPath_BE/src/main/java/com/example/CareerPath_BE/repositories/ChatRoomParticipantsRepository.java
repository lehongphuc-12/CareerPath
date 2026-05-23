package com.example.CareerPath_BE.repositories;

import com.example.CareerPath_BE.entities.ChatRoomParticipants;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChatRoomParticipantsRepository extends JpaRepository<ChatRoomParticipants, Integer> {

    List<ChatRoomParticipants> findByChatRooms_RoomId(Integer roomId);

    Optional<ChatRoomParticipants> findByChatRooms_RoomIdAndUsers_UserId(Integer roomId, Integer userId);

    @Query("SELECT p FROM ChatRoomParticipants p JOIN FETCH p.chatRooms r WHERE p.users.userId = :userId ORDER BY r.updatedAt DESC")
    List<ChatRoomParticipants> findAllByUserIdOrderByRoomUpdatedAtDesc(@Param("userId") Integer userId);
}
