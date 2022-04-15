package com.rentit.entity;

import javax.persistence.*;

import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;
import java.util.List;

@Entity
@Table(name="order_details")
public class OrderDetails {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "order_id")
	private int orderId;
	
	@Column(name = "order_price")
	private float orderPrice;

	@Column(name = "order_date", nullable = true, updatable = false, columnDefinition="TIMESTAMP default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP")
	@CreationTimestamp
	private Date orderDate = new Date();

	@OneToMany(cascade = CascadeType.ALL,
	        orphanRemoval = true, fetch = FetchType.LAZY)
	private List<OrderItem> orderItemList;
	
	@Column(name = "status")
	private String Orderstatus;

	@ManyToOne
	@JoinColumn(name="c_id")
	private Customer customer;

	public int getOrderId() {
		return orderId;
	}

	public void setOrderId(int orderId) {
		this.orderId = orderId;
	}

	public float getOrderPrice() {
		return orderPrice;
	}

	public void setOrderPrice(float orderPrice) {
		this.orderPrice = orderPrice;
	}

	public Date getOrderDate() {
		return orderDate;
	}

	public void setOrderDate(Date orderDate) {
		this.orderDate = orderDate;
	}

	public String getOrderstatus() {
		return Orderstatus;
	}

	public void setOrderstatus(String orderstatus) {
		Orderstatus = orderstatus;
	}

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

	public List<OrderItem> getOrderItemList() {
		return orderItemList;
	}

	public void setOrderItemList(List<OrderItem> orderItemList) {
		this.orderItemList = orderItemList;
	}
}
