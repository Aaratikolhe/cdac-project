package com.rentit.controller;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

import org.apache.tomcat.jni.File;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.rentit.Dao.ProductRegisterDao;
import com.rentit.entity.Product;
import com.rentit.service.ProductService;

@RestController
public class ProductController {
	
	@Autowired
	ProductService productService;
	
	@GetMapping("/allproducts")
	@CrossOrigin(origins = "http://localhost:3000")
	public List<Product> fetchAllProducts()
	{
		return productService.getAll();
	}

	@GetMapping("/allproducts/available")
	@CrossOrigin(origins = "http://localhost:3000")
	public List<Product> fetchAllAvailableProducts()
	{
		return productService.getAvailableProducts();
	}


	@RequestMapping(value = "/getProductById/{productId}", method = RequestMethod.GET)
	@CrossOrigin(origins = "http://localhost:3000")
	public Optional<Product> getById(@PathVariable("productId") int productId)
	{
		System.out.println(productId);
		return productService.getProductById(productId);
	}

	@PostMapping("/saveproduct")
	@CrossOrigin(origins = "http://localhost:3000")
	public Product saveUpload(@RequestPart("data") ProductRegisterDao productRegisterDao, @RequestPart("img") MultipartFile img)
	{
		//insert json data
		System.out.println(productRegisterDao.getCategory());
		Product product=productService.saveProduct(productRegisterDao); 
		System.out.println(product.getCategoryId());
		try
		{
			System.out.println("in try block");
			byte[] imgData=img.getBytes();
						
			Path path=Paths.get("E:/cdac data/Project_rent_it/rent_it-1/images/"+ product.getProductId() + ".jpg");
			System.out.println(path);
						
			Files.write(path, imgData);
			System.out.println("file uploaded");
		}
		catch(Exception e)
		{
			return null;
		}
		return product;	
	}

	@PostMapping("/updateproduct")
	@CrossOrigin(origins = "http://localhost:3000")
	public Product updateProduct(@ModelAttribute ProductRegisterDao productRegisterDao, @RequestPart(value = "img", required = false) MultipartFile img)
	{
		System.out.println(productRegisterDao.getCategory());
		Product product=productService.updateProduct(productRegisterDao);
		System.out.println(product.getCategoryId());
		try
		{
			if (img != null) {
				System.out.println("in try block");
				byte[] data=img.getBytes();

				Path path=Paths.get("E:/cdac data/Project_rent_it/rent_it-1/images/"+ product.getProductId() + ".jpg");
				System.out.println(path);

				Files.delete(path);
				Files.write(path, data);
				System.out.println("file uploaded");
			}
		}
		catch(Exception e)
		{
			return null;
		}
		return product;
	}

	@DeleteMapping("/deleteProduct")
	public HttpStatus deleteProduct (@RequestParam int productId)
	{
		try
		{
				Path path=Paths.get("E:/cdac data/Project_rent_it/rent_it-1/images/"+ productId + ".jpg");
				Files.delete(path);
		}
		catch(Exception e)
		{
			return null;
		}
		return productService.deleteProduct(productId);
	}

	@GetMapping("/product/category")
	@CrossOrigin(origins = "http://localhost:3000")
	public List<Product> fetchProducts(@RequestParam int id)
	{
		return productService.getProductListByCategory(id);
	}
}





