import React from 'react';
//import images from './images'
import { useState,useEffect } from 'react';
import Categories from './Categories'
//import { withRouter } from 'react-router-dom';
import { ACCESS_TOKEN_NAME, API_BASE_URL, IMAGES} from '../../constants/apiConstants';
import AllProducts from './AllProducts';
import './Home.css';
import axios from 'axios'

function Home(props) {
  const [products , setProducts] = useState([])
  useEffect(() => {
    fetchProducts();
  }, [])
 
// call api
const fetchProducts=()=>{
axios.get(API_BASE_URL+'/allproducts/available') 
            .then(function (response) {
                if(response.status === 200){
                  
                  console.log(response.data);
                  setProducts(response.data)  
                }
                else if(response.code === 204){
                    // props.showError("");
                }
                else{
                    // props.showError("erro wile feching products");
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
                                              

    const[data,setData]=useState([]);
  
    return(
      <div className='home'>
          <h1>Welcome </h1>
          <Categories></Categories>
          <div>
            <div class="row">
              <div class="col-md-6 col-sm-2 col-md-3">
                {products.map((product) =>
                (<AllProducts key ={product.productId} product={product} images={images}></AllProducts>))
                }
              </div>
            </div>
          </div>
      </div>
     
    )
}

export default Home;