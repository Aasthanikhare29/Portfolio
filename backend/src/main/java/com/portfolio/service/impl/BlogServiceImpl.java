package com.portfolio.service.impl;

import com.portfolio.dto.request.BlogRequest;
import com.portfolio.entity.Blog;
import com.portfolio.entity.BlogTag;
import com.portfolio.exception.ResourceNotFoundException;
import com.portfolio.repository.BlogRepository;
import com.portfolio.repository.BlogTagRepository;
import com.portfolio.service.BlogService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class BlogServiceImpl implements BlogService {

    private final BlogRepository blogRepository;
    private final BlogTagRepository tagRepository;

    @Override
    public List<Blog> getAllBlogs() {
        return blogRepository.findAllByOrderByCreatedAtDesc();
    }

    @Override
    public List<Blog> getPublishedBlogs() {
        return blogRepository.findByPublishedTrueOrderByPublishedAtDesc();
    }

    @Override
    public Blog getBlogById(Long id) {
        return blogRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Blog", id));
    }

    @Override
    public Blog getBlogBySlug(String slug) {
        return blogRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Blog not found with slug: " + slug));
    }

    @Override
    @Transactional
    public Blog createBlog(BlogRequest request) {
        Blog blog = Blog.builder()
                .title(request.getTitle())
                .slug(request.getSlug())
                .content(request.getContent())
                .excerpt(request.getExcerpt())
                .coverImage(request.getCoverImage())
                .readTime(request.getReadTime())
                .published(request.getPublished() != null ? request.getPublished() : false)
                .publishedAt(request.getPublished() != null && request.getPublished() ? LocalDate.now() : null)
                .createdAt(LocalDate.now())
                .build();

        if (request.getTags() != null) {
            blog.setTags(resolveTags(request.getTags()));
        }

        return blogRepository.save(blog);
    }

    @Override
    @Transactional
    public Blog updateBlog(Long id, BlogRequest request) {
        Blog blog = getBlogById(id);

        if (request.getTitle() != null) blog.setTitle(request.getTitle());
        if (request.getSlug() != null) blog.setSlug(request.getSlug());
        if (request.getContent() != null) blog.setContent(request.getContent());
        if (request.getExcerpt() != null) blog.setExcerpt(request.getExcerpt());
        if (request.getCoverImage() != null) blog.setCoverImage(request.getCoverImage());
        if (request.getReadTime() != null) blog.setReadTime(request.getReadTime());
        if (request.getPublished() != null) {
            blog.setPublished(request.getPublished());
            if (request.getPublished() && blog.getPublishedAt() == null) {
                blog.setPublishedAt(LocalDate.now());
            }
        }

        if (request.getTags() != null) {
            blog.getTags().clear();
            blog.getTags().addAll(resolveTags(request.getTags()));
        }

        return blogRepository.save(blog);
    }

    @Override
    @Transactional
    public void deleteBlog(Long id) {
        blogRepository.delete(getBlogById(id));
    }

    private Set<BlogTag> resolveTags(Set<String> tagNames) {
        Set<BlogTag> tags = new HashSet<>();
        for (String name : tagNames) {
            BlogTag tag = tagRepository.findByName(name)
                    .orElseGet(() -> tagRepository.save(BlogTag.builder().name(name).build()));
            tags.add(tag);
        }
        return tags;
    }
}
