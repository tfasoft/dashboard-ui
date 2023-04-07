import { createStore } from "redux";

import allReducers from "@/redux/reducers";

import { loadState, saveState } from "@/redux/loadstore";

const persistedState = loadState();

let store = createStore(allReducers, persistedState);

store.subscribe(() =>
  saveState({
    user: store.getState().user,
    token: store.getState().token,
  })
);

export default store;
