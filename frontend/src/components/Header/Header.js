import React from 'react';
import {useState} from 'react';
import logo from "../rentitlogo.png";
import './Header.css';
import {  Link } from "react-router-dom";
import MaleAvatar from "./img_avatar_male.png"

import {USER,ADMIN} from '../../constants/apiConstants'
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";


//import logoUrl from '../../assets/logo.svg';
function Header(props){
  const [itemCount, setItemCount] = React.useState(0);
  const user = localStorage.getItem("USER");
  const admin = localStorage.getItem("ADMIN");
  
  console.log(JSON.parse(localStorage.getItem("USER")));
  const [users, setUser] = useState();
  const [admins, setAdmin] = useState();

  function removeUser(){
    console.log("Removing"+JSON.stringify(localStorage.getItem("USER")));
    localStorage.removeItem("USER");
    localStorage.removeItem("ADMIN");
    //localStorage.clear();
    
    setUser(null);
    setAdmin(null);

  }
  return (
  <div className="header">
  
    <span>
      <Link to="/"><img class = "logo" alt='Rent It' src={logo} /></Link>
    </span>
    <div style={user == null && admin == null? { display:'block'} : { display: 'none'}}>
        <span>
        <Link to="/login"><button class="button-login" role="button">Login</button></Link>
        </span>
        <span>
        <Link to="/register"><button class="button-register" role="button">Register</button></Link>
        </span>
    </div>

    <span className="cart">
      <Link to="/cart"><Badge color="secondary" badgeContent={itemCount}>
          <ShoppingCartIcon />{" "}
        </Badge></Link>
    </span>
    
    <div class="dropdown">
      
      <img src={MaleAvatar} alt="Avatar" class="avatar"/>
      <span style={{color:'white'}}>{user != null ? user.firstName: admin!= null ? admin.firstName : ""}</span>
      <div class="dropdown-content">
      <span ><Link to="/profile" >Profile</Link></span>
      <span onClick={removeUser} style={user != null || admin != null ? { display:'block'} : { display: 'none'}}><Link to="/logout">Logout</Link></span>
      <span style={admin != null ? { display:'block'} : { display: 'none'}}><Link to="/adminportal" >Admin Portal</Link></span>
  </div>
      
    </div>
   </div>
)
  }
export default Header;