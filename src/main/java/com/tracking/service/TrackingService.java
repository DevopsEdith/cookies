package com.tracking.service;

import com.tracking.dto.TrackingEventDTO;
import com.tracking.model.TrackingEvent;
import com.tracking.repository.TrackingEventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TrackingService {

    private final TrackingEventRepository repository;

    public void saveEvent(TrackingEventDTO dto, String ipAddress, String userAgent) {
        TrackingEvent event = new TrackingEvent();
        event.setTrackingId(dto.getTrackingId());
        event.setEventType(dto.getEventType());
        event.setEventData(dto.getEventData());
        event.setUserId(dto.getUserId());
        event.setSessionId(dto.getSessionId());
        event.setIpAddress(ipAddress);
        event.setUserAgent(userAgent);
        
        repository.save(event);
    }
}