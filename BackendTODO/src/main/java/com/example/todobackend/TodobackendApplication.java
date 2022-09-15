package com.example.todobackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class TodobackendApplication {

    public static void main(String[] args) {

        SpringApplication.run(TodobackendApplication.class, args);
    }

}
