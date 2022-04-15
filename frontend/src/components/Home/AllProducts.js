import React, { useState } from 'react';
import './AllProducts.css'
import {  Link } from "react-router-dom";
import {IMAGES, PRODUCT,PRODUCT_ID} from '../../constants/apiConstants';
import axios from 'axios';

function AllProducts(props) {
  const product = props.product;
 
 console.log("props" + props.product.rentPrice);
 
 const setProductId = (e) => {
  console.log("Inside " + product.rentPrice);
  localStorage.removeItem("PRODUCT");
  let prod = product;
  prod.image = props.images[product.image];
  localStorage.setItem("PRODUCT",JSON.stringify(prod));
  
  console.log("getfrom local storage"+localStorage.getItem("PRODUCT"));
}
  return (
   
    <div class="card">
      <img class = "product-image" src={props.images[product.image]} alt= {product.productName} height={100}/>
      <div class="container">
        <h4><b>{product.productName}</b></h4>
        <p>{product.productDescription}</p>
      </div>
      <hr/>
      <div class="card-footer">
      <span class="rent">Rent: {product.rentPrice}</span>
      <Link to="/product"><span class="more"><button onClick={setProductId}>See More</button></span></Link>
      </div>
    </div>
    
  )
}
export default AllProducts;