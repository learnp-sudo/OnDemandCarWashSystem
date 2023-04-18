package com.green.car.wash.controller;

import java.util.HashSet;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.green.car.wash.model.ERole;
import com.green.car.wash.model.JwtResponse;
import com.green.car.wash.model.LoginRequest;
import com.green.car.wash.model.MessageResponse;
import com.green.car.wash.model.Role;
import com.green.car.wash.model.SignupRequest;
import com.green.car.wash.model.User;
import com.green.car.wash.repository.RoleRepository;
import com.green.car.wash.repository.UserRepository;
import com.green.car.wash.service.UserDetailsImpl;
import com.green.car.wash.util.JwtUtils;

@RestController
@CrossOrigin(origins = "http://localhost:4200",maxAge=3600,allowCredentials = "true")
@RequestMapping("/api/auth")
public class AuthController {
	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	UserRepository userRepository;

	@Autowired
	RoleRepository roleRepository;

	@Autowired
	PasswordEncoder encoder;

	@Autowired
	JwtUtils jwtUtils;

	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJwtToken(authentication);

		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
		List<String> roles = userDetails.getAuthorities().stream().map(item -> item.getAuthority())
				.collect(Collectors.toList());

		return ResponseEntity.ok(
				new JwtResponse(jwt, userDetails.getId(), userDetails.getUsername(), userDetails.getEmail(), roles));
	}


	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
		if (userRepository.existsByUsername(signUpRequest.getUsername())) {
			return ResponseEntity.badRequest().body(new MessageResponse("Error: Username is already taken!"));
		}

		if (userRepository.existsByEmail(signUpRequest.getEmail())) {
			return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already in use!"));
		}


		// Create new user's account
		User user = new User(signUpRequest.getUsername(), signUpRequest.getEmail(),
				encoder.encode(signUpRequest.getPassword()),  signUpRequest.getFullName(),signUpRequest.getPhoneNumber());

		Set<String> strRoles = signUpRequest.getRoles();
		Set<Role> roles = new HashSet<>();

		if (strRoles == null) {

			    	throw new RuntimeException("Error: Role is not found.");

		} else {
			strRoles.forEach(role -> {
				switch (role) {
				case "user":
					Role userRole = roleRepository.findByName(ERole.ROLE_USER)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(userRole);

					break;
				case "washer":
					Role modRole = roleRepository.findByName(ERole.ROLE_WASHER)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(modRole);

					break;
				case "admin":
					Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(adminRole);
				}
			});
		}

		user.setRoles(roles);
		//user.setRoles((new HashSet<>(Arrays.asList(roles))));
		userRepository.save(user);

		return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
	}

}
