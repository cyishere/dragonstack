import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  generationId: "",
  expiration: "",
};

const generationSlice = createSlice({
  name: "generation",
  initialState,
  reducers: {
    fetchGeneration: (state, action) => {
      const { generationId, expiration } = action.payload;
      state.generationId = generationId;
      state.expiration = expiration;
    },
  },
});

export const { fetchGeneration } = generationSlice.actions;

export default generationSlice.reducer;
