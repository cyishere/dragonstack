import { configureStore } from "@reduxjs/toolkit";
import generationReducer from "../slices/generationSlice";
import dragonReducer from "../slices/dragonSlice";

const store = configureStore({
  reducer: { generation: generationReducer, dragon: dragonReducer },
});

// store.subscribe(() => console.log(store.getState()));

export default store;
