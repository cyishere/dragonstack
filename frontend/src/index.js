import React from "react";
import { render } from "react-dom";
import { configureStore } from "@reduxjs/toolkit";
import Generation from "./components/Generation";
import Dragon from "./components/Dragon";

import generationReducer, { fetchGeneration } from "./slices/generationSlice";

import "./index.css";

const store = configureStore({
  reducer: generationReducer,
});

fetch("http://localhost:3001/generation")
  .then((response) => response.json())
  .then((json) => {
    console.log("json", json);
    store.dispatch(fetchGeneration(json.generation));
  })
  .catch((error) => console.error("error", error));

store.subscribe(() => console.log(store.getState()));

render(
  <div>
    <h2>Dragon Stack</h2>
    <Generation />
    <hr />
    <Dragon />
  </div>,
  document.getElementById("root")
);
