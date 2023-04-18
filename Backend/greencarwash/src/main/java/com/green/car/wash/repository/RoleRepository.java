package com.green.car.wash.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.green.car.wash.model.ERole;
import com.green.car.wash.model.Role;

public interface RoleRepository extends MongoRepository<Role, String> {
	Optional<Role> findByName(ERole name);

}
