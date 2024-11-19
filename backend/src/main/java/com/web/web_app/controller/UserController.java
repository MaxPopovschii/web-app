package com.web.web_app.controller;

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



@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @Autowired
    private UserService userService;

    private ModelMapper modelMapper;

    @GetMapping
    public List<UserDto> getAllUsers() {
        return userService.getAll().stream().map(user -> modelMapper.map(user, UserDto.class)).collect(Collectors.toList());
    }
    
    @PostMapping
    public ResponseEntity<UserDto> createUser(@RequestBody UserDto userdto) {
        User userRequest = modelMapper.map(userdto, User.class);

        // Save hashed password
        userRequest.setPassword(userService.hashPassword(userRequest.getPassword()));

        User user = userService.create(userRequest);

        UserDto postResponse = modelMapper.map(user, UserDto.class);

        return new ResponseEntity<UserDto>(postResponse, HttpStatus.CREATED);
    }


    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getPostById(@PathVariable(name = "id") Long id) {
		User user = userService.getById(id);

		// convert entity to DTO
		UserDto postResponse = modelMapper.map(user, UserDto.class);

		return ResponseEntity.ok().body(postResponse);
	}
    

    @PutMapping("/{id}")
	public ResponseEntity<UserDto> updatePost(@PathVariable long id, @RequestBody UserDto userDto) {

		// convert DTO to Entity
		User postRequest = modelMapper.map(userDto, User.class);

		User user = userService.update(id, postRequest);

		// entity to DTO
		UserDto postResponse = modelMapper.map(user, UserDto.class);

		return ResponseEntity.ok().body(postResponse);
	}


    @DeleteMapping("/{id}")
	public ResponseEntity<String> deletePost(@PathVariable(name = "id") Long id) {
		userService.delete(id);
		return new ResponseEntity<String>("Deleted", HttpStatus.OK);
	}
}
