package com.rentit.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.rentit.Dao.CategoryRegisterDao;
import com.rentit.entity.Category;
import com.rentit.service.ProductCategoryService;

@RestController
public class ProductCategoryController {

	@Autowired
	ProductCategoryService productCategoryService;
	
	@PostMapping("/addproductcategory")
	@CrossOrigin(origins = "http://localhost:3000")
	public Category addProductCategory(@RequestBody CategoryRegisterDao categoryRegisterDao)
	{
		return productCategoryService.saveCategory(categoryRegisterDao);
	}
	
	@GetMapping("/allcategories")
	@CrossOrigin(origins = "http://localhost:3000")
	public List<Category> fetchAllCategories()
	{
		return productCategoryService.getAllCategory();
	}
	
}



