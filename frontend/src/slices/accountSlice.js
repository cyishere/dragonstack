import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import fetchStates from "./fetchStates";
import { BACKEND } from "../config";

export const doLogin = createAsyncThunk(
  "account/doLogin",
  ({ username, password }) => {
    return fetch(`${BACKEND}/login`, { username, password })
      .then((response) => response.json())
      .then((json) => json)
      .catch((error) => {
        console.log("error in doLogin action:", error);
        return error.message;
      });
  }
);

const initialState = { loggedIn: false };

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {},
  extraReducers: {
    [doLogin.pending]: (state, action) => {
      state.status = fetchStates.fetching;
    },
    [doLogin.fulfilled]: (state, action) => {
      state.status = fetchStates.success;
      state.message = action.payload.message;
      state.loggedIn = true;
    },
    [doLogin.rejected]: (state, action) => {
      state.status = fetchStates.error;
      state.message = action.payload;
    },
  },
});

export default accountSlice.reducer;
