package com.portfolio.controller;

import com.portfolio.dto.response.ApiResponse;
import com.portfolio.util.FileUploadUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/upload")
@RequiredArgsConstructor
public class FileUploadController {

    private final FileUploadUtil fileUploadUtil;

    @PostMapping
    public ResponseEntity<ApiResponse<Map<String, String>>> upload(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "dir", defaultValue = "general") String dir) throws IOException {
        String url = fileUploadUtil.uploadFile(file, dir);
        return ResponseEntity.ok(ApiResponse.success(Map.of("url", url), "File uploaded"));
    }
}
