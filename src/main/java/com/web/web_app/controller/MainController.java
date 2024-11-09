package com.web.web_app.controller;

import java.util.List;

import org.springframework.web.bind.annotation.RestController;
 
import com.web.web_app.model.Cat;
import com.web.web_app.repository.CatRepo;

import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;







@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class MainController {
    
    private final CatRepo catRepo;

    @PostMapping("/new")
    public void addCat(@RequestBody Cat cat) {
        log.info("New row: " + catRepo.save(cat));
    }
    
    @SneakyThrows
    @GetMapping("/all")
    public List<Cat> getAllCats() {
        return catRepo.findAll();
    }

    @GetMapping()
    public Cat getCatByID(@RequestParam int id) {
        return catRepo.findById(id).orElseThrow();
    }
    
    @DeleteMapping()
    public void deleteCat(@RequestParam int id) {
        catRepo.deleteById(id);
    }

    @PutMapping()
    public String changeCat(@RequestBody Cat entity) {
        if (!catRepo.existsById(entity.getId())) {
            return "No such row";
        }
        
        return catRepo.save(entity).toString();
    }
}
