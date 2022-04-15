package com.rentit.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rentit.entity.Customer;
import com.rentit.entity.Login;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer>{

	Optional<Customer> findByLoginId(Login loginId);

}
