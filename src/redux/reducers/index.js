import { combineReducers } from "redux";

import userReducer from "./user";
import sessionReducer from "./session";
import uidReducer from "./uid";

const allReducers = combineReducers({
    user: userReducer,
    session: sessionReducer,
    uid: uidReducer,
});

export default allReducers;