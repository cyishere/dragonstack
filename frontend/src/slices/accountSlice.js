import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import fetchStates from "./fetchStates";
import { BACKEND } from "../config";

const initialState = { loggedIn: false };

/**
 * Async Actions
 */
export const login = createAsyncThunk(
  "account/login",
  ({ username, password }) => {
    return fetch(`${BACKEND.ADDRESS}/account/login`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((json) => json)
      .catch((error) => {
        console.log("error in doLogin action:", error);
        return error.message;
      });
  }
);

export const signup = createAsyncThunk(
  "account/signup",
  ({ username, password }) => {
    return fetch(`${BACKEND.ADDRESS}/account/signup`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((json) => json)
      .catch((error) => {
        console.log("error in signup action:", error);
        return error.message;
      });
  }
);

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {},
  extraReducers: {
    [login.pending]: (state, action) => {
      state.status = fetchStates.fetching;
    },
    [login.fulfilled]: (state, action) => {
      state.status = fetchStates.success;
      state.message = action.payload.message;
      state.loggedIn = true;
    },
    [login.rejected]: (state, action) => {
      state.status = fetchStates.error;
      state.message = action.payload;
    },
    [signup.pending]: (state, action) => {
      state.status = fetchStates.fetching;
    },
    [signup.fulfilled]: (state, action) => {
      // `action.payload` is `json`
      if (action.payload.type === "error") {
        state.status = fetchStates.error;
      } else {
        state.status = fetchStates.success;
        state.loggedIn = true;
      }
      state.message = action.payload.message;
    },
    [signup.rejected]: (state, action) => {
      state.status = fetchStates.error;
      state.message = action.payload;
    },
  },
});

export default accountSlice.reducer;
