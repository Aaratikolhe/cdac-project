package com.rentit.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rentit.Dao.CategoryRegisterDao;
import com.rentit.Dao.ProductRegisterDao;
import com.rentit.entity.Category;
import com.rentit.entity.Product;
import com.rentit.repository.ProductCategoryRepository;

@Service
public class ProductCategoryService {
	@Autowired
	ProductCategoryRepository productCategoryRepository;
	
	public Category saveCategory(CategoryRegisterDao categoryRegisterDao)
	{
		Category categoryData=categoryRegisterDao.getCategory();
		return productCategoryRepository.save(categoryData);
	}
	
	public List<Category> getAllCategory()
	{
		return productCategoryRepository.findAll();
	}
	
}
