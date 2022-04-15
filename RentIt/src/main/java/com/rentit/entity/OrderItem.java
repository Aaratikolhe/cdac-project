package com.rentit.entity;

import javax.persistence.*;

import java.util.Date;

@Entity
@Table(name="order_item")
public class OrderItem {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="item_id")
	private int itemId;
	
	@Column(name="item_cost")
	private float itemCost;
	
	@Column(name="rent_date")
	private Date itemRentDate;
	
	@Column(name="return_date")
	private Date itemReturnDate;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="p_id")
	private Product product;

	public int getItemId() {
		return itemId;
	}

	public void setItemId(int itemId) {
		this.itemId = itemId;
	}

	public float getItemCost() {
		return itemCost;
	}

	public void setItemCost(float itemCost) {
		this.itemCost = itemCost;
	}

	public Date getItemRentDate() {
		return itemRentDate;
	}

	public void setItemRentDate(Date itemRentDate) {
		this.itemRentDate = itemRentDate;
	}

	public Date getItemReturnDate() {
		return itemReturnDate;
	}

	public void setItemReturnDate(Date itemReturnDate) {
		this.itemReturnDate = itemReturnDate;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

}
