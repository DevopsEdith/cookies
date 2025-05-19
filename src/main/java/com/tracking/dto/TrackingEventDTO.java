package com.tracking.dto;

import lombok.Data;
import jakarta.validation.constraints.NotBlank;

@Data
public class TrackingEventDTO {
    @NotBlank(message = "trackingId est obligatoire")
    private String trackingId;
    
    @NotBlank(message = "eventType est obligatoire")
    private String eventType;
    
    private String eventData;
    private String userId;
    private String sessionId;
}