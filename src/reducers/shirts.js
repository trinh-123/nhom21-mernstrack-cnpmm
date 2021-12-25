import {
  GET_SHIRTS,
  GET_CATEGORIES,
  GET_PARENTCATEGORIES,
  GET_CATEGORYBYID,
  GET_DETAIL,
  GET_SHIRTS_SELLER,
  GET_SHIRTS_STORE,
  GET_SHIRTS_NEW,
  GET_NAME_PRODUCT,
  GET_LIST_VIEWED,
} from "../constants/typeRedux";

const initialState = {
  shirtsShop: {},
  categories: [],
  parentcategories: [],
  categorybyid: [],
  shirtDetail: {},
  shirtSeller: {},
  shirtsStore: {},
  shirtsNew: {},
  shirtsName: [],
  shirtsViewed: [],
};

// destruturing, spread

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LIST_VIEWED:
      return { ...state, shirtsViewed: action.payload };
    case GET_NAME_PRODUCT:
      return { ...state, shirtsName: action.payload };
    case GET_SHIRTS:
      return { ...state, shirtsShop: action.payload };
    case GET_CATEGORYBYID:
      return { ...state, categorybyid: action.payload };
    case GET_CATEGORIES:
      return { ...state, categories: action.payload };
    case GET_PARENTCATEGORIES:
      return { ...state, parentcategories: action.payload };
    case GET_DETAIL:
      return { ...state, shirtDetail: action.payload };
    case GET_SHIRTS_SELLER:
      return { ...state, shirtSeller: action.payload };
    case GET_SHIRTS_STORE:
      return { ...state, shirtsStore: action.payload };
    case GET_SHIRTS_NEW:
      return { ...state, shirtsNew: action.payload };
    default:
      return state;
  }
}
