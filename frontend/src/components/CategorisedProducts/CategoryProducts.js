import React, { useState, useEffect } from 'react';
import './CategoryProducts.css'
import {  Link } from "react-router-dom";
import {IMAGES, PRODUCT,PRODUCT_ID,API_BASE_URL,CATEGORY} from '../../constants/apiConstants';
import axios from 'axios';
import CatProducts from './CatProducts';

function CategoryProducts(props) {
  //const product = props.product;
  
  const category = localStorage.getItem(CATEGORY);
  const [products , setProducts] =useState([])
  useEffect(() => {
    fetchProducts();
  }, [])
  
  //const images = localStorage.getItem("IMAGES");
 
 // products = localStorage.getItem(PRODUCTS)
 
 const fetchProducts=()=>{
  axios.get(API_BASE_URL+'/product/category?id='+ category)
      .then(function (response) {
        console.log(response.data);
          if(response.status === 200){
            setProducts(response.data)  
              
          }
          
      })
      .catch(function (error) {
          console.log(error);
      });
      
 
 }
 function importAll(r) {
  let images = {};
  r.keys().map(item => { images[item.replace('./', '')] = r(item); });
  localStorage.setItem("IMAGES",JSON.stringify(images));
  return images;
}

//const images = importAll(require.context('./images', false, '/\.jpg/'));
const images = importAll(require.context("E:/cdac data/Project_rent_it/Shubham/rentit/RentIt/images", false, /\.(png|jpe?g|svg)$/));
         

  return (
   
    <div>
            <div class="row">
              <div class="col-md-6 col-sm-2 col-md-3">
                {products.map((product) =>
                (<CatProducts key ={product.productId} product={product} images={images}> </CatProducts>))
                }
              </div>
            </div>
          </div>
    
  )
}
export default CategoryProducts;