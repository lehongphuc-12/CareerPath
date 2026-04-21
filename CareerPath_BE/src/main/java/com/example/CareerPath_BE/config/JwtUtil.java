package com.example.CareerPath_BE.config;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.List;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}") // milliseconds
    private long expiration;

    private Key getSignKey() {
        return Keys.hmacShaKeyFor(secret.getBytes());
    }

    // 🔐 Generate token
    public String generateToken(Long userId, List<String> roles) {
        return Jwts.builder()
                .setSubject(String.valueOf(userId)) // dùng userId thay vì username
                .claim("roles", roles)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getSignKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    // 📥 Lấy toàn bộ claims
    public Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSignKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // 👤 Lấy userId
    public Long extractUserId(String token) {
        return Long.parseLong(extractAllClaims(token).getSubject());
    }

    // 🎭 Lấy roles
    public List<String> extractRoles(String token) {
        return extractAllClaims(token).get("roles", List.class);
    }

    // ⏰ Check hết hạn
    public boolean isTokenExpired(String token) {
        return extractAllClaims(token).getExpiration().before(new Date());
    }

    // ✅ Validate chuẩn
    public boolean validateToken(String token) {
        try {
            extractAllClaims(token); // parse là đã verify signature
            return !isTokenExpired(token);
        } catch (ExpiredJwtException e) {
            System.out.println("Token expired");
        } catch (UnsupportedJwtException e) {
            System.out.println("Unsupported token");
        } catch (MalformedJwtException e) {
            System.out.println("Malformed token");
        } catch (SecurityException e) {
            System.out.println("Invalid signature");
        } catch (IllegalArgumentException e) {
            System.out.println("Empty token");
        }
        return false;
    }
}