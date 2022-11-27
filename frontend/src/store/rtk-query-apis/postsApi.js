import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postsApi = createApi({
  reducerPath: "posts",
  baseQuery: fetchBaseQuery({ baseUrl: "http://0.0.0.0:8000/" }),

  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: () => ({
        url: "/posts/",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllPostsQuery } = postsApi;
