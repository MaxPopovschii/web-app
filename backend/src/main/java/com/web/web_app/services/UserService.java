package com.web.web_app.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.web.web_app.model.User;
import com.web.web_app.repository.UserRepo;

public class UserService  extends UserDetailsServiceAdapter implements Service<User>{
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private  PasswordEncoder passwordEncoder;

    @Override
    public List<User> getAll() {
        return userRepo.findAll();
    }


    @Override
    public User create(User entity) {
        return userRepo.save(entity);
    }


    @Override
    public User update(Long id, User entity) {
        User user = userRepo.findById(id).orElseThrow();
        user.setEmail(entity.getEmail());
        user.setName(entity.getName());
        user.setSurname(entity.getSurname());
        user.setPassword(entity.getPassword());
        return userRepo.save(user);
    }


    @Override
    public void delete(Long id) {
        User user = userRepo.findById(id).orElseThrow();
        userRepo.delete(user);
    }


    @Override
    public User getById(Long id) {
        User user = userRepo.findById(id).orElseThrow();
        return user;
    }

    public User getByEmail(String email) {
        User user = userRepo.findByEmail(email).orElseThrow();
        return user;
    }

    public String hashPassword(String plainPassword) {
        return passwordEncoder.encode(plainPassword);
    }

    public boolean matchesPassword(String plainPassword, String hashedPassword) {
        return passwordEncoder.matches(plainPassword, hashedPassword);
    }
}
