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
          : "border-solid border-l-2 border-l-border ml-5 pl-5"
      }`}
    >
      <div className="flex rounded-md my-1 bg-darkBackground">
        {/* <div>{comment.content}</div> */}
        <CommentVoting comment={comment} />
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
