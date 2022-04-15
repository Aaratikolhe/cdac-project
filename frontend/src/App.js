import React, {useState} from 'react';
import './App.css';

import Header from './components/Header/Header';
import LoginForm from './components/LoginForm/LoginForm';
import RegistrationForm from './components/UserRegistration/RegisterationForm.js';
import Home from './components/Home/Home';
import background from './components/images/Background2.jpg'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PublishProduct from './components/AdminFunctions/PublishProduct';
import UserProfile from './components/UserProfile/UserProfile';
import Product from './components/Product/product';
import OrderConfirm from './components/Order/OrderConfirm';
import Footer from './components/Footer';
// import Cart from './components/Product/Cart.js';
import AdminPortal from './components/AdminFunctions/AdminPortal';
import CategoryProducts from './components/CategorisedProducts/CategoryProducts';
import Cart from './components/Product/Cart';

function App() {
  const [title, updateTitle] = useState(null);
  // const [errorMessage, updateErrorMessage] = useState(null);
  return (
    <BrowserRouter>
    <div className="App">
      <Header/>
        {/* <div style={{ backgroundImage: `url(${background})` }} className="page-wrap container d-flex align-items-center flex-column"> */}
        <div className="page-wrap container d-flex align-items-center flex-column">
          <Routes>
            <Route path="/"  element={<Home />}/>
            
           
            <Route path="/register" element={<RegistrationForm/>} />
            <Route path="/login" element={<LoginForm/>} />           
            <Route path="/home" element={<Home/>} />
            <Route path="/adminportal" element={<AdminPortal/>} /> 
            <Route path="/publishproduct" element={<PublishProduct/>} />           
            <Route path="/categoryproducts" element={<CategoryProducts/>} />           
            <Route path="/profile" element={<UserProfile/>} />             
            <Route path="/product" element={<Product/>} />
            <Route path="/logout" element={<LoginForm/>} />
            <Route path="/orderconfirm" element={<OrderConfirm/>} />
            <Route path="/cart" element={<Cart/>} />
              
            
            </Routes>
        </div>
        
    </div>
    <Footer/>
    </BrowserRouter>
  );
}

export default App;
