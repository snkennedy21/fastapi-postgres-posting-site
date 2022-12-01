import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: false,
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
  },
});

export const { validateToken, invalidateToken } = tokenSlice.actions;
