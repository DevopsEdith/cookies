package com.tracking.controller;

import com.tracking.dto.TrackingEventDTO;
import com.tracking.service.TrackingService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/track")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class TrackingController {

    private final TrackingService trackingService;

    @PostMapping
    public ResponseEntity<?> trackEvent(
            @Valid @RequestBody TrackingEventDTO eventDTO,
            HttpServletRequest request) {
        
        String ipAddress = request.getHeader("X-Forwarded-For");
        if (ipAddress == null) {
            ipAddress = request.getRemoteAddr();
        }
        
        String userAgent = request.getHeader("User-Agent");
        
        trackingService.saveEvent(eventDTO, ipAddress, userAgent);
        return ResponseEntity.ok().build();
    }
}