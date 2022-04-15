//import React from 'react';
import React, {useState} from 'react';
import axios from 'axios';
import Popup from "./Popup";
import './UserProfile.css';
import {API_BASE_URL, ACCESS_TOKEN_NAME,USER} from '../../constants/apiConstants';
import { withRouter } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function UserProfile(props) {

    const user = JSON.parse(localStorage.getItem("USER"));
    const admin = JSON.parse(localStorage.getItem("ADMIN"));
    const profile = user != null ? user : admin != null ? admin: null;
    console.log(JSON.parse(JSON.stringify(localStorage.getItem("USER"))));
    const navigate=useNavigate();
    const [isOpen, setIsOpen] = useState(false);
 
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }
    //const history = useHistory();
    const [state , setState] = useState({
        fname : "",
        lname : "",
        aadharno : "",
        contact : "",
        area : "",
        city : "",
        pincode:"",
        email : "",
        password : "",
        confirmPassword: "",
        successMessage: null
    })
    const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }
    const sendDetailsToServer = () => {
        if(state.email.length && state.password.length) {
           // props.showError(null);
            
            const payload={
                "customer":{
                    "customerFirstName" : state.fname,
                    "customerLastName" : state.lname,
                    "aadharNo" : state.aadharno,
                    "customerEmail":state.email,
                    "customerContact" :state.contact,
                    "customerArea" : state.area,
                    "customerPincode" :state.pincode,
                    "customerCity":state.city,
                },
                "login":{
                    "username":state.username,
                    "password":state.password,
                }
                
            }
        
            axios.post(API_BASE_URL+'/register', payload)
                .then(function (response) {
                    if(response.status === 200){
                        setState(prevState => ({
                            ...prevState,
                            'successMessage' : 'Registration successful. Redirecting to home page..'
                        }))
                        localStorage.setItem(ACCESS_TOKEN_NAME,response.data.token);
                        redirectToHome();
                       // props.showError(null)
                    } else{
                        props.showError("Some error ocurred");
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });    
        } else {
           // props.showError('Please enter valid username and password')    
        }
        
    }
    const redirectToHome = () => {
        props.updateTitle('Home')
        //history.push('/home');
        navigate('/home');
    }
    const redirectToLogin = () => {
        props.updateTitle('Login')
        navigate('/home')
        //props.history.push('/login'); 
    }
    const handleSubmitClick = (e) => {
        e.preventDefault();
        if(state.password === state.confirmPassword) {
            sendDetailsToServer()    
        } else {
            props.showError('Passwords do not match');
        }
    }
    return(
        <div className="profile-card col-12 col-lg-4 login-card mt-2 hv-center">
            <form>
                <div className="form-group text-left">
                <label htmlFor="fname">First Name</label>
                <input type="text"
                       className="form-control" 
                       id="fname"
                       placeholder="First Name" 
                       value={profile.hasOwnProperty("adminLoginID")? profile.adminFirstName: profile.customerFirstName}
                       onChange={handleChange}
                />
                </div>
                <div className="form-group text-left">
                <label htmlFor="lName">Last Name</label>
                <input type="text"
                       className="form-control" 
                       id="lname"  
                       placeholder="Last Name" 
                       value={profile.hasOwnProperty("adminLoginID")? profile.adminLastName:profile.customerLastName}
                       onChange={handleChange}
                />
                </div>
                <div className="form-group text-left">
                <label htmlFor="aadharno">Aadhar No.</label>
                <input type="text"
                       className="form-control" 
                       id="aadharno" 
                       placeholder="12 Digit Aadhar no." 
                       value={profile.hasOwnProperty("adminLoginID")? "":profile.aadharNo}
                       onChange={handleChange}
                />
                </div>
                <div className="form-group text-left">
                <label htmlFor="mobile">Mobile</label>
                <input type="text"
                       className="form-control" 
                       id="contact" 
                       placeholder="Mobile no." 
                       value={profile.hasOwnProperty("adminLoginID")? profile.adminContact:profile.customerContact}
                       onChange={handleChange}
                />
                </div>
                <div className="form-group text-left">
                <label htmlFor="area">Area</label>
                <input type="text"
                       className="form-control" 
                       id="area" 
                       placeholder="Area" 
                       value={profile.hasOwnProperty("adminLoginID")? "":profile.customerArea}
                       onChange={handleChange}
                />
                </div>
                <div className="form-group text-left">
                <label htmlFor="city">City</label>
                <input type="text"
                       className="form-control" 
                       id="city" 
                       placeholder="City" 
                       value={profile.hasOwnProperty("adminLoginID")? "":profile.customerCity}
                       onChange={handleChange}
                />
                </div>
                <div className="form-group text-left">
                <label htmlFor="pincode">Pincode</label>
                <input type="text"
                       className="form-control" 
                       id="pincode" 
                       placeholder="Area Pincode" 
                       value={profile.hasOwnProperty("adminLoginID")? "":profile.customerPincode}
                       onChange={handleChange}
                />
                </div>
                
                <div className="form-group text-left">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" 
                       className="form-control" 
                       id="email" 
                       aria-describedby="emailHelp" 
                       placeholder="Enter email" 
                       value={profile.hasOwnProperty("adminLoginID")? profile.adminEmail:profile.customerEmail}
                       onChange={handleChange}
                />
                </div>
                <div className="form-group text-left">
                    <label htmlFor="username">Username</label>
                    <input type="text" 
                        className="form-control" 
                        id="username" 
                        placeholder="Username"
                        value={profile.hasOwnProperty("adminLoginID")? profile.adminLoginID.username:profile.loginId.username}
                        onChange={handleChange} 
                    />
                </div>
                <div>
    <input
      type="button"
      value="Reset Password"
      className='btn-primary'
      onClick={togglePopup}
    />
    
    {isOpen && <Popup
      content={<>
        <form>
        <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password"
                        className="form-control" 
                        id="password" 
                        placeholder="Password"
                        value={state.password}
                        onChange={handleChange} 
                    />
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Confirm Password</label>
                    <input type="password" 
                        className="form-control" 
                        id="confirmPassword" 
                        placeholder="Confirm Password"
                        value={state.confirmPassword}
                        onChange={handleChange} 
                    />
                </div>
                <button 
                    type="submit" 
                    className="btn btn-primary"
                    onClick={handleSubmitClick}
                >
                    Confirm
                </button>    
        </form>
        {/* <button>Test button</button> */}
      </>}
      handleClose={togglePopup}
    />}
  </div>
            {/* <button 
                    type="submit" 
                    className="btn btn-primary"
                    onClick={handleSubmitClick}
                >
                    Change Password
                </button> */}
            </form>            
        </div>
    )
}

export default UserProfile;