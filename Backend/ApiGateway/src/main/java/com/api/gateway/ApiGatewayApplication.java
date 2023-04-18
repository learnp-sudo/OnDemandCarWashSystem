package com.api.gateway;

import org.springframework.boot.SpringApplication;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.*;


@SpringBootApplication
@EnableEurekaClient
@CrossOrigin(origins = "http://localhost:4200", methods = { RequestMethod.PUT, RequestMethod.GET, RequestMethod.DELETE,RequestMethod.POST })
public class ApiGatewayApplication {

	public static void main(String[] args) {
		SpringApplication.run(ApiGatewayApplication.class, args);
	}
//client
}
