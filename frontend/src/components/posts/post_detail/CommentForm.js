import { produceWithPatches } from "immer";
import React from "react";
import { useState } from "react";

import { useParams } from "react-router-dom";

import {
  useCreateCommentMutation,
  useGetPostQuery,
} from "../../../store/rtk-query-apis/mainApi";

function CommentForm(props) {
  const { postId } = useParams();
  const { data: post, isLoading: postLoading } = useGetPostQuery(postId);
  const [comment, setComment] = useState("");
  const [createComment] = useCreateCommentMutation();

  function commentChangeHandler(e) {
    setComment(e.target.value);
  }

  function commentSubmitHandler(e) {
    e.preventDefault();
    const commentData = {
      post_id: post.post_id,
      content: comment,
    };
    createComment(commentData);
    props.setCommentFormDisplayed(false);
  }

  return (
    <div className="flex flex-col">
      <form onSubmit={commentSubmitHandler} className="max-w-[900px]">
        <textarea
          onChange={commentChangeHandler}
          value={comment}
          name="comment"
          placeholder="Comment"
          className="w-full p-2 text-2xl rounded-md border-black border-2 focus:border-primary outline-none transition duration-300"
        ></textarea>

        <div className="flex justify-end">
          <button className="py-2 px-4 text-xl bg-primary rounded-md text-white hover:bg-blue-400 active:scale-105 transition-color">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default CommentForm;
