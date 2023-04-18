package com.green.car.wash.service;



import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.green.car.wash.model.ERole;
import com.green.car.wash.model.Role;
import com.green.car.wash.model.User;
import com.green.car.wash.repository.RoleRepository;
import com.green.car.wash.repository.UserRepository;








@Service
public class  RepoService {
	@Autowired
	UserRepository userRepository;
	@Autowired
	RoleRepository roleRepository;


	//deleting customer profile by id
	public String deleteProfile(String email){
		userRepository.deleteByEmail(email);

        return "ID -> "+email+" deleted successfully";
    }
	//updating the existing customer details
	public void updateDetails(User details) {
		User detail =userRepository.findById(details.getId())
				.orElseThrow(()->new RuntimeException( String.format("cannot find id %s",details.getId())));
		detail.setEmail(details.getEmail());
		detail.setFullName(details.getFullName());
		detail.setPassword(details.getPassword());
		detail.setPhoneNumber(details.getPhoneNumber());
		userRepository.save(details);
	}
	//method for retrieving customer details according to id
    public List<User> CustomerSpecific(String username){
		        List<User> customerDetail=userRepository.findAll()
		        		.stream().filter(x -> x.getUsername().contains(username)).collect(Collectors.toList());
		        return customerDetail;
    }

	public List<User> getAllUser() {
   System.out.println("entered");
		        return userRepository.findAll();
		    }
	public void updateByEmail(User details) {
		User detail = userRepository.findByEmail(details.getEmail())
				.orElseThrow(() -> new RuntimeException(String.format("cannot find emailId %s", details.getEmail())));
		detail.setStatus(details.getStatus());
		detail.setPassword(details.getPassword());
		detail.setPhoneNumber(details.getPhoneNumber());
		userRepository.save(details);
	}

	public List<User> findListbyRole(String role) {
		Set<Role> roles = new HashSet<>();
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
		return userRepository.findByRolesIn(roles);
	}

	}



