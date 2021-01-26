import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import fetchStates from "./fetchStates";
import { BACKEND } from "../config";

const initialState = {
  generationId: "",
  expiration: "",
};

/**
 * async thunk
 */
export const fetchGeneration = createAsyncThunk(
  "generation/fetchGenerationFromApi",
  () => {
    return fetch(`${BACKEND.ADDRESS}/generation`)
      .then((response) => response.json())
      .then((json) => json)
      .catch((error) => {
        console.error({ error });
        // error = { type: "", message: "" }
        return error.message;
      });
  }
);

/**
 * Main Slice
 */
const generationSlice = createSlice({
  name: "generation",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchGeneration.pending]: (state, action) => {
      state.status = fetchStates.fetching;
    },
    [fetchGeneration.fulfilled]: (state, action) => {
      // `action.payload` is `json`
      if (action.payload.type === "error") {
        state.status = fetchStates.error;
        state.message = action.payload.message;
      } else {
        state.status = fetchStates.success;
        const { generationId, expiration } = action.payload.generation;
        state.generationId = generationId;
        state.expiration = expiration;
      }
    },
    [fetchGeneration.rejected]: (state, action) => {
      state.status = fetchStates.error;
      state.message = action.payload;
    },
  },
});

export default generationSlice.reducer;
