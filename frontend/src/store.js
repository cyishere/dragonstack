import { configureStore } from "@reduxjs/toolkit";
import generationReducer from "./slices/generationSlice";

const store = configureStore({
  reducer: { generation: generationReducer },
});

// store.subscribe(() => console.log(store.getState()));

export default store;
