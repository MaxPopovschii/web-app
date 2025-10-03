package com.web.web_app.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.web.web_app.model.User;
import com.web.web_app.repository.UserRepo;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import java.util.Collections;

public class UserService extends UserDetailsServiceAdapter implements Service<User> {
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepo.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return org.springframework.security.core.userdetails.User
                .withUsername(user.getEmail())
                .password(user.getPassword())
                .authorities(user.getRole())
                .build();
    }
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private  PasswordEncoder passwordEncoder;

    @Override
    public List<User> getAll() {
        logger.info("Recupero tutti gli utenti");
        return userRepo.findAll();
    }


    @Override
    public User create(User entity) {
        logger.info("Creo nuovo utente: {}", entity.getEmail());
        return userRepo.save(entity);
    }


    @Override
    public User update(Long id, User entity) {
        logger.info("Aggiorno utente con id {}", id);
        User user = userRepo.findById(id).orElseThrow();
        user.setEmail(entity.getEmail());
        user.setName(entity.getName());
        user.setSurname(entity.getSurname());
        user.setPassword(entity.getPassword());
        return userRepo.save(user);
    }


    @Override
    public void delete(Long id) {
        logger.info("Elimino utente con id {}", id);
        User user = userRepo.findById(id).orElseThrow();
        userRepo.delete(user);
    }


    @Override
    public User getById(Long id) {
        logger.info("Recupero utente con id {}", id);
        User user = userRepo.findById(id).orElseThrow();
        return user;
    }

    public User getByEmail(String email) {
        logger.info("Recupero utente con email {}", email);
        User user = userRepo.findByEmail(email).orElseThrow();
        return user;
    }


    public String hashPassword(String plainPassword) {
        return passwordEncoder.encode(plainPassword);
    }

    // Paginazione utenti
    public org.springframework.data.domain.Page<User> getAll(org.springframework.data.domain.Pageable pageable) {
        logger.info("Recupero pagina utenti: {}", pageable);
        return userRepo.findAll(pageable);
    }

    public boolean matchesPassword(String plainPassword, String hashedPassword) {
        return passwordEncoder.matches(plainPassword, hashedPassword);
    }
}
