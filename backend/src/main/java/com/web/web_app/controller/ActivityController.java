package com.web.web_app.controller;

import com.web.web_app.model.Activity;
import com.web.web_app.repository.ActivityRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/activities")
public class ActivityController {

    @Autowired
    private ActivityRepo activityRepo;

    @PostMapping
    public Activity addActivity(@RequestBody Activity activity) {
        return activityRepo.save(activity);
    }

    @GetMapping
    public List<Activity> getAllActivities() {
        return activityRepo.findAll();
    }

}