package com.example.firstepamproject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
public class FirstEpamProjectApplication {

    public static void main(String[] args) {
        SpringApplication.run(FirstEpamProjectApplication.class, args);
    }


}
