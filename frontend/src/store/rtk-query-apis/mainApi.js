import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const mainApi = createApi({
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

    createPost: builder.mutation({
      query: (data) => {
        return {
          url: "/posts",
          method: "POST",
          body: data,
          credentials: "include",
          contentType: "application/json",
        };
      },
    }),

    deletePost: builder.mutation({
      query: (postId) => {
        console.log(postId);
        return {
          url: `/posts/${postId}`,
          method: "delete",
          credentials: "include",
          contentType: "application/json",
        };
      },
      invalidatesTags: ["Post"],
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
      invalidatesTags: ["Post"],
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

export const {
  useGetAllPostsQuery,
  useCreatePostMutation,
  useDeletePostMutation,
  useVoteMutation,
  useDeleteVoteMutation,
  useLoginMutation,
  useLogoutMutation,
} = mainApi;
