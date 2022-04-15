package com.rentit.service;

import java.util.Base64;
import java.util.Optional;
import java.util.Properties;
import java.util.Random;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import com.rentit.entity.ForgotPasswordOtp;
import com.rentit.repository.ForgotPasswordOtpRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rentit.Dao.AdminRegisterRequestDao;
import com.rentit.Dao.CustomerRegisterRequestDao;
import com.rentit.entity.Admin;
import com.rentit.entity.Customer;
import com.rentit.entity.Login;
import com.rentit.repository.AdminRepository;
import com.rentit.repository.CustomerRepository;
import com.rentit.repository.LoginRepository;

@Service
@Transactional(rollbackFor = Exception.class)
public class UserService {

	@Autowired
	LoginRepository loginRepository;

	@Autowired
	CustomerRepository customerRepository;

	@Autowired
	AdminRepository adminRepository;

	@Autowired
	ForgotPasswordOtpRepository forgotPasswordOtpRepository;

	Base64.Encoder encoder = Base64.getEncoder();

	// @Transactional
	public Customer registerCustomer(CustomerRegisterRequestDao customerRegisterRequestDao) {
		Login loginData = customerRegisterRequestDao.getLogin();
		loginData.setPassword(encoder.encodeToString(loginData.getPassword().getBytes()));
		loginData.setRole("customer");
		try {
			loginData = loginRepository.save(loginData);
			Customer customerData = customerRegisterRequestDao.getCustomer();
			if (loginData != null) {
				customerData.setLoginId(loginData);
				customerData = customerRepository.save(customerData);
			}
			if (customerData == null) {
				throw new Exception();
			}
			return customerData;
		} catch (Exception e) {
			loginRepository.delete(loginData);
			System.out.println("Registration failed");
			return null;
		}

	}

	public Object authenticate(String username, String password) {
		Login login = loginRepository.findByUsernameAndPassword(username,  encoder.encodeToString(password.getBytes()));
		if(login!=null)
		{
			Optional<Customer> customer=null; 
			System.out.println(login.getRole());
			if(login.getRole().equals("customer"))
				{
					customer=customerRepository.findByLoginId(login);
					System.out.println("this"+customer.toString());
					try
					{
						customer.get();
					}
					catch(Exception e)
					{
						e.printStackTrace();
					}
					return customer;
				}
			Optional<Admin> admin=null; 
			System.out.println(login.getRole());
			if(login.getRole().equals("admin"))
			{
				admin=adminRepository.findByAdminLoginID(login);
				System.out.println("this"+admin.toString());
				try
				{
					admin.get();
					System.out.println(admin);
				}
				catch(Exception e)
				{
					e.printStackTrace();
				}
				return admin;
			}	
			
		}
		
	
	return"Authentication Unsuccessful!!!";

	}

	public Admin registerAdmin(AdminRegisterRequestDao adminRegisterRequestDao) {
		Login loginData = adminRegisterRequestDao.getLogin();
		loginData.setPassword(encoder.encodeToString(loginData.getPassword().getBytes()));
		loginData.setRole("admin");
		loginData = loginRepository.save(loginData);
		Admin adminData = adminRegisterRequestDao.getAdmin();
		if (loginData !=  null) {
			adminData.setAdminLoginID(loginData);
			adminData = adminRepository.save(adminData);
		}
		return adminData;
		
	}
	
	public String forgotPassword(String username) {
		return "";
	}

	public String sendOtpEmail(String username) {

		Login login = loginRepository.findByUsername(username);
		Optional<Customer> customer = customerRepository.findByLoginId(login);

		String recipient = customer.get().getCustomerEmail();
		String sender = "kolhe.aarati@gmail.com";

		final String emailUsername = "kolhe.aarati@gmail.com";//change accordingly
		final String password = "Aarati@1234";//change accordingly

		// Assuming you are sending email through relay.jangosmtp.net
		String host = "express-relay.jangosmtp.net";

		Properties props = System.getProperties();
		props.put("mail.smtp.auth", "true");
		props.put("mail.smtp.starttls.enable", "true");
		props.put("mail.smtp.host", host);
		props.put("mail.smtp.port", "25");

		// Get the Session object.
		Session session = Session.getInstance(props,
				new javax.mail.Authenticator() {
					protected PasswordAuthentication getPasswordAuthentication() {
						return new PasswordAuthentication(username, password);
					}
				});
		
		Random rnd = new Random();
		int number = rnd.nextInt(999999);
		String otp = String.format("%06d", number);

		try
		{
			MimeMessage message = new MimeMessage(session);
			message.setFrom(new InternetAddress(sender));
			message.addRecipient(Message.RecipientType.TO, new InternetAddress(recipient));
			message.setSubject("Password Reset OTP for RentIt!!");
			message.setText("This is your OTP for reseting password : " + otp + ". This OTP will be valid for 10 mins.");

			Transport.send(message);
			System.out.println("Mail successfully sent");

			ForgotPasswordOtp forgotPasswordOtp = new ForgotPasswordOtp();
			forgotPasswordOtp.setLoginId(login);
			forgotPasswordOtp.setOtp(otp);
			forgotPasswordOtpRepository.save(forgotPasswordOtp);
		}
		catch (MessagingException mex)
		{
			mex.printStackTrace();
			return "Error Occurred !!";
		}
		return "Otp Sent !!";
	}

	public String verifyOtp(String username, String otp) {
		return "";
	}
}
