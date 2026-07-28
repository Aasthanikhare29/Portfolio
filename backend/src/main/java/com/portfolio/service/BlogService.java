package com.portfolio.service;

import com.portfolio.dto.request.BlogRequest;
import com.portfolio.entity.Blog;
import java.util.List;

public interface BlogService {
    List<Blog> getAllBlogs();
    List<Blog> getPublishedBlogs();
    Blog getBlogById(Long id);
    Blog getBlogBySlug(String slug);
    Blog createBlog(BlogRequest request);
    Blog updateBlog(Long id, BlogRequest request);
    void deleteBlog(Long id);
}
