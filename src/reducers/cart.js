import {
  ADD_TO_CART,
  GET_CART_DETAILS,
  REMOVE_FROM_CART,
  SET_CART,
} from "../constants/typeRedux";

const initialState = {};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return { ...action.payload };
    case GET_CART_DETAILS:
      return { ...action.payload };
    case REMOVE_FROM_CART:
      return { ...action.payload };
    case SET_CART:
      return { ...action.payload };
    default:
      return state;
  }
}
