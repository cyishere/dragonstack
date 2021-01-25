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
      .then((json) => json.generation)
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
      const { generationId, expiration } = action.payload;
      state.generationId = generationId;
      state.expiration = expiration;
    },
    [fetchGeneration.rejected]: (state, action) => {
      state.message = action.payload;
    },
  },
});

export default generationSlice.reducer;
