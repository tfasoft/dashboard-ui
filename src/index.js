import React from 'react';
import ReactDOM from 'react-dom/client';

import { createStore } from "redux";
import { Provider } from "react-redux";

import allReducers from "./redux/reducers";

import { loadState, saveState } from "./redux/storage/localstore";

import App from './App';
import "./App.sass";

const persistedState = loadState();

let store = createStore(
    allReducers,
    persistedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => saveState({
    user: store.getState().user
}))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);