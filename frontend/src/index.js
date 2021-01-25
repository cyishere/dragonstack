import React from "react";
import { render } from "react-dom";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import App from "./App";

import generationReducer from "./slices/generationSlice";

import "./index.css";

const store = configureStore({
  reducer: { generation: generationReducer },
});
console.log(store.getState());

// fetch("http://localhost:3001/generation")
//   .then((response) => response.json())
//   .then((json) => {
//     console.log("json", json);
//     store.dispatch(fetchGeneration(json.generation));
//   })
//   .catch((error) => console.error("error", error));

// store.subscribe(() => console.log(store.getState()));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
