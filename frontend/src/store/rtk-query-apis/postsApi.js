import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postsApi = createApi({
  reducerPath: "posts",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}`,
  }),

  tagTypes: ["Post"],
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: () => ({
        url: "/posts",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Post"],
    }),

    vote: builder.mutation({
      query: (data) => {
        return {
          url: "/vote",
          method: "post",
          body: data,
          credentials: "include",
          contentType: "application/json",
        };
      },
      invalidatesTags: ["Post"],
    }),

    deleteVote: builder.mutation({
      query: (data) => {
        console.log(data);
        return {
          url: "/vote",
          method: "delete",
          body: data,
          credentials: "include",
          contentType: "application/json",
        };
      },
      invalidatesTags: ["Post"],
    }),
  }),
});

export const { useGetAllPostsQuery, useVoteMutation, useDeleteVoteMutation } =
  postsApi;
