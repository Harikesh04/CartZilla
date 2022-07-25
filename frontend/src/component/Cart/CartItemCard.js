import React from 'react'
import { Link } from "react-router-dom";
import "./CartItemCard.css";

const CartItemCard = ({ item ,deleteCartItems}) => {
  return (
    <div className="CartItemCard">
    <img src={item.image} alt="ssa" />
    <div>
      <Link to={`/product/${item.product}`}>{item.name}</Link>
      {/* here item.product refers to id of the product */}
      <span>{`Price: ₹${item.price}`}</span>
      <p onClick={()=>deleteCartItems(item.product)}>Remove</p>
      {/* here we are calling the function in  this way not in this way  onClick={deleteCartItems(item.product)} so that the function will not be automatically called . if will we called only after click */}
    </div>
  </div>
  )
}

export default CartItemCard