import { combineReducers } from "redux";
import userReducer from "./user";

const allReducers = combineReducers({
    user: userReducer,
});

export default allReducers;