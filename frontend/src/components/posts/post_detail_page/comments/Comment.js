import CommentVoting from "./CommentVoting";
import CommentInfo from "./CommentInfo";
import React from "react";
import CommentForm from "./CommentForm";

import { useState } from "react";

function Comment({ comment }) {
  const [commentFormDisplayed, setCommentFormDisplayed] = useState(false);

  const nestedComments = (comment.replies || []).map((comment) => {
    return <Comment key={comment.id} comment={comment} type="child" />;
  });

  return (
    <div
      className={`${
        comment.depth === 0
          ? ""
          : "border-solid border-l-2 border-green-500 ml-5 pl-5"
      }`}
    >
      <div
        className={`my-2 flex border-primary border-2 border-solid rounded-md overflow-hidden relative bg-white`}
      >
        {/* <div>{comment.content}</div> */}
        <CommentVoting />
        <CommentInfo comment={comment} />
        <button onClick={() => setCommentFormDisplayed(!commentFormDisplayed)}>
          Reply
        </button>
      </div>
      {commentFormDisplayed ? (
        <CommentForm
          setCommentFormDisplayed={setCommentFormDisplayed}
          parent_id={comment.id}
        />
      ) : (
        <></>
      )}
      {nestedComments}
    </div>
  );
}

export default Comment;
