import React from 'react';

import './AdminPortal.css';
import Furniture from '../images/furniture.png';
// import WashingMachine from './images/washingmachine.png';
// import HomeTheatre from './images/hometheatre.png'
import {  Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCouch, fa } from '@fortawesome/free-solid-svg-icons'

const AdminPortal = () => (

    <div class ="container">
        <div class = "row">
            <div class="category-card col-md-12 col-sm-12 col-xs12">
                <div data-size="small" data-role="tile">
                    <img src={Furniture} width={50} class="icon"/><br/>
                    <Link to="/publishproduct"><span>Add Product</span></Link> 
                </div>
            </div>
            <div class=" category-card col-md-12 col-sm-12 col-xs12">
                <div data-size="small" data-role="tile">
                    {/* <img src={WashingMachine} width={50} class="icon"/><br/> */}
                    <span>Update Product</span>
                </div>
            </div>
            <div class="category-card col-md-12 col-sm-12 col-xs12">
                <div data-size="small" data-role="tile">
                    {/* <img src={HomeTheatre} width={50} class="icon"/><br/> */}
                    <span>Delete Product</span>
                </div>
            </div>
            
            
        </div>
    </div>
)
export default AdminPortal;
