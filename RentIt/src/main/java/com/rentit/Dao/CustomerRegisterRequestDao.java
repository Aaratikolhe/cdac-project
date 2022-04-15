package com.rentit.Dao;

import com.rentit.entity.Customer;
import com.rentit.entity.Login;

public class CustomerRegisterRequestDao {
	private Customer customer;
	private Login login;
	
	public Customer getCustomer() {
		return customer;
	}
	public void setCustomer(Customer customer) {
		this.customer = customer;
	}
	public Login getLogin() {
		return login;
	}
	public void setLogin(Login login) {
		this.login = login;
	}
	
}
