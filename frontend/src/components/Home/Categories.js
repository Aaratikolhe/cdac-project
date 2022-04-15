import React ,{useState}from 'react';
// import logo from "../rentitlogo.png";
import './Categories.css';
import {CATEGORY} from '../../constants/apiConstants';
import Furniture from './images/furniture.png';
import WashingMachine from './images/washingmachine.png';
import HomeTheatre from './images/hometheatre.png'
import { useNavigate } from "react-router-dom";

function Categories(props) {
    const navigate= useNavigate();
    // function setCategory (cat) {
    //     localStorage.removeItem("CATEGORY");
    //     localStorage.setItem("CATEGORY",cat);
    //     navigate('/categoryproducts');
    //   }
      const redirectToCatProducts = (cat) => {
        //props.history.push('/register'); 
        localStorage.setItem(CATEGORY,cat);
        navigate('/categoryproducts');
    }
    
return  (

    <div class ="container">
        <div class = "row">
            <div class="category-card col-md-12 col-sm-12 col-xs12">
            <div  data-size="small" data-role="tile" onClick={() => redirectToCatProducts(3)}>
            <img src={Furniture} width={50} class="icon"/><br/>
                     <span>Furniture</span>
                </div>
            </div>
            <div class=" category-card col-md-12 col-sm-12 col-xs12">
               <div  data-size="small" data-role="tile" onClick={() => redirectToCatProducts(5)}>
                    <img src={WashingMachine} width={50} class="icon"/><br/>
                    <span>Home Appliances</span>
                </div>
            </div>
            <div class="category-card col-md-12 col-sm-12 col-xs12" >
            <div  data-size="small" data-role="tile" onClick={() => redirectToCatProducts(7)}>
                    <img src={HomeTheatre} width={50} class="icon"/><br/>
                    <span>Electronics</span>
                </div>
            </div>
            
            
        </div>
    </div>
)
}
export default Categories;
