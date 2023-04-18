package com.green.car.wash.model;

import java.util.Set;

import javax.validation.constraints.*;

import org.springframework.data.mongodb.core.mapping.DBRef;

public class SignupRequest {
	@NotBlank
	@Size(min = 3, max = 20)
	private String username;


	@NotBlank
	@Size(max = 50)
	@Email
	private String email;
	private String fullName;
	private Set<String> roles;

	@NotBlank
	@Size(min = 6, max = 40)
	private String password;
	private String phoneNumber;
	public String getPhoneNumber() {
		return phoneNumber;
	}
	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String getFullName() {
		return fullName;
	}
	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Set<String> getRoles() {
		return this.roles;
	}

	public void setRole(Set<String> roles) {
		this.roles = roles;
	}
}
