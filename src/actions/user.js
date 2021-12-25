import {
  FORGOT,
  REGISTER_USER,
  LOGIN_USER,
  UPDATE_USER,
  GET_SHIRTS_SELLER,
  UPLOAD_SHIRT,
  GET_CART_DETAILS,
  SET_COMMENTS,
  SET_COMMENTS_PRODUCT,
  UPDATE_AVATAR,
  GET_SHIRTS_STORE,
  GET_ORDER_DETAIL,
  GET_LISTID_ORDER,
  GET_PRICE_ORDER,
  GET_LINK_MOMO,
} from "../constants/typeRedux";
export async function getLinkMomo(userData) {
  return {
    type: GET_LINK_MOMO,
    payload: userData,
  };
}
export async function getPriceOrder(userData) {
  return {
    type: GET_PRICE_ORDER,
    payload: userData,
  };
}
export async function getListIDOrder(userData) {
  return {
    type: GET_LISTID_ORDER,
    payload: userData,
  };
}

export async function getOrderDetail(userData) {
  return {
    type: GET_ORDER_DETAIL,
    payload: userData,
  };
}
export async function forgot(userData) {
  return {
    type: FORGOT,
    payload: userData,
  };
}

export async function registerUser(userData) {
  return {
    type: REGISTER_USER,
    payload: userData,
  };
}

export async function loginUser(userData) {
  return {
    type: LOGIN_USER,
    payload: userData,
  };
}

export function updateUser(userData) {
  return {
    type: UPDATE_USER,
    payload: userData,
  };
}
export function getShirtsSeller(shirts) {
  return {
    type: GET_SHIRTS_SELLER,
    payload: shirts,
  };
}
export function uploadShirt(shirts) {
  return {
    type: UPLOAD_SHIRT,
    payload: shirts,
  };
}
export function getCartDetails(cart) {
  return {
    type: GET_CART_DETAILS,
    payload: cart,
  };
}
export function getShirtsStore(shirts) {
  return {
    type: GET_SHIRTS_STORE,
    payload: shirts,
  };
}
export function setComments(comments) {
  return {
    type: SET_COMMENTS,
    payload: comments,
  };
}
export function setCommentsProduct(comments) {
  return {
    type: SET_COMMENTS_PRODUCT,
    payload: comments,
  };
}
export function updateAvatar(avatar) {
  return {
    type: UPDATE_AVATAR,
    payload: avatar,
  };
}
