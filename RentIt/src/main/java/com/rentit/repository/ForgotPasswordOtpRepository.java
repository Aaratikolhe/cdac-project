package com.rentit.repository;

import com.rentit.entity.ForgotPasswordOtp;
import com.rentit.entity.Login;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ForgotPasswordOtpRepository extends JpaRepository<ForgotPasswordOtp, Integer> {
    Optional<ForgotPasswordOtp> findByLoginId(Login loginId);
}
