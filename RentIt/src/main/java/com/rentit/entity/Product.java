package com.rentit.entity;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name="product")
public class Product {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="p_id")
	private int productId;
	
	@Column(name="p_name")
	private String productName;
	
	@Column(name="p_description")
	private String productDescription;
	
	@Column(name="p_rentprice")
	private float rentPrice;
	
	@Column(name="p_deposit")
	private float deposit;
	
	@Column(name="image")
	private String image;

	@Column(name = "available")
	private String available;
	
	
	@ManyToOne(fetch=FetchType.LAZY)
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) 
	@JoinColumn(name = "cat_id")
	private Category categoryId;

	public int getProductId() {
		return productId;
	}
	
	public Product() {
		super();
		// TODO Auto-generated constructor stub
	}
	
//	public Product(int productId, String productName, String productDescription, float rentPrice, float deposit,
//			String image, Category categoryId) {
//		super();
//		this.productId = productId;
//		this.productName = productName;
//		this.productDescription = productDescription;
//		this.rentPrice = rentPrice;
//		this.deposit = deposit;
//		this.image = image;
//		this.categoryId = categoryId;
//	}

	public void setProductId(int productId) {
		this.productId = productId;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public String getProductDescription() {
		return productDescription;
	}

	public void setProductDescription(String productDescription) {
		this.productDescription = productDescription;
	}

	public float getRentPrice() {
		return rentPrice;
	}

	public void setRentPrice(float rentPrice) {
		this.rentPrice = rentPrice;
	}

	public float getDeposit() {
		return deposit;
	}

	public void setDeposit(float deposit) {
		this.deposit = deposit;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public Category getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(Category categoryId) {
		this.categoryId = categoryId;
	}

	public String getAvailable() {
		return available;
	}

	public void setAvailable(String available) {
		this.available = available;
	}
}
