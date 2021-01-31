import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import fetchStates from "./fetchStates";
import { BACKEND } from "../config";

const initialState = {
  generationId: "",
  dragonId: "",
  nickname: "",
  birthdate: "",
  traits: [],
};

/**
 * async thunk
 */

export const fetchDragon = createAsyncThunk("dragon/fetchDragon", () => {
  return fetch(`${BACKEND.ADDRESS}/dragon/new`, { credentials: "include" })
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => {
      console.log("Error in fetchDragon thunk: ", error);
      return error.message;
    });
});

/**
 * Main Slice
 */
const dragonSlice = createSlice({
  name: "dragon",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchDragon.pending]: (state, action) => {
      state.status = fetchStates.fetching;
    },
    [fetchDragon.fulfilled]: (state, action) => {
      // `action.payload` is `json`
      if (action.payload.type === "error") {
        state.status = fetchStates.error;
        state.message = action.payload.message;
      } else {
        state.status = fetchStates.success;
        // action.payload.dragon
        const {
          generationId,
          dragonId,
          nickname,
          birthdate,
          traits,
          isPublic,
          saleValue,
          sireValue,
        } = action.payload.dragon;

        state.generationId = generationId;
        state.dragonId = dragonId;
        state.nickname = nickname;
        state.birthdate = birthdate;
        state.traits = traits;
        state.isPublic = isPublic;
        state.saleValue = saleValue;
        state.sireValue = sireValue;
      }
    },
    [fetchDragon.rejected]: (state, action) => {
      state.status = fetchStates.error;
      // `action.payload` is `error.message`
      state.message = action.payload;
    },
  },
});

export default dragonSlice.reducer;
