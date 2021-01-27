import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import fetchStates from "./fetchStates";
import { BACKEND } from "../config";

const initialState = { loggedIn: false };

/**
 * Async Actions
 */
const fetchFromAccount = ({ endpoint, options }) => {
  return fetch(`${BACKEND.ADDRESS}/account/${endpoint}`, options)
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => {
      console.log(`error in ${endpoint} action:`, error);
      return error.message;
    });
};

// signup
export const signup = createAsyncThunk(
  "account/signup",
  ({ username, password }) =>
    fetchFromAccount({
      endpoint: "signup",
      options: {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      },
    })
);

// login
export const login = createAsyncThunk(
  "account/login",
  ({ username, password }) =>
    fetchFromAccount({
      endpoint: "login",
      options: {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      },
    })
);

// logout
export const logout = createAsyncThunk("account/logout", () =>
  fetchFromAccount({
    endpoint: "logout",
    options: {
      credentials: "include",
    },
  })
);

/**
 * Helper Functions
 */
const pendingAction = ({ state, action }) => {
  state.status = fetchStates.fetching;
};

const fulfilledAction = ({ state, action, ACTION_TYPE }) => {
  // `action.payload` is `json`
  if (action.payload.type === "error") {
    state.status = fetchStates.error;
  } else {
    state.status = fetchStates.success;
    if (ACTION_TYPE === "logout") {
      state.loggedIn = false;
    } else {
      state.loggedIn = true;
    }
  }
  state.message = action.payload.message;
};

const rejectedAction = ({ state, action }) => {
  state.status = fetchStates.error;
  state.message = action.payload;
};

/**
 * Main Slice
 */
const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {},
  extraReducers: {
    [login.pending]: (state, action) => {
      pendingAction({ state, action });
    },
    [login.fulfilled]: (state, action) => {
      fulfilledAction({ state, action, ACTION_TYPE: "login" });
    },
    [login.rejected]: (state, action) => {
      rejectedAction({ state, action });
    },
    [signup.pending]: (state, action) => {
      pendingAction({ state, action });
    },
    [signup.fulfilled]: (state, action) => {
      fulfilledAction({ state, action, ACTION_TYPE: "signup" });
    },
    [signup.rejected]: (state, action) => {
      rejectedAction({ state, action });
    },
    // logout
    [logout.pending]: (state, action) => {
      pendingAction({ state, action });
    },
    [logout.fulfilled]: (state, action) => {
      fulfilledAction({ state, action, ACTION_TYPE: "logout" });
    },
    [logout.rejected]: (state, action) => {
      rejectedAction({ state, action });
    },
  },
});

export default accountSlice.reducer;
