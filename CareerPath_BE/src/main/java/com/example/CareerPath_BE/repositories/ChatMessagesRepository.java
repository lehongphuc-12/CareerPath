package com.example.CareerPath_BE.repositories;

import com.example.CareerPath_BE.entities.ChatMessages;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatMessagesRepository extends JpaRepository<ChatMessages, Integer> {

    List<ChatMessages> findByChatRooms_RoomIdOrderByCreatedAtAsc(Integer roomId);

    Page<ChatMessages> findByChatRooms_RoomIdOrderByCreatedAtDesc(Integer roomId, Pageable pageable);
}
