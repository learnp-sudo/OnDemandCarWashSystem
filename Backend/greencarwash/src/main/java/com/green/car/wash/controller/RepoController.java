package com.green.car.wash.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import com.green.car.wash.model.User;
import com.green.car.wash.repository.UserRepository;
import com.green.car.wash.service.RepoService;


@RestController
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials = "true")
@RequestMapping("/manage")
public class RepoController {
    @Autowired
	private RepoService userService;
    @Autowired
	private UserRepository repo;

	@GetMapping("/all")
	public List<User> getAllUser() {
		return userService.getAllUser();
	}

	@PutMapping("/update/{Id}")
	public ResponseEntity updateDetails(@PathVariable String Id, @RequestBody User details) {
		userService.updateDetails(details);

		return ResponseEntity.ok().build();
	}

	@GetMapping("/{username}")
	public List<User> customerSpecific(@PathVariable String username) {
		return userService.CustomerSpecific(username);
	}

	@DeleteMapping("/delete/{email}")
	public void deleteproduct(@PathVariable String email) {
		userService.deleteProfile(email);

	}
	 @PutMapping("/updateDetails/{email}")
	    public ResponseEntity updateByEmail(@PathVariable String email ,@RequestBody User details)
	    {
	    	userService.updateByEmail(details);
	    	return ResponseEntity.ok().build();
	    }
	 @GetMapping("/users/{role}")
	    public List<User> getUserByRole(@PathVariable String role){
	        return userService.findListbyRole(role);
	    }
}
