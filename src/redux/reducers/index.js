import { combineReducers } from "redux";

import userReducer from "./user";
import sessionReducer from "./session";
import uidReducer from "./uid";
import themeReducer from "./theme";

const allReducers = combineReducers({
    user: userReducer,
    session: sessionReducer,
    uid: uidReducer,
    theme: themeReducer,
});

export default allReducers;