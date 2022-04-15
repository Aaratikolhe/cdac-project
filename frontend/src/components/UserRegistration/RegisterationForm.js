//import React from 'react';
import React, {useState} from 'react';
import axios from 'axios';
import './RegistrationForm.css';
import {API_BASE_URL, ACCESS_TOKEN_NAME} from '../../constants/apiConstants';
//import { withRouter } from "react-router-dom";
//import { useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function RegistrationForm(props) {
    const navigate=useNavigate();
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
        //props.updateTitle('Home')
        //history.push('/home');
        navigate('/home');
    }
    const redirectToLogin = () => {
       // props.updateTitle('Login')
        props.navigate('/home')
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
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
            <form>
                <div className="form-group text-left">
                <label htmlFor="fname">First Name</label>
                <input type="text"
                       className="form-control" 
                       id="fname"
                       placeholder="First Name" 
                       value={state.fname}
                       onChange={handleChange}
                />
                </div>
                <div className="form-group text-left">
                <label htmlFor="lName">Last Name</label>
                <input type="text"
                       className="form-control" 
                       id="lname"  
                       placeholder="Last Name" 
                       value={state.lname}
                       onChange={handleChange}
                />
                </div>
                <div className="form-group text-left">
                <label htmlFor="aadharno">Aadhar No.</label>
                <input type="text"
                       className="form-control" 
                       id="aadharno" 
                       placeholder="12 Digit Aadhar no." 
                       value={state.aadharno}
                       onChange={handleChange}
                />
                </div>
                <div className="form-group text-left">
                <label htmlFor="mobile">Mobile</label>
                <input type="text"
                       className="form-control" 
                       id="contact" 
                       placeholder="Mobile no." 
                       value={state.contact}
                       onChange={handleChange}
                />
                </div>
                <div className="form-group text-left">
                <label htmlFor="area">Area</label>
                <input type="text"
                       className="form-control" 
                       id="area" 
                       placeholder="Area" 
                       value={state.area}
                       onChange={handleChange}
                />
                </div>
                <div className="form-group text-left">
                <label htmlFor="city">City</label>
                <input type="text"
                       className="form-control" 
                       id="city" 
                       placeholder="City" 
                       value={state.city}
                       onChange={handleChange}
                />
                </div>
                <div className="form-group text-left">
                <label htmlFor="pincode">Pincode</label>
                <input type="text"
                       className="form-control" 
                       id="pincode" 
                       placeholder="Area Pincode" 
                       value={state.pincode}
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
                       value={state.email}
                       onChange={handleChange}
                />
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group text-left">
                    <label htmlFor="username">Username</label>
                    <input type="text" 
                        className="form-control" 
                        id="username" 
                        placeholder="Username"
                        value={state.username}
                        onChange={handleChange} 
                    />
                </div>
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
                    Register
                </button>
            </form>
            <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
                {state.successMessage}
            </div>
            <div className="mt-2">
                <span>Already have an account? </span>

                <span className="loginText" onClick={() => redirectToLogin()}>Login here</span> 
            </div>
            
        </div>
    )
}

export default RegistrationForm;