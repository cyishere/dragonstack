import React from "react";
import { render } from "react-dom";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import generationReducer from "./slices/generationSlice";
import dragonReducer from "./slices/dragonSlice";
import accountReducer from "./slices/accountSlice";
import Root from "./components/Root";
import { fetchAuthenticated } from "./slices/accountSlice";
import "./index.css";

const store = configureStore({
  reducer: {
    account: accountReducer,
    dragon: dragonReducer,
    generation: generationReducer,
  },
});

// store.subscribe(() => console.log(store.getState()));

store.dispatch(fetchAuthenticated()).then(() => {
  render(
    <Provider store={store}>
      <Root />
    </Provider>,
    document.getElementById("root")
  );
});
