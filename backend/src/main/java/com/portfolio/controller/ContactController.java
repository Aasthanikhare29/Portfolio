package com.portfolio.controller;

import com.portfolio.dto.request.ContactRequest;
import com.portfolio.dto.response.ApiResponse;
import com.portfolio.entity.ContactMessage;
import com.portfolio.service.ContactMessageService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ContactController {

    private final ContactMessageService contactMessageService;

    @PostMapping("/contact")
    public ResponseEntity<ApiResponse<ContactMessage>> submitMessage(@Valid @RequestBody ContactRequest request) {
        return ResponseEntity.ok(ApiResponse.success(contactMessageService.createMessage(request), "Message sent"));
    }

    @GetMapping("/admin/contact/messages")
    public ResponseEntity<ApiResponse<List<ContactMessage>>> getAllMessages() {
        return ResponseEntity.ok(ApiResponse.success(contactMessageService.getAllMessages()));
    }

    @GetMapping("/admin/contact/unread-count")
    public ResponseEntity<ApiResponse<Map<String, Long>>> getUnreadCount() {
        return ResponseEntity.ok(ApiResponse.success(Map.of("count", contactMessageService.getUnreadCount())));
    }

    @PatchMapping("/admin/contact/messages/{id}/read")
    public ResponseEntity<ApiResponse<ContactMessage>> markAsRead(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(contactMessageService.markAsRead(id)));
    }

    @DeleteMapping("/admin/contact/messages/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteMessage(@PathVariable Long id) {
        contactMessageService.deleteMessage(id);
        return ResponseEntity.ok(ApiResponse.success(null));
    }
}
