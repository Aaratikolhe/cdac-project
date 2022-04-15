package com.rentit.repository;

import com.rentit.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.rentit.entity.Product;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer>{
	@Transactional
	@Modifying
	@Query("update Product p set p.image=:imgpath where p.productId=:productId")
	void saveImage(String imgpath,int productId);
	
	Product findByProductId(int productId);

	Optional<List<Product>> findByCategoryIdAndAvailable(Category category, String available);

	List<Product> findByAvailable(String available);
}
