package com.web.web_app;

import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.web.web_app.services.UserService;
import com.web.web_app.utilities.JwtFilter;


@SpringBootApplication
public class WebAppApplication {

    @Bean
    ModelMapper modelMapper() {
		return new ModelMapper();
	}

    @Bean
    UserService userService() {
		return new UserService();
	}

	@Bean
	JwtFilter jwtFilter() {
		return new JwtFilter();
	}

	public static void main(String[] args) {
		SpringApplication.run(WebAppApplication.class, args);
	}

}
