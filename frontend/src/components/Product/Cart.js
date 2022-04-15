import React from 'react'
import { ORDER,USER } from '../../constants/apiConstants';
// import './OrderConfirm.css'
function Cart(props) {
  const order = JSON.parse(localStorage.getItem("ORDER"));
  console.log(JSON.parse(localStorage.getItem("ORDER")));
  const user = JSON.parse(localStorage.getItem("USER"));
  const cart = JSON.parse(localStorage.getItem("allEntries"));

  const removeItem =(product) =>{
      console.log(product);
    var existingEntries = JSON.parse(localStorage.getItem("allEntries"));

    var index = existingEntries.findIndex(x => x.productId ===product.productId);
    console.log(index);
    var newEntries=existingEntries.splice(index,index); 
    //console.log(newEntries);
     localStorage.setItem("allEntries", JSON.stringify(newEntries));
  }
  return (
    <div className='col-md-6'>
        
        
        {/* <img class = "order-image" src={order.image} alt="Avatar" height={100} width={100}/> */}
        {cart.map((product) =>
                ( <div className='order-card'>
                    <span>{product.productName}</span>
                    <div className='order-prices'> 
                      <span>Rent: ₹{product.rentPrice}</span>
                      <span>Deposit: ₹{product.deposit}</span>
                    </div>
                    <button onClick={()=>removeItem(product)}>Remove</button>
                    </div>))
                }
        
        
        {/* <div className='order-footer'>  
            <span className='order-total'>Total: ₹{order.deposit +order.rentPrice}</span>
        </div> */}
    </div>
  )
}
export default Cart;