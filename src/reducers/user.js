import {
  FORGOT,
  LOGIN_USER,
  REGISTER_USER,
  UPDATE_USER,
  SET_COMMENTS,
  SET_COMMENTS_PRODUCT,
  UPDATE_AVATAR,
  GET_ORDER_DETAIL,
  GET_LISTID_ORDER,
  GET_PRICE_ORDER,
  GET_LINK_MOMO,
} from "../constants/typeRedux";
import {getName,getPhone,getEmail,getAddress,getUserId} from "../untils/auth";
const initialState = {
  login: {
    user: {
      _id:getUserId(),
      name: getName(),
      avatar: "",
      address: getAddress(),
      phone:getPhone(),
      email:getEmail(),
    },
  },
  loginGg: {
    user: {
      name: "Thai Ly Tien",
      avatar: "",
      address: "Sa Huynh, Quang Ngai",
    },
  },
  register: {},
  forgot: {},
  comments: [],
  commentsProduct: [],
  orderDetail: {},
  listIdOrder: "",
  totalPriceOrder: 0,
  linkMomo: "",
};
// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LINK_MOMO:
      return { ...state, linkMomo: action.payload };
    case GET_PRICE_ORDER:
      return { ...state, totalPriceOrder: action.payload };
    case GET_LISTID_ORDER:
      return { ...state, listIdOrder: action.payload };
    case GET_ORDER_DETAIL:
      return { ...state, orderDetail: action.payload };
    case FORGOT:
      return { ...state, forgot: action.payload };
    case REGISTER_USER:
      return { ...state, register: action.payload };
    case LOGIN_USER:
      return { ...state, login: action.payload.data };
    case SET_COMMENTS:
      return { ...state, comments: action.payload };
    case SET_COMMENTS_PRODUCT:
      return { ...state, commentsProduct: action.payload };
    case UPDATE_USER:
      return {
        ...state,
        login: {
          ...state.login,
          user: action.payload.data.user,
        },
      };
    case UPDATE_AVATAR:
      return {
        ...state,
        login: {
          ...state.login,
          user: { ...state.login.user, avatar: action.payload },
        },
      };
    default:
      return state;
  }
}
