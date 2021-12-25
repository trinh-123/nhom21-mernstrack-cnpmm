import {
  GET_SHIRTS,
  GET_CATEGORIES,
  GET_DETAIL,
  GET_SHIRTS_NEW,
  GET_PARENTCATEGORIES,
  GET_CATEGORYBYID,
  GET_NAME_PRODUCT,
  GET_LIST_VIEWED,
} from "../constants/typeRedux";
export async function getListViewed(shirts) {
  return {
    type: GET_LIST_VIEWED,
    payload: shirts,
  };
}
export async function getNameProducts(shirts) {
  return {
    type: GET_NAME_PRODUCT,
    payload: shirts,
  };
}
export async function getNews(shirts) {
  return {
    type: GET_SHIRTS_NEW,
    payload: shirts,
  };
}
export function getShirts(shirts) {
  console.log("in action", shirts);
  return {
    type: GET_SHIRTS,
    payload: shirts,
  };
}
export async function getCategoryByID(categorybyid) {
  return {
    type: GET_CATEGORYBYID,
    payload: categorybyid,
  };
}
export async function getCategories(categories) {
  return {
    type: GET_CATEGORIES,
    payload: categories,
  };
}
export async function getParentCategoies(parentcategories) {
  return {
    type: GET_PARENTCATEGORIES,
    payload: parentcategories,
  };
}
export async function getDetail(shirt) {
  return {
    type: GET_DETAIL,
    payload: shirt,
  };
}
