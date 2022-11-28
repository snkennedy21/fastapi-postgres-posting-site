import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { tokenSlice } from "./rtk-slices/tokenSlice";

import { postsApi } from "./rtk-query-apis/postsApi";
import { accountApi } from "./rtk-query-apis/accountApi";

export const store = configureStore({
  reducer: {
    [postsApi.reducerPath]: postsApi.reducer,
    [accountApi.reducerPath]: accountApi.reducer,
    [tokenSlice.name]: tokenSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(postsApi.middleware)
      .concat(accountApi.middleware),
});

export const tokenActions = tokenSlice.actions;

setupListeners(store.dispatch);
