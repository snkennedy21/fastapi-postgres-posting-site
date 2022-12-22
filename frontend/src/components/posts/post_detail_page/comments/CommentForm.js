import { produceWithPatches } from "immer";
import React from "react";
import { useState } from "react";

import { useParams } from "react-router-dom";

import adjustTextareaHeight from "../../../../functions/adjustTextareaHeight";

import {
  useCreateCommentMutation,
  useGetPostQuery,
} from "../../../../store/rtk-query-apis/mainApi";

function CommentForm(props) {
  const { postId } = useParams();
  const { data: post, isLoading: postLoading } = useGetPostQuery(postId);
  const [comment, setComment] = useState("");
  const [createComment] = useCreateCommentMutation();

  function commentChangeHandler(e) {
    setComment(e.target.value);
    adjustTextareaHeight(e, "104px");
  }

  function commentSubmitHandler(e) {
    e.preventDefault();
    const commentData = {
      post_id: post.post_id,
      content: comment,
      parent_id: props.parent_id,
    };

    createComment(commentData);
    props.setCommentFormDisplayed(false);
  }

  return (
    <div className={`ml-${props.marginLeft} flex flex-col`}>
      <form onSubmit={commentSubmitHandler} className="w-full my-2">
        <textarea
          onChange={commentChangeHandler}
          value={comment}
          name="comment"
          placeholder="Comment"
          className="w-full p-2 text-2xl bg-darkBackground text-textGrey rounded-md border-border border-2 focus:border-primary outline-none transition duration-300 h-[100px]"
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
