import { combineReducers } from "redux";

import userReducer from "./user";
import sessionReducer from "./session";
import uidReducer from "./uid";
import themeReducer from "./theme";
import envReducer from "./env";

const allReducers = combineReducers({
    user: userReducer,
    session: sessionReducer,
    uid: uidReducer,
    theme: themeReducer,
    env: envReducer,
});

export default allReducers;