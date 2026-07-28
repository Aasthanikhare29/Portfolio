package com.portfolio.service.impl;

import com.portfolio.dto.request.ContactRequest;
import com.portfolio.entity.ContactMessage;
import com.portfolio.exception.ResourceNotFoundException;
import com.portfolio.repository.ContactMessageRepository;
import com.portfolio.service.ContactMessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ContactMessageServiceImpl implements ContactMessageService {

    private final ContactMessageRepository contactMessageRepository;

    @Override
    @Transactional
    public ContactMessage createMessage(ContactRequest request) {
        ContactMessage message = ContactMessage.builder()
                .name(request.getName())
                .email(request.getEmail())
                .subject(request.getSubject())
                .message(request.getMessage())
                .read(false)
                .createdAt(LocalDateTime.now())
                .build();
        return contactMessageRepository.save(message);
    }

    @Override
    public List<ContactMessage> getAllMessages() {
        return contactMessageRepository.findAllByOrderByCreatedAtDesc();
    }

    @Override
    @Transactional
    public ContactMessage markAsRead(Long id) {
        ContactMessage message = contactMessageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ContactMessage", id));
        message.setRead(true);
        return contactMessageRepository.save(message);
    }

    @Override
    public long getUnreadCount() {
        return contactMessageRepository.countByReadFalse();
    }

    @Override
    @Transactional
    public void deleteMessage(Long id) {
        contactMessageRepository.deleteById(id);
    }
}
