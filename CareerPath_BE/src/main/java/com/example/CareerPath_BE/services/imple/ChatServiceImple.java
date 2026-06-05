package com.example.CareerPath_BE.services.imple;

import com.example.CareerPath_BE.dtos.Chat.ChatMessageResponse;
import com.example.CareerPath_BE.dtos.Chat.ChatRoomResponse;
import com.example.CareerPath_BE.dtos.Chat.ParticipantResponse;
import com.example.CareerPath_BE.entities.*;
import com.example.CareerPath_BE.repositories.*;
import com.example.CareerPath_BE.services.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChatServiceImple implements ChatService {

    private final ChatRoomsRepository chatRoomsRepository;
    private final ChatRoomParticipantsRepository chatRoomParticipantsRepository;
    private final ChatMessagesRepository chatMessagesRepository;
    private final UsersRepository usersRepository;
    private final UserProfilesRepository userProfilesRepository;

    @Override
    @Transactional(readOnly = true)
    public List<ParticipantResponse> getMentors() {
        List<Users> mentors = usersRepository.findByRoles_Name("MENTOR");
        if (mentors.isEmpty()) {
            mentors = usersRepository.findByRoles_Name("Mentor");
        }

        return mentors.stream()
                .map(this::mapToParticipantResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ParticipantResponse> getMentorsByCareerId(Integer careerId) {
        List<Users> mentors = usersRepository.findByRoles_NameAndCareers_CareerId("MENTOR", careerId);
        if (mentors.isEmpty()) {
            mentors = usersRepository.findByRoles_NameAndCareers_CareerId("Mentor", careerId);
        }

        return mentors.stream()
                .map(this::mapToParticipantResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ChatRoomResponse> getUserRooms(Integer userId) {
        List<ChatRoomParticipants> participants = chatRoomParticipantsRepository
                .findAllByUserIdOrderByRoomUpdatedAtDesc(userId);

        return participants.stream().map(p -> {
            ChatRooms room = p.getChatRooms();
            
            // Tìm đối phương trong phòng chat 1:1
            Users otherUser = null;
            List<ChatRoomParticipants> roomMembers = chatRoomParticipantsRepository
                    .findByChatRooms_RoomId(room.getRoomId());
            for (ChatRoomParticipants member : roomMembers) {
                if (!member.getUsers().getUserId().equals(userId)) {
                    otherUser = member.getUsers();
                    break;
                }
            }

            ParticipantResponse otherParticipantResponse = null;
            if (otherUser != null) {
                otherParticipantResponse = mapToParticipantResponse(otherUser);
            }

            // Lấy tin nhắn cuối cùng
            Page<ChatMessages> lastMsgPage = chatMessagesRepository
                    .findByChatRooms_RoomIdOrderByCreatedAtDesc(room.getRoomId(), PageRequest.of(0, 1));
            
            ChatMessageResponse lastMessageResponse = null;
            if (lastMsgPage.hasContent()) {
                lastMessageResponse = mapToChatMessageResponse(lastMsgPage.getContent().get(0));
            }

            return ChatRoomResponse.builder()
                    .roomId(room.getRoomId())
                    .name(room.getIsGroup() ? room.getName() : (otherUser != null ? otherUser.getFullName() : room.getName()))
                    .isGroup(room.getIsGroup())
                    .createdAt(room.getCreatedAt())
                    .updatedAt(room.getUpdatedAt())
                    .otherParticipant(otherParticipantResponse)
                    .lastMessage(lastMessageResponse)
                    .build();
        }).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ChatRoomResponse getOrCreatePrivateRoom(Integer userId1, Integer userId2) {
        Optional<ChatRooms> existingRoomOpt = chatRoomsRepository.findPrivateRoomBetweenUsers(userId1, userId2);
        ChatRooms room;

        if (existingRoomOpt.isPresent()) {
            room = existingRoomOpt.get();
        } else {
            // Tạo mới phòng chat
            room = new ChatRooms();
            room.setIsGroup(false);
            room.setName("Private Chat");
            room.setCreatedAt(new Date());
            room.setUpdatedAt(new Date());
            room = chatRoomsRepository.save(room);

            // Thêm participant 1
            Users user1 = usersRepository.findById(userId1)
                    .orElseThrow(() -> new RuntimeException("User not found: " + userId1));
            ChatRoomParticipants p1 = new ChatRoomParticipants(room, user1);
            chatRoomParticipantsRepository.save(p1);

            // Thêm participant 2
            Users user2 = usersRepository.findById(userId2)
                    .orElseThrow(() -> new RuntimeException("User not found: " + userId2));
            ChatRoomParticipants p2 = new ChatRoomParticipants(room, user2);
            chatRoomParticipantsRepository.save(p2);
        }

        // Map sang response
        Users otherUser = usersRepository.findById(userId2)
                .orElseThrow(() -> new RuntimeException("User not found: " + userId2));
        
        Page<ChatMessages> lastMsgPage = chatMessagesRepository
                .findByChatRooms_RoomIdOrderByCreatedAtDesc(room.getRoomId(), PageRequest.of(0, 1));
        
        ChatMessageResponse lastMessageResponse = null;
        if (lastMsgPage.hasContent()) {
            lastMessageResponse = mapToChatMessageResponse(lastMsgPage.getContent().get(0));
        }

        return ChatRoomResponse.builder()
                .roomId(room.getRoomId())
                .name(otherUser.getFullName())
                .isGroup(false)
                .createdAt(room.getCreatedAt())
                .updatedAt(room.getUpdatedAt())
                .otherParticipant(mapToParticipantResponse(otherUser))
                .lastMessage(lastMessageResponse)
                .build();
    }

    @Override
    @Transactional
    public ChatMessageResponse saveMessage(Integer roomId, Integer senderId, String content) {
        ChatRooms room = chatRoomsRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Chat room not found: " + roomId));

        Users sender = usersRepository.findById(senderId)
                .orElseThrow(() -> new RuntimeException("Sender not found: " + senderId));

        ChatMessages message = new ChatMessages(room, sender, content);
        message.setCreatedAt(new Date());
        message = chatMessagesRepository.save(message);

        // Cập nhật hoạt động cuối cùng của phòng chat
        room.setUpdatedAt(new Date());
        chatRoomsRepository.save(room);

        return mapToChatMessageResponse(message);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ChatMessageResponse> getRoomMessages(Integer roomId) {
        List<ChatMessages> messages = chatMessagesRepository.findByChatRooms_RoomIdOrderByCreatedAtAsc(roomId);
        return messages.stream()
                .map(this::mapToChatMessageResponse)
                .collect(Collectors.toList());
    }

    // Helper map User -> ParticipantResponse
    private ParticipantResponse mapToParticipantResponse(Users user) {
        UserProfiles profile = userProfilesRepository.findByUsersUserId(user.getUserId());
        String image = (profile != null) ? profile.getImage() : null;
        String bio = (profile != null) ? profile.getBio() : null;

        String role = (bio != null && !bio.isBlank())
                ? bio
                : (user.getRoles() != null ? user.getRoles().getName() : "USER");

        return ParticipantResponse.builder()
                .userId(user.getUserId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .image(image)
                .role(role)
                .build();
    }

    // Helper map ChatMessages -> ChatMessageResponse
    private ChatMessageResponse mapToChatMessageResponse(ChatMessages msg) {
        return ChatMessageResponse.builder()
                .messageId(msg.getMessageId())
                .roomId(msg.getChatRooms().getRoomId())
                .senderId(msg.getUsers().getUserId())
                .senderName(msg.getUsers().getFullName())
                .content(msg.getContent())
                .createdAt(msg.getCreatedAt())
                .build();
    }
}
