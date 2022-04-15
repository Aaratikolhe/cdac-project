package com.rentit.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rentit.entity.Category;
import com.rentit.entity.Login;

@Repository
public interface ProductCategoryRepository extends JpaRepository<Category, Integer>{
	Category findByCategoryId(int categoryId);
}