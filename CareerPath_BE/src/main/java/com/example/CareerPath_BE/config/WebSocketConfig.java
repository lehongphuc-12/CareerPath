package com.example.CareerPath_BE.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        // Kích hoạt simple broker cho tin nhắn phòng (/topic) và tin nhắn cá nhân (/queue)
        config.enableSimpleBroker("/topic", "/queue");
        // Prefix dành cho các message map tới các phương thức @MessageMapping trong Controller
        config.setApplicationDestinationPrefixes("/app");
        // Prefix dành cho tin nhắn gửi trực tiếp tới user cụ thể
        config.setUserDestinationPrefix("/user");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // Cho phép kết nối SockJS
        registry.addEndpoint("/ws")
                .setAllowedOriginPatterns("*")
                .withSockJS();
        
        // Cho phép kết nối WebSocket thuần túy
        registry.addEndpoint("/ws")
                .setAllowedOriginPatterns("*");
    }
}
