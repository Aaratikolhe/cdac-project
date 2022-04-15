package com.rentit.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rentit.entity.Admin;
import com.rentit.entity.Login;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Integer>{

	Optional<Admin> findByAdminLoginID(Login login);
	//Login findByUsernameAndPassword(String username, String password);

}
