package com.rentit.entity;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name="admin")
public class Admin {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="a_id")
	private int adminId;
	
	@Column(name="fname")
	private String adminFirstName;
	
	@Column(name="lname")
	private String adminLastName;
	
	@Column(name="email")
	private String adminEmail;
	
	@Column(name="contact")
	private String adminContact;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "login_id")
	private Login adminLoginID;

	public int getAdminId() {
		return adminId;
	}

	public void setAdminId(int adminId) {
		this.adminId = adminId;
	}

	public String getAdminFirstName() {
		return adminFirstName;
	}

	public void setAdminFirstName(String adminFirstName) {
		this.adminFirstName = adminFirstName;
	}

	public String getAdminLastName() {
		return adminLastName;
	}

	public void setAdminLastName(String adminLastName) {
		this.adminLastName = adminLastName;
	}

	public String getAdminEmail() {
		return adminEmail;
	}

	public void setAdminEmail(String adminEmail) {
		this.adminEmail = adminEmail;
	}

	public String getAdminContact() {
		return adminContact;
	}

	public void setAdminContact(String adminContact) {
		this.adminContact = adminContact;
	}

	public Login getAdminLoginID() {
		return adminLoginID;
	}

	public void setAdminLoginID(Login adminLoginID) {
		this.adminLoginID = adminLoginID;
	}
	
}
