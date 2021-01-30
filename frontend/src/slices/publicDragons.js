import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BACKEND } from "../config";
import fetchStates from "./fetchStates";

const initialState = { dragons: [] };

/**
 * Async Thunks
 */
export const fetchPublicDragons = createAsyncThunk(
  "publicDragons/fetchPublicDragons",
  () => {
    return fetch(`${BACKEND.ADDRESS}/dragon/public-dragons`)
      .then((response) => response.json())
      .then((json) => json)
      .catch((error) => {
        console.log("error in fetchPublicDragons action:", error);
        return error.message;
      });
  }
);

/**
 * Main Slice
 */
const publicDragonsSlice = createSlice({
  name: "publicDragons",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPublicDragons.pending]: (state, action) => {
      state.status = fetchStates.fetching;
    },
    [fetchPublicDragons.fulfilled]: (state, action) => {
      if (action.payload.type === "error") {
        state.status = fetchStates.error;
        state.message = action.payload.message;
      } else {
        state.status = fetchStates.success;
        state.dragons = state.dragons.concat(action.payload.dragons);
      }
    },
    [fetchPublicDragons.rejected]: (state, action) => {
      state.status = fetchStates.error;
    },
  },
});

export default publicDragonsSlice.reducer;
