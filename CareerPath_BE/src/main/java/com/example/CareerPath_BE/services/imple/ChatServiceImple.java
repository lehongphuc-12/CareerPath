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
import org.springframework.security.crypto.password.PasswordEncoder;
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
    private final RolesRepository rolesRepository;
    private final UserProfilesRepository userProfilesRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public List<ParticipantResponse> getMentors() {
        // Tìm kiếm các user có Role là MENTOR
        List<Users> mentors = usersRepository.findByRoles_Name("MENTOR");
        if (mentors.isEmpty()) {
            mentors = usersRepository.findByRoles_Name("Mentor");
        }

        // Tự động seed tài khoản Mentor mẫu nếu Database rỗng
        if (mentors.isEmpty()) {
            Roles mentorRole = rolesRepository.findByName("MENTOR")
                    .orElseGet(() -> rolesRepository.save(new Roles("MENTOR")));

            // Mentor 1
            Users mentor1 = new Users();
            mentor1.setFullName("Trần Minh Quân");
            mentor1.setEmail("quan.tran@careerpath.com");
            mentor1.setPasswordHash(passwordEncoder.encode("123456"));
            mentor1.setCreatedAt(new Date());
            mentor1.setRoles(mentorRole);
            mentor1 = usersRepository.save(mentor1);

            UserProfiles profile1 = new UserProfiles();
            profile1.setUsers(mentor1);
            profile1.setBio("Senior SE tại Google. Practical Coding, Direct Feedback.");
            profile1.setSchool("Google");
            profile1.setGrade(0);
            profile1.setImage("https://i.pravatar.cc/150?u=1");
            userProfilesRepository.save(profile1);

            // Mentor 2
            Users mentor2 = new Users();
            mentor2.setFullName("Lê Thu Hà");
            mentor2.setEmail("ha.le@careerpath.com");
            mentor2.setPasswordHash(passwordEncoder.encode("123456"));
            mentor2.setCreatedAt(new Date());
            mentor2.setRoles(mentorRole);
            mentor2 = usersRepository.save(mentor2);

            UserProfiles profile2 = new UserProfiles();
            profile2.setUsers(mentor2);
            profile2.setBio("Tech Lead tại VNG. Career Strategy, Supportive Tone.");
            profile2.setSchool("VNG");
            profile2.setGrade(0);
            profile2.setImage("https://i.pravatar.cc/150?u=2");
            userProfilesRepository.save(profile2);

            mentors = Arrays.asList(mentor1, mentor2);
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

        return ParticipantResponse.builder()
                .userId(user.getUserId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .image(image)
                .role(user.getRoles() != null ? user.getRoles().getName() : "USER")
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
