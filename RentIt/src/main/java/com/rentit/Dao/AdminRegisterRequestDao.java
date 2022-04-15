package com.rentit.Dao;

import com.rentit.entity.Admin;
import com.rentit.entity.Login;

public class AdminRegisterRequestDao {
	private Admin admin;
	private Login login;
	
	public Admin getAdmin() {
		return admin;
	}
	public void setAdmin(Admin admin) {
		this.admin = admin;
	}
	public Login getLogin() {
		return login;
	}
	public void setLogin(Login login) {
		this.login = login;
	}
	
}
