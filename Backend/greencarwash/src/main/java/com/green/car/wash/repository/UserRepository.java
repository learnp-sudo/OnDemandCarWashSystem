package com.green.car.wash.repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.green.car.wash.model.Role;
import com.green.car.wash.model.User;



@Repository
public interface UserRepository extends MongoRepository<User, String> {
	Optional<User> findByUsername(String username);

	Boolean existsByUsername(String username);

	Boolean existsByEmail(String email);

	Optional<User> findByEmail(String email);

	List<User> findByRolesIn(Set<Role> roles);

	void deleteByEmail(String email);


}
