package com.portfolio.service;

import com.portfolio.dto.request.ContactRequest;
import com.portfolio.entity.ContactMessage;
import java.util.List;

public interface ContactMessageService {
    ContactMessage createMessage(ContactRequest request);
    List<ContactMessage> getAllMessages();
    ContactMessage markAsRead(Long id);
    long getUnreadCount();
    void deleteMessage(Long id);
}
