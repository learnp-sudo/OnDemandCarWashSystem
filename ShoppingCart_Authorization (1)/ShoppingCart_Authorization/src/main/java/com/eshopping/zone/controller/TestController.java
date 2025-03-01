package com.eshopping.zone.controller;

import javax.annotation.security.RolesAllowed;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200",maxAge=3600,allowCredentials = "true")
@RequestMapping("/api/test")
public class TestController {
	
		@GetMapping("/all")
		public String allAccess() {
			return "Public Content.";
		}
		
		@GetMapping("/user")
		//@PreAuthorize("hasRole('USER')")
		@RolesAllowed("ROLE_USER")
		public String userAccess() {
			return "User Content.";
		}

		@GetMapping("/mod")
		@PreAuthorize("hasRole('ROLE_MODERATOR')")
		public String moderatorAccess() {
			return "Moderator Board.";
		}

		@GetMapping("/admin")
		@RolesAllowed("ROLE_ADMIN")
		public String adminAccess() {
			return "Admin Board.";
		}
	}
