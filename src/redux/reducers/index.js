import { combineReducers } from "redux";

import userReducer from "./user";
import sessionReducer from "./session";

const allReducers = combineReducers({
    user: userReducer,
    session: sessionReducer
});

export default allReducers;