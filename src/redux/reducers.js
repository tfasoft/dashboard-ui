import { combineReducers } from "redux";

import userReducer from "./reducers/user";
import tokenReducer from "./reducers/token";

export default combineReducers({
  user: userReducer,
  token: tokenReducer,
});
