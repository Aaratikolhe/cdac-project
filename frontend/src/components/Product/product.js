//import React from 'react';
import React, {useState,useEffect} from 'react';
import axios from 'axios';
import './Product.css';
import {API_BASE_URL,IMAGES,PRODUCT,ORDER,USER} from '../../constants/apiConstants';
import { useNavigate,Link } from "react-router-dom";


function Product(props) {
    const navigate= useNavigate();
    const product = JSON.parse(localStorage.getItem("PRODUCT"));
    const user = JSON.parse(localStorage.getItem("USER"));
    //console.log("Rent "+ user.firstName);
    const images = localStorage.getItem("IMAGES");
    //const images = JSON.parse(localStorage.getItem(IMAGES));
    
    ///const [cartItems , setCartItems] = useState([])
    const onAdd =(product) =>{
        //setCartItems([...setCartItems,{...product}]);
        var existingEntries = JSON.parse(localStorage.getItem("allEntries"));
        if(existingEntries == null) existingEntries = [];
        
        localStorage.setItem("entry", JSON.stringify(product));
        // Save allEntries back to local storage
        existingEntries.push(JSON.parse(localStorage.getItem("entry")));
        localStorage.setItem("allEntries", JSON.stringify(existingEntries));
        //console.log(JSON.parse(localStorage.getItem("allEntries")));
        
    }
    function onOrder(order){
        //localStorage.setItem(ORDER,JSON.stringify(product));
        //props.navigate('/orderconfirm');
    }
    const payload ={
        "customer": {
          "aadharNo": user.aadharNo,
          "customerArea": user.customerArea,
          "customerCity": user.customerCity,
          "customerContact":user.customerContact,
          "customerEmail": user.customerEmail,
          "customerFirstName": user.customerFirstName,
          "customerId": user.customerId,
          "customerLastName": user.customerLastName,
          "customerPincode": user.customerPincode,
          "loginId": {
            "loginId": user.loginId.loginId,
            "password": user.loginId.password,
            "role": user.loginId.role,
            "username": user.loginId.username
          }
        },
        "orderDate": new Date(),
        "orderId": Math.random(),
        "orderItemList": [
          {
   
            "itemCost": product.rentPrice + product.deposit,
            "itemId": product.productId,
            "itemRentDate": new Date(),
            "itemReturnDate": new Date().setDate(new Date().getDate() + 30),
            "product": {
              "available": "Y",
              "categoryId": {
                "categoryId": product.categoryId.categoryId,
                "categoryName": product.categoryId.categoryName
              },
              "deposit": product.deposit,
              "image": product.image,
              "productDescription": product.productDescription,
              "productId": product.productId,
              "productName": product.productName,
              "rentPrice": product.rentPrice
            }
          }
        ],
        "orderPrice": product.rentPrice,
        "orderstatus": "Order Placed"
      }
    
    
    const sendDetailsToServer = () => {
             
            axios.post(API_BASE_URL+'/placeorder/',payload)
                .then(function (response) {
                    if(response.status === 200){
                        
                        
                        console.log("Response"+ response.data);
                        onOrder(response.data);
                        localStorage.setItem(ORDER,response.data);
                        redirectToOrderConfirm();
                    } else{
                        props.showError("Some error ocurred");
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });    
        
        
    }
    
    const redirectToOrderConfirm = () => {
        //props.updateTitle('Home')
        //history.push('/home');
        navigate('/orderconfirm')
    }
    
    return(
        <div class="row">
            <div class="col-md-6">
            <div class="product-card">
                <img class = "detail-product-image" src={product.image} alt="Avatar" height={300} width={300}/>
                <div class="product-container">
                    <h4><b>{product.productName}</b></h4>
                    <p>{product.productDescription}</p>
                </div>
                <div class="card-footer">
                <span class="product-deposit">Rent: ₹{product.rentPrice}</span>
                <span class='product-deposit'>Deposit: ₹{product.deposit}</span>
                </div>
                </div>
            
            </div>
            <div class= "col-md-3">
                <div class="rent-card">
                    <h4><b>{product.productName}</b></h4>
                    <div class="rent-container">
                        Deliver to : {user!=null?user.area:"No address found"}
                        <button onClick={()=>onAdd(product)} className='add-to-cart-btn'>Add to cart</button>
                        <Link to="/orderconfirm"><button onClick={onOrder} className='product-btn'>Order</button></Link> 
                     </div>
                </div>
 
            </div>
        </div>

    )
}

export default Product;