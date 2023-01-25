import CommentVoting from "./CommentVoting";
import CommentInfo from "./CommentInfo";
import React from "react";
import CommentForm from "./CommentForm";

import { useDeleteCommentMutation } from "../../../../store/rtk-query-apis/mainApi";

import { useState } from "react";

function Comment({ comment }) {
  const [deleteComment] = useDeleteCommentMutation();
  const [commentFormDisplayed, setCommentFormDisplayed] = useState(false);
  const [isRepliesVisible, setIsRepliesVisible] = useState(false);

  function deleteCommentHandler() {
    deleteComment(comment.id);
  }

  function toggleReplies() {
    setIsRepliesVisible(!isRepliesVisible);
  }

  function openRepliesHandler() {
    setIsRepliesVisible(true);
  }

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
      <div className="bg-darkBackground rounded-md">
        <div className="flex my-1">
          <CommentVoting comment={comment} />
          <CommentInfo comment={comment} />
        </div>
        <div className="ml-12 flex gap-2">
          <button onClick={toggleReplies}>Replies</button>
          <button
            onClick={() => setCommentFormDisplayed(!commentFormDisplayed)}
          >
            Reply
          </button>
          {comment.owner_is_user ? (
            <button onClick={deleteCommentHandler}>Delete</button>
          ) : (
            <></>
          )}
        </div>
      </div>

      {commentFormDisplayed ? (
        <CommentForm
          setCommentFormDisplayed={setCommentFormDisplayed}
          parent_id={comment.id}
          openReplies={openRepliesHandler}
          marginLeft="10"
        />
      ) : (
        <></>
      )}
      {isRepliesVisible ? <div>{nestedComments}</div> : null}
    </div>
  );
}

export default Comment;
