//import React from 'react';
import React, {useState} from 'react';
import axios from 'axios';
import './PublishProduct.css';
import {API_BASE_URL, ACCESS_TOKEN_NAME} from '../../constants/apiConstants';
import { withRouter } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function PublishProduct(props) {
    const navigate=useNavigate();
    //const history = useHistory();
    const [state , setState] = useState({
        productName : "",
        productDescription : "",
        rentPrice : "",
        deposit : "",
        image : "",
        categoryId : "",
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
        if(state.productName && state.rentPrice && state.deposit && state.categoryId) {
           // props.showError(null);
            
            const payload={
                "product":{
                    "productName" : state.productName,
                    "productDescription" : state.productDescription,
                    "rentPrice" : state.rentPrice,
                    "deposit":state.deposit,
                    
                    // "categoryId":state.categoryId
                }
                ,
                "categroy":{
                    "categoryId":state.categoryId 
                }                  
                
            }
        
            var FormData = require('form-data');
            
            var data = new FormData();
            data.append("data", payload);
            data.append("img", '/C:/Users/kolhe/Desktop/dinining table.jpg');
            axios.post(API_BASE_URL+'/saveproduct', payload)
                .then(function (response) {
                    if(response.status === 200){
                        setState(prevState => ({
                            ...prevState,
                            'successMessage' : 'Product published.'
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
        //props.updateTitle('Login')
        //navigate('/home')
        //props.history.push('/login'); 
    }
    const handleSubmitClick = (e) => {
        e.preventDefault();
        if(state.productName !='') {
            sendDetailsToServer()    
        } else {
            props.showError('Please fill in necessary details.');
        }
    }
    return(
        <div className="publish-card col-12 col-lg-4 publish-card mt-2 hv-center">
            <form>
                <div className="form-group text-left">
                <label htmlFor="pname">Product Name</label>
                <input type="text"
                       className="form-control" 
                       id="productName"
                       placeholder="Prodcut Name" 
                       value={state.productName}
                       onChange={handleChange}
                />
                </div>
                <div className="form-group text-left">
                <label htmlFor="pdesc">Product Description</label>
                <input type="text"
                       className="form-control" 
                       id="productDescription"  
                       placeholder="Product Description" 
                       value={state.productDescription}
                       onChange={handleChange}
                />
                </div>
                <div className="form-group text-left">
                <label htmlFor="rentPrice">Rent Price</label>
                <input type="number"
                       className="form-control" 
                       id="rentPrice" 
                       placeholder="Rent/Charge per month" 
                       value={state.rentPrice}
                       onChange={handleChange}
                />
                </div>
                <div className="form-group text-left">
                <label htmlFor="deposit">Deposit</label>
                <input type="text"
                       className="form-control" 
                       id="deposit" 
                       placeholder="Deposit Amt." 
                       value={state.deposit}
                       onChange={handleChange}
                />
                </div>
                <div className="form-group text-left">
                <label htmlFor="image">Product Image</label>
                <input type="file"
                       className="form-control" 
                       id="image" 
                       placeholder="Product image" 
                       value={state.image}
                       onChange={handleChange}
                />
                </div>
                <div className="form-group text-left">
                <label htmlFor="categoryId">Category</label>
                <input type="text"
                       className="form-control" 
                       id="categoryId" 
                       placeholder="Category" 
                       value={state.categoryId}
                       onChange={handleChange}
                />
                </div>
               
                <button 
                    type="submit" 
                    className="btn btn-primary"
                    onClick={handleSubmitClick}
                >
                    Publish
                </button>
            </form>
            <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
                {state.successMessage}
            </div>
            {/* <div className="mt-2">
                <span>Already have an account? </span>

                <span className="loginText" onClick={() => redirectToLogin()}>Login here</span> 
            </div> */}
            
        </div>
    )
}

export default PublishProduct;