import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { tokenSlice } from "./rtk-slices/tokenSlice";

import { mainApi } from "./rtk-query-apis/mainApi";

export const store = configureStore({
  reducer: {
    [mainApi.reducerPath]: mainApi.reducer,
    [tokenSlice.name]: tokenSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(mainApi.middleware),
});

export const tokenActions = tokenSlice.actions;

setupListeners(store.dispatch);
