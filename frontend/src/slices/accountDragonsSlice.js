import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BACKEND } from "../config";
import fetchStates from "./fetchStates";

const initialState = { dragons: [] };

/**
 * Async Actions
 */
// fetch dragons
export const fetchDragonsByAccount = createAsyncThunk(
  "accountDragons/fetchDragonsByAccount",
  () => {
    return fetch(`${BACKEND.ADDRESS}/account/dragons`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((json) => json)
      .catch((error) => {
        console.log(`error in ${endpoint} action:`, error);
        return error.message;
      });
  }
);

/**
 * Main Slice
 */
const accountDragonsSlice = createSlice({
  name: "accountDragons",
  initialState,
  reducers: {},
  extraReducers: {
    // fetch dragons by account
    [fetchDragonsByAccount.pending]: (state, action) => {
      state.status = fetchStates.fetching;
    },
    [fetchDragonsByAccount.fulfilled]: (state, action) => {
      // `action.payload` is json
      // json.dragons
      if (action.payload.type === "error") {
        state.status = fetchStates.error;
        state.message = action.payload.message;
      } else {
        state.status = fetchStates.success;
        state.dragons = action.payload.dragons;
      }
    },
    [fetchDragonsByAccount.rejected]: (state, action) => {
      state.status = fetchStates.error;
      state.message = action.payload;
    },
  },
});

export default accountDragonsSlice.reducer;
