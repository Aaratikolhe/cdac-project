import React from 'react';
import {useState} from 'react';
import axios from 'axios';
import './LoginForm.css';
import {API_BASE_URL, ADMIN,USER} from '../../constants/apiConstants';
//import { withRouter}from "react-router-dom";
import { useNavigate}from "react-router-dom";
//import { useHistory } from "react-router-dom";
import MaleAvatar from "../images/img_avatar_male.png"
import FemaleAvatar from "../images/img_avatar_female.png"

function LoginForm(props) {
   let navigate=useNavigate();
   //const history = useHistory();
    
    const [state , setState] = useState({
        username : "",
        password : "",
        successMessage: null
    })
    const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    const handleSubmitClick = (e) => {
        e.preventDefault();
        const payload={
            "username":state.username,
            "password":state.password
        }
        axios.post(API_BASE_URL+'/authenticate',payload)
            .then(function (response) {
                if(response.status === 200){
                    setState(prevState => ({
                        ...prevState,
                        'successMessage' : 'Login successful. Redirecting to home page..'
                    }))
                    //localStorage.setItem(ACCESS_TOKEN_NAME,response.data.token);
                    if(response.data.hasOwnProperty("adminLoginID")){
                        localStorage.setItem("ADMIN",JSON.stringify(response.data));    
                    } else{
                        localStorage.setItem("USER",JSON.stringify(response.data));
                    }
                    console.log(localStorage.getItem(USER));
                    window.sessionStorage.setItem(USER,response.data);
                    redirectToHome();
                    window.location.reload() 
                    props.showError(null)
                }
                else if(response.code === 204){
                    props.showError("Username and password do not match");
                }
                else{
                    props.showError("Username does not exists");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const redirectToHome = () => {
        // props.updateTitle('Home')
        //history.push('/home');
       navigate('/home');
    }
    const redirectToRegister = () => {
        //props.history.push('/register'); 
        props.navigate('/register');
        props.updateTitle('Register');
    }
    return(
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
             <span>
               <img src={MaleAvatar} alt="Avatar" class="login-avatar"/>
             </span>
            <div className= "container">
            <form>
                <div className="form-group text-left">
                <label htmlFor="exampleInputEmail1">User Name </label>
                <input type="text" 
                       className="form-control" 
                       id="username" 
                       aria-describedby="usernameHelp" 
                       placeholder="Enter UserName" 
                       value={state.username}
                       onChange={handleChange}
                />

                </div>
                <div className="form-group text-left">
                <label htmlFor="exampleInputPassword1">Password </label>
                <input type="password" 
                       className="form-control" 
                       id="password" 
                       placeholder="Password"
                       value={state.password}
                       onChange={handleChange} 
                />
                </div>
                <div className=" form-check">
                </div>
                <button 
                    type="submit" 
                    className="login-btn btn btn-primary"
                    onClick={handleSubmitClick}
                >Submit</button>
            </form>
            </div>
            <div class="card-footer">
            <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
                {state.successMessage}
            </div>
            <div className="registerMessage">
                <span>Dont have an account? </span>
                {/* <span className="loginText">Register</span>  */}
                <span className="loginText" onClick={() => redirectToRegister()}>Register</span> 
            </div>
            </div>
        </div>
    )
}

export default LoginForm;