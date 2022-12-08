import React from "react";
import { useState } from "react";

import { useParams } from "react-router-dom";

import {
  useCreateCommentMutation,
  useGetPostQuery,
} from "../../../store/rtk-query-apis/mainApi";

function CommentForm() {
  const { postId } = useParams();
  const { data: post, isLoading: postLoading } = useGetPostQuery(postId);
  const [content, setContent] = useState("");
  const [createComment] = useCreateCommentMutation();

  function contentChangeHandler(e) {
    setContent(e.target.value);
  }

  function commentSubmitHandler(e) {
    e.preventDefault();
    const commentData = {
      post_id: post.Post.id,
      content: content,
    };
    createComment(commentData);
  }

  return (
    <form
      onSubmit={commentSubmitHandler}
      className="bg-blue-100 flex flex-col gap-6 w-60 p-12"
    >
      <textarea
        onChange={contentChangeHandler}
        value={content}
        name="content"
        placeholder="Content"
      ></textarea>
      <button className="bg-green-400">Login</button>
    </form>
  );
}

export default CommentForm;
