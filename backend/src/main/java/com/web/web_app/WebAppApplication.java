package com.web.web_app;

import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.web.web_app.services.UserService;


@SpringBootApplication
public class WebAppApplication {


	@Bean
	public ModelMapper modelMapper() {
		return new ModelMapper();
	}

	@Bean
	public UserService userService() {
		return new UserService();
	}

	public static void main(String[] args) {
		SpringApplication.run(WebAppApplication.class, args);
	}

}
