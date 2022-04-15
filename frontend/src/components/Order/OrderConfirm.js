import React from 'react'
import { ORDER,USER } from '../../constants/apiConstants';
import './OrderConfirm.css'
function OrderConfirm(props) {
  const order = JSON.parse(localStorage.getItem("ORDER"));
  console.log(JSON.parse(localStorage.getItem("ORDER")));
  const user = JSON.parse(localStorage.getItem("USER"));
  return (
    <div className='col-md-6'>
        <div className='order-card'>
          Order Placed Succesfully
        {/* <img class = "order-image" src={order.image} alt="Avatar" height={100} width={100}/>
          <span>{order.productName}</span>
          <div className='order-prices'> 
            <span>Rent: ₹{order.rentPrice}</span>
            <span>Deposit: ₹{order.deposit}</span>
          </div> */}
        </div>
        {/* <div className='order-footer'>  
            <span className='order-total'>Total: ₹{order.deposit +order.rentPrice}</span>
        </div> */}
    </div>
  )
}
export default OrderConfirm;