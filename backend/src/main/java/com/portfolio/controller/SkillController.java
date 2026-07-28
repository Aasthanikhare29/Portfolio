package com.portfolio.controller;

import com.portfolio.dto.request.SkillRequest;
import com.portfolio.dto.response.ApiResponse;
import com.portfolio.entity.Skill;
import com.portfolio.service.SkillService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class SkillController {

    private final SkillService skillService;

    @GetMapping("/skills")
    public ResponseEntity<ApiResponse<List<Skill>>> getAll() {
        return ResponseEntity.ok(ApiResponse.success(skillService.getAllSkills()));
    }

    @GetMapping("/skills/{id}")
    public ResponseEntity<ApiResponse<Skill>> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(skillService.getSkillById(id)));
    }

    @PostMapping("/admin/skills")
    public ResponseEntity<ApiResponse<Skill>> create(@RequestBody SkillRequest request) {
        return ResponseEntity.ok(ApiResponse.success(skillService.createSkill(request), "Skill created"));
    }

    @PutMapping("/admin/skills/{id}")
    public ResponseEntity<ApiResponse<Skill>> update(@PathVariable Long id, @RequestBody SkillRequest request) {
        return ResponseEntity.ok(ApiResponse.success(skillService.updateSkill(id, request), "Skill updated"));
    }

    @DeleteMapping("/admin/skills/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        skillService.deleteSkill(id);
        return ResponseEntity.ok(ApiResponse.success(null, "Skill deleted"));
    }
}
