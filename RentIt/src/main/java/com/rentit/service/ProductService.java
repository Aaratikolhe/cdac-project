package com.rentit.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.rentit.Dao.ProductRegisterDao;
import com.rentit.entity.Category;
import com.rentit.entity.Product;
import com.rentit.repository.ProductCategoryRepository;
import com.rentit.repository.ProductRepository;

@Service
public class ProductService {
	@Autowired
	ProductRepository productRepository;
	
	@Autowired
	ProductCategoryRepository productCategoryRepository;
	
	public Product saveProduct(ProductRegisterDao productRegisterDao)
	{
		Product productData=productRegisterDao.getProduct();
		Category category = productCategoryRepository.findByCategoryId(productRegisterDao.getCategory().getCategoryId());
		productData.setCategoryId(category);
		productData = productRepository.save(productData);
		String imgpath = productData.getProductId() + ".jpg";
		productData.setImage(imgpath);
		productData.setAvailable("Y");
		return productRepository.save(productData);
	}
	
	public List<Product> getAll()
	{
		return productRepository.findAll();
	}

	public List<Product> getAvailableProducts() {
		return productRepository.findByAvailable("Y");
	}

	public Optional<Product> getProductById(int productId)
	{
		return productRepository.findById(productId);
	}

	public Product updateProduct(ProductRegisterDao productRegisterDao)
	{
		Product productData=productRegisterDao.getProduct();
		Product product = productRepository.findByProductId(productData.getProductId());
		if (productData.getProductName() != null) {
			product.setProductName(productData.getProductName());
		} if (productData.getProductDescription() != null) {
			product.setProductDescription(productData.getProductDescription());
		} if (productData.getDeposit() != 0.0) {
			product.setDeposit(productData.getDeposit());
		} if (productData.getRentPrice() != 0.0) {
			product.setRentPrice(productData.getRentPrice());
		}

		return productRepository.save(product);
	}

	public HttpStatus deleteProduct(int productId)
	{
		Product product = productRepository.findByProductId(productId);
		productRepository.delete(product);
		return HttpStatus.OK;
	}

	public List<Product> getProductListByCategory(int id) {
		Category category = productCategoryRepository.findByCategoryId(id);
		Optional<List<Product>> productList = productRepository.findByCategoryIdAndAvailable(category, "Y");
		return productList.get();
	}
}

