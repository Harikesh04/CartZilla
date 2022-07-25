import {
    ADD_TO_CART, REMOVE_CART_ITEM, SAVE_SHIPPING_INFO
  } from "../constants/cartConstants";

  import axios from "axios";

  // Add to Cart
export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/v1/product/${id}`);
  
    dispatch({
      type: ADD_TO_CART,
      payload: {
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.images[0].url,
        stock: data.product.Stock,
        quantity,
      },
    });

    //if we only add the item so when we refresh the page then all it will gone . 
    // so we are adding cart to our local storage .
  
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
   // localStorage.setItem("key", value); 
   // with the help of get state we can access the state of the cart.
  };
  // remove from Cart
export const removeItemsFromCart = (id) => async (dispatch, getState) => {
 
  
    dispatch({
      type: REMOVE_CART_ITEM,
      payload: id,
      },
    );

  
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
  
  };
  //save shipping info
export const saveShippingInfo = (data) => async (dispatch) => {
 
  
    dispatch({
      type:SAVE_SHIPPING_INFO,
      payload:data,
      },
    );

  
    localStorage.setItem("shippingInfo", JSON.stringify(data));
  
  };