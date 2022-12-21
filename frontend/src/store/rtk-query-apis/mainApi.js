import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const mainApi = createApi({
  reducerPath: "posts",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}`,
  }),

  tagTypes: ["Post", "Comment"],
  endpoints: (builder) => ({
    // ************** //
    // POST ENDPOINTS //
    // ************** //
    getAllPosts: builder.query({
      query: () => ({
        url: "/posts",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Post"],
    }),

    getPost: builder.query({
      query: (id) => ({
        url: `/posts/${id}`,
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
      invalidatesTags: ["Post"],
    }),

    deletePost: builder.mutation({
      query: (postId) => {
        return {
          url: `/posts/${postId}`,
          method: "DELETE",
          credentials: "include",
          contentType: "application/json",
        };
      },
      invalidatesTags: ["Post"],
    }),

    updatePost: builder.mutation({
      query: (data) => {
        console.log(data);
        return {
          url: `/posts/${data.id}`,
          method: "PUT",
          body: {
            title: data.title,
            content: data.content,
          },
          credentials: "include",
          contentType: "application/json",
        };
      },
      invalidatesTags: ["Post"],
    }),

    // ************** //
    // VOTE ENDPOINTS //
    // ************** //
    vote: builder.mutation({
      query: (data) => {
        return {
          url: "/vote",
          method: "POST",
          body: data,
          credentials: "include",
          contentType: "application/json",
        };
      },
      invalidatesTags: ["Post"],
    }),

    deleteVote: builder.mutation({
      query: (data) => {
        return {
          url: "/vote",
          method: "DELETE",
          body: data,
          credentials: "include",
          contentType: "application/json",
        };
      },
      invalidatesTags: ["Post"],
    }),

    commentVote: builder.mutation({
      query: (data) => {
        console.log(data);
        return {
          url: "/commentvote",
          method: "POST",
          body: data,
          credentials: "include",
          contentType: "application/json",
        };
      },
      invalidatesTags: ["Comment"],
    }),

    deleteCommentVote: builder.mutation({
      query: (data) => {
        console.log(data);
        return {
          url: "/commentvote",
          method: "DELETE",
          body: data,
          credentials: "include",
          contentType: "application/json",
        };
      },
      invalidatesTags: ["Comment"],
    }),

    // ************** //
    // AUTH ENDPOINTS //
    // ************** //
    login: builder.mutation({
      query: (info) => {
        let formData = null;
        if (info instanceof HTMLElement) {
          formData = new FormData(info);
          formData.append("username", info.email.value);
        }
        return {
          url: "/login",
          method: "POST",
          body: formData,
          credentials: "include",
        };
      },
      invalidatesTags: ["Post", "Comment"],
    }),

    signup: builder.mutation({
      query: (data) => {
        console.log(data);
        return {
          url: "/users",
          method: "POST",
          body: data,
          credentials: "include",
        };
      },
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "DELETE",
        credentials: "include",
      }),
    }),

    // ***************** //
    // COMMENT ENDPOINTS //
    // ***************** //

    getComments: builder.query({
      query: (postId) => ({
        url: `/comments/post/${postId}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Comment"],
    }),

    createComment: builder.mutation({
      query: (data) => ({
        url: "/comments",
        method: "POST",
        body: data,
        credentials: "include",
        contentType: "application/json",
      }),
      invalidatesTags: ["Comment", "Post"],
    }),

    updateComment: builder.mutation({
      query: (data) => ({
        url: `/comments/${data.id}`,
        method: "PUT",
        body: data,
        credentials: "include",
        contentType: "application/json",
      }),
      invalidatesTags: ["Comment"],
    }),

    deleteComment: builder.mutation({
      query: (postId) => ({
        url: `/comments/${postId}`,
        method: "DELETE",
        credentials: "include",
        contentType: "application/json",
      }),
      invalidatesTags: ["Comment", "Post"],
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  useGetPostQuery,
  useCreatePostMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
  useVoteMutation,
  useDeleteVoteMutation,
  useCommentVoteMutation,
  useDeleteCommentVoteMutation,
  useLoginMutation,
  useSignupMutation,
  useLogoutMutation,
  useGetCommentsQuery,
  useCreateCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} = mainApi;
