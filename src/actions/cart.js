import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  SET_CART,
} from "../constants/typeRedux";
export function addToCart(cartItem) {
  return {
    type: ADD_TO_CART,
    payload: cartItem,
  };
}
export function removeFromCart(cartItem) {
  return {
    type: REMOVE_FROM_CART,
    payload: cartItem,
  };
}
export function setCart(cart) {
  return {
    type: SET_CART,
    payload: cart,
  };
}
