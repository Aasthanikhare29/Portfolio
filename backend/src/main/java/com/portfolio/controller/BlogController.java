package com.portfolio.controller;

import com.portfolio.dto.request.BlogRequest;
import com.portfolio.dto.response.ApiResponse;
import com.portfolio.entity.Blog;
import com.portfolio.service.BlogService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class BlogController {

    private final BlogService blogService;

    @GetMapping("/blogs")
    public ResponseEntity<ApiResponse<List<Blog>>> getAll() {
        return ResponseEntity.ok(ApiResponse.success(blogService.getAllBlogs()));
    }

    @GetMapping("/blogs/published")
    public ResponseEntity<ApiResponse<List<Blog>>> getPublished() {
        return ResponseEntity.ok(ApiResponse.success(blogService.getPublishedBlogs()));
    }

    @GetMapping("/blogs/{id}")
    public ResponseEntity<ApiResponse<Blog>> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(blogService.getBlogById(id)));
    }

    @GetMapping("/blogs/slug/{slug}")
    public ResponseEntity<ApiResponse<Blog>> getBySlug(@PathVariable String slug) {
        return ResponseEntity.ok(ApiResponse.success(blogService.getBlogBySlug(slug)));
    }

    @PostMapping("/admin/blogs")
    public ResponseEntity<ApiResponse<Blog>> create(@RequestBody BlogRequest request) {
        return ResponseEntity.ok(ApiResponse.success(blogService.createBlog(request), "Blog created"));
    }

    @PutMapping("/admin/blogs/{id}")
    public ResponseEntity<ApiResponse<Blog>> update(@PathVariable Long id, @RequestBody BlogRequest request) {
        return ResponseEntity.ok(ApiResponse.success(blogService.updateBlog(id, request), "Blog updated"));
    }

    @DeleteMapping("/admin/blogs/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        blogService.deleteBlog(id);
        return ResponseEntity.ok(ApiResponse.success(null, "Blog deleted"));
    }
}
