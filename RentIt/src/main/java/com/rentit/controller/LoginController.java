package com.rentit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import javax.mail.*;
import javax.mail.internet.*;
import javax.mail.Session;
import javax.mail.Transport;

import com.rentit.Dao.AdminRegisterRequestDao;
import com.rentit.Dao.CustomerRegisterRequestDao;
import com.rentit.Dao.LoginRequestDao;
import com.rentit.entity.Admin;
import com.rentit.entity.Customer;
import com.rentit.service.UserService;

@RestController
public class LoginController {
	
	@Autowired
	UserService userService;

	@PostMapping("/authenticate")
	@CrossOrigin(origins = "http://localhost:3000")
	public Object authenticate(@RequestBody LoginRequestDao loginRequestDao)
	{
		System.out.println(loginRequestDao.getUsername()+loginRequestDao.getPassword());
		return userService.authenticate(loginRequestDao.getUsername(), loginRequestDao.getPassword());	
	}
	
	@PostMapping("/register")
	@CrossOrigin(origins = "http://localhost:3000")
	public Customer register(@RequestBody CustomerRegisterRequestDao customerRegisterRequestDao)
	{
		return userService.registerCustomer(customerRegisterRequestDao);	
	}
	
	@PostMapping("/registeradmin")
	@CrossOrigin(origins = "http://localhost:3000")
	public Admin register(@RequestBody AdminRegisterRequestDao adminRegisterRequestDao)
	{
		return userService.registerAdmin(adminRegisterRequestDao);	
	}
	

	@GetMapping("/forgotpassword-step1")
	@CrossOrigin(origins = "http://localhost:3000")
	public String forgotPasswordSendOtp(@RequestParam String username)
	{
		return userService.sendOtpEmail(username);
	}

	@PostMapping("/forgotpassword-step2")
	@CrossOrigin(origins = "http://localhost:3000")
	public String forgotPasswordVerifyOtp(@RequestParam String username, @RequestParam String otp)
	{
		return userService.verifyOtp(username, otp);
	}
}
