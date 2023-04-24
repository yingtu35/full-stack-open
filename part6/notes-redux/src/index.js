import React from 'react';
import ReactDOM from 'react-dom/client';
import noteReducer from './reducers/noteReducer';
import filterReducer from './reducers/filterReducer';
import { createStore, combineReducers } from "redux"
import { Provider } from "react-redux"
import App from "./App"

const reducer = combineReducers({
  notes: noteReducer,
  filter: filterReducer
})
const store = createStore(reducer)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);