package com.rentit.entity;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name="customer")
public class Customer {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="c_id")
	int customerId;
	
	@Column(name="c_fname")
	String customerFirstName;
	
	@Column(name="c_lname")
	String customerLastName;
	
	@Column(name="aadhar_no")
	String aadharNo;
	
	@Column(name="c_email")
	String customerEmail;
	
	@Column(name="c_contact")
	String customerContact;
	
	@Column(name="c_area")
	String customerArea;
	
	@Column(name="c_pincode")
	int customerPincode;
	
	@Column(name="c_city")
	String customerCity;
	
	@OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "login_id")
	Login loginId;

	public int getCustomerId() {
		return customerId;
	}

	public void setCustomerId(int customerId) {
		this.customerId = customerId;
	}

	public String getCustomerFirstName() {
		return customerFirstName;
	}

	public void setCustomerFirstName(String customerFirstName) {
		this.customerFirstName = customerFirstName;
	}

	public String getCustomerLastName() {
		return customerLastName;
	}

	public void setCustomerLastName(String customerLastName) {
		this.customerLastName = customerLastName;
	}

	public String getAadharNo() {
		return aadharNo;
	}

	public void setAadharNo(String aadharNo) {
		this.aadharNo = aadharNo;
	}

	public String getCustomerEmail() {
		return customerEmail;
	}

	public void setCustomerEmail(String customerEmail) {
		this.customerEmail = customerEmail;
	}

	public String getCustomerContact() {
		return customerContact;
	}

	public void setCustomerContact(String customerContact) {
		this.customerContact = customerContact;
	}

	public String getCustomerArea() {
		return customerArea;
	}

	public void setCustomerArea(String customerArea) {
		this.customerArea = customerArea;
	}

	public int getCustomerPincode() {
		return customerPincode;
	}

	public void setCustomerPincode(int customerPincode) {
		this.customerPincode = customerPincode;
	}

	public String getCustomerCity() {
		return customerCity;
	}

	public void setCustomerCity(String customerCity) {
		this.customerCity = customerCity;
	}

	public Login getLoginId() {
		return loginId;
	}

	public void setLoginId(Login loginId) {
		this.loginId = loginId;
	}

}