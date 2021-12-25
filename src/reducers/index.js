import { combineReducers } from "redux";

import user from "./user";
import shirts from "./shirts";
import cart from "./cart";
const rootReducer = combineReducers({
  user,
  shirts,
  cart,
});

export default rootReducer;
