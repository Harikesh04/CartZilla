import { ADD_TO_CART, REMOVE_CART_ITEM, SAVE_SHIPPING_INFO } from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [],shippingInfo:{} }, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;

      const isItemExist = state.cartItems.find(
        (i) => i.product === item.product
      );
      //here i.product is searching on the basis of the id of the product  and item.product is the item we are adding to the cart

      if (isItemExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.product === isItemExist.product ? item : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case REMOVE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i.product !== action.payload),
        //here in action.payload we will send the id of our product . and what we are doing is basically we
        //are filtering the cartItem store and keeping all the product that was in the cart except the action.payload.
      };
      
      case SAVE_SHIPPING_INFO:
        return{
          ...state,
          shippingInfo: action.payload,
        }

    default:
      return state;
  }
};
