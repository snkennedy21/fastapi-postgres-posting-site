import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: false,
  tokenValue: null,
};

export const tokenSlice = createSlice({
  name: "token",
  initialState: initialState,
  reducers: {
    validateToken: (state) => {
      state.token = true;
    },
    invalidateToken: (state) => {
      state.token = false;
    },
    setTokenValue: (state, action) => {
      state.tokenValue = action.payload;
    },
  },
});

export const { validateToken, invalidateToken, setTokenValue } =
  tokenSlice.actions;
