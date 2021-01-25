import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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
  async () => {
    try {
      const response = await axios.get(apiUrl);
      return response.data.generation;
    } catch (error) {
      console.error({ error });
    }
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
  },
});

export default generationSlice.reducer;
