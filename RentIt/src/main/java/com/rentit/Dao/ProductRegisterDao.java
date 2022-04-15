package com.rentit.Dao;


import com.rentit.entity.Category;
import com.rentit.entity.Product;

public class ProductRegisterDao {
	private Product product;
	private Category category;
	public Product getProduct() {
		return product;
	}
	public void setProduct(Product product) {
		this.product = product;
	}
	public Category getCategory() {
		return category;
	}
	public void setCategory(Category category) {
		this.category = category;
	}
	
}
