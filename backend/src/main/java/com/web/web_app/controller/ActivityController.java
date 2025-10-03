package com.web.web_app.controller;

import com.web.web_app.model.Activity;
import com.web.web_app.services.ActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.springframework.security.access.prepost.PreAuthorize;

@RestController
@RequestMapping("/api/activities")
@PreAuthorize("hasAnyAuthority('USER', 'ADMIN')")
public class ActivityController {

    @Autowired
    private ActivityService activityService;

    @PostMapping
    public ResponseEntity<Activity> addActivity(@Valid @RequestBody Activity activity) {
        Activity saved = activityService.create(activity);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @GetMapping
    public Page<Activity> getAllActivities(Pageable pageable) {
        return activityService.getAll(pageable);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Activity> getActivityById(@PathVariable Long id) {
        Activity activity = activityService.getById(id);
        return ResponseEntity.ok(activity);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Activity> updateActivity(@PathVariable Long id, @Valid @RequestBody Activity activity) {
        Activity updated = activityService.update(id, activity);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteActivity(@PathVariable Long id) {
        activityService.delete(id);
        return ResponseEntity.ok("Deleted");
    }
}