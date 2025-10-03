package com.web.web_app.controller;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.util.Map;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.web.web_app.dto.UserDto;
import com.web.web_app.model.User;
import com.web.web_app.services.UserService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;



import org.springframework.security.access.prepost.PreAuthorize;

@RestController
@RequestMapping("/api/users")
@PreAuthorize("hasAuthority('ADMIN')")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping
    public Page<UserDto> getAllUsers(Pageable pageable) {
        return userService.getAll(pageable).map(user -> modelMapper.map(user, UserDto.class));
    }

    @PostMapping
    public ResponseEntity<UserDto> createUser(@Valid @RequestBody UserDto userdto) {
        User userRequest = modelMapper.map(userdto, User.class);
        userRequest.setPassword(userService.hashPassword(userRequest.getPassword()));
        User user = userService.create(userRequest);
        UserDto postResponse = modelMapper.map(user, UserDto.class);
        return new ResponseEntity<UserDto>(postResponse, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getPostById(@PathVariable(name = "id") Long id) {
        User user = userService.getById(id);
        UserDto postResponse = modelMapper.map(user, UserDto.class);
        return ResponseEntity.ok().body(postResponse);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDto> updatePost(@PathVariable long id, @Valid @RequestBody UserDto userDto) {
        User postRequest = modelMapper.map(userDto, User.class);
        User user = userService.update(id, postRequest);
        UserDto postResponse = modelMapper.map(user, UserDto.class);
        return ResponseEntity.ok().body(postResponse);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePost(@PathVariable(name = "id") Long id) {
        userService.delete(id);
        return new ResponseEntity<String>("Deleted", HttpStatus.OK);
    }

    // Visualizza il profilo dell'utente autenticato
    @GetMapping("/me")
    public ResponseEntity<UserDto> getMe(Authentication authentication) {
        String email = authentication.getName();
        User user = userService.getByEmail(email);
        UserDto userDto = modelMapper.map(user, UserDto.class);
        return ResponseEntity.ok(userDto);
    }

    // Aggiorna il profilo dell'utente autenticato
    @PutMapping("/me")
    public ResponseEntity<UserDto> updateMe(@Valid @RequestBody UserDto userDto, Authentication authentication) {
        String email = authentication.getName();
        User user = userService.getByEmail(email);
        user.setName(userDto.getName());
        user.setSurname(userDto.getSurname());
        userService.create(user); // save changes
        UserDto updated = modelMapper.map(user, UserDto.class);
        return ResponseEntity.ok(updated);
    }

    // Cambia la password dell'utente autenticato
    @PutMapping("/me/password")
    public ResponseEntity<String> changePassword(@RequestBody Map<String, String> body, Authentication authentication) {
        String email = authentication.getName();
        User user = userService.getByEmail(email);
        String oldPassword = body.get("oldPassword");
        String newPassword = body.get("newPassword");
        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            return ResponseEntity.status(400).body("Vecchia password errata");
        }
        user.setPassword(passwordEncoder.encode(newPassword));
        userService.create(user);
        return ResponseEntity.ok("Password aggiornata");
    }

    // Elimina il proprio account
    @DeleteMapping("/me")
    public ResponseEntity<String> deleteMe(Authentication authentication) {
        String email = authentication.getName();
        User user = userService.getByEmail(email);
        userService.delete(user.getId());
        return ResponseEntity.ok("Account eliminato");
    }
public class UserController {
    
    @Autowired
    private UserService userService;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private PasswordEncoder passwordEncoder;

    // Visualizza il profilo dell'utente autenticato
    @GetMapping("/me")
    public ResponseEntity<UserDto> getMe(Authentication authentication) {
        String email = authentication.getName();
        User user = userService.getByEmail(email);
        UserDto userDto = modelMapper.map(user, UserDto.class);
        return ResponseEntity.ok(userDto);
    }

    // Aggiorna il profilo dell'utente autenticato
    @PutMapping("/me")
    public ResponseEntity<UserDto> updateMe(@Valid @RequestBody UserDto userDto, Authentication authentication) {
        String email = authentication.getName();
        User user = userService.getByEmail(email);
        user.setName(userDto.getName());
        user.setSurname(userDto.getSurname());
        userService.create(user); // save changes
        UserDto updated = modelMapper.map(user, UserDto.class);
        return ResponseEntity.ok(updated);
    }

    // Cambia la password dell'utente autenticato
    @PutMapping("/me/password")
    public ResponseEntity<String> changePassword(@RequestBody Map<String, String> body, Authentication authentication) {
        String email = authentication.getName();
        User user = userService.getByEmail(email);
        String oldPassword = body.get("oldPassword");
        String newPassword = body.get("newPassword");
        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            return ResponseEntity.status(400).body("Vecchia password errata");
        }
        user.setPassword(passwordEncoder.encode(newPassword));
        userService.create(user);
        return ResponseEntity.ok("Password aggiornata");
    }

    // Elimina il proprio account
    @DeleteMapping("/me")
    public ResponseEntity<String> deleteMe(Authentication authentication) {
        String email = authentication.getName();
        User user = userService.getByEmail(email);
        userService.delete(user.getId());
        return ResponseEntity.ok("Account eliminato");
    }
}
