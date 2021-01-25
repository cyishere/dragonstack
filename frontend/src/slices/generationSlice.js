import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  generationId: "",
  expiration: "",
};

/**
 * async thunk
 */
const apiUrl = "http://localhost:3001/generation";

export const fetchGeneration = createAsyncThunk(
  "generation/fetchGenerationFromApi",
  () => {
    return fetch(apiUrl)
      .then((response) => response.json())
      .then((json) => json)
      .catch((error) => {
        console.error({ error });
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
    [fetchGeneration.fulfilled]: (state, action) => {
      // `action.payload` is `json`
      if (action.payload.type === "error") {
        state.message = action.payload.message;
      } else {
        const { generationId, expiration } = action.payload.generation;
        state.generationId = generationId;
        state.expiration = expiration;
      }
    },
    [fetchGeneration.rejected]: (state, action) => {
      state.message = action.payload;
    },
  },
});

export default generationSlice.reducer;
