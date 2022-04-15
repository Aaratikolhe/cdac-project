package com.rentit.entity;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="forgotpasswordotp")
public class ForgotPasswordOtp {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="frgt_pwd_id")
    private int forgotPasswordId;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "login_id")
    private Login loginId;

    @Column(name = "otp")
    private String otp;


    @Basic(optional = false)
    @Column(name = "otp_time", insertable = false, updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date otpDate;

    public int getForgotPasswordId() {
        return forgotPasswordId;
    }

    public void setForgotPasswordId(int forgotPasswordId) {
        this.forgotPasswordId = forgotPasswordId;
    }

    public Login getLoginId() {
        return loginId;
    }

    public void setLoginId(Login loginId) {
        this.loginId = loginId;
    }

    public String getOtp() {
        return otp;
    }

    public void setOtp(String otp) {
        this.otp = otp;
    }

    public Date getOtpDate() {
        return otpDate;
    }

    public void setOtpDate(Date otpDate) {
        this.otpDate = otpDate;
    }
}
