package com.eshopping.zone.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.eshopping.zone.model.ERole;
import com.eshopping.zone.model.Role;




public interface RoleRepository extends MongoRepository<Role, String> {
	Optional<Role> findByName(ERole name);
}
