import { create } from "@mui/material/styles/createTransitions";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const accountApi = createApi({
  reducerPath: "account",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://fastapi-postgres-snkennedy21.herokuapp.com/",
  }),

  endpoints: (builder) => ({
    login: builder.mutation({
      query: (info) => {
        let formData = null;
        if (info instanceof HTMLElement) {
          formData = new FormData(info);
          formData.append("username", info.email.value);
        }
        return {
          url: "/login",
          method: "post",
          body: formData,
          credentials: "include",
        };
      },
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "delete",
        credentials: "include",
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = accountApi;
