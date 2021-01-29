import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BACKEND } from "../config";
import fetchStates from "./fetchStates";

const initialState = {};

/**
 * Async Thunk
 */
export const fetchAccountInfo = createAsyncThunk(
  "accountInfo/fetchAccountInfo",
  () => {
    console.log("fetch account info");
    return fetch(`${BACKEND.ADDRESS}/account/info`, { credentials: "include" })
      .then((response) => response.json())
      .then((json) => json)
      .catch((error) => {
        console.log(`error in fetchAccountInfo action:`, error);
        return error.message;
      });
  }
);

/**
 * Main Slice
 */
const accountInfoSlice = createSlice({
  name: "accountInfo",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAccountInfo.pending]: (state, action) => {
      console.log({ action });
      state.status = fetchStates.fetching;
    },
    [fetchAccountInfo.fulfilled]: (state, action) => {
      console.log({ action });
      if (action.payload.type === "error") {
        state.status = fetchStates.error;
        state.message = action.payload.message;
      } else {
        state.status = fetchStates.success;
        state.username = action.payload.info.username;
        state.balance = action.payload.info.balance;
      }
    },
    [fetchAccountInfo.rejected]: (state, action) => {
      console.log({ action });
      state.status = fetchStates.error;
      state.message = action.payload;
    },
  },
});

export default accountInfoSlice.reducer;
