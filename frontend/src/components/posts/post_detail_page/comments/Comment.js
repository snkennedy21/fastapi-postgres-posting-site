import CommentVoting from "./CommentVoting";
import CommentInfo from "./CommentInfo";
import React from "react";
import CommentForm from "./CommentForm";

import { useDeleteCommentMutation } from "../../../../store/rtk-query-apis/mainApi";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
import { produceWithPatches } from "immer";

function Comment({ comment, postId }) {
  const [deleteComment] = useDeleteCommentMutation();
  const [commentFormDisplayed, setCommentFormDisplayed] = useState(false);
  const token = useSelector((state) => state.token).token;
  const [isRepliesVisible, setIsRepliesVisible] = useState(false);
  const navigate = useNavigate();

  console.log(postId);

  function deleteCommentHandler() {
    deleteComment(comment.id);
  }

  function toggleReplies() {
    setIsRepliesVisible(!isRepliesVisible);
  }

  function openRepliesHandler() {
    setIsRepliesVisible(true);
  }

  function commentFormHandler() {
    if (!token) {
      localStorage.setItem("intendedDestination", `/posts/${postId}`);
      navigate("/account/login");
      return;
    }
    setCommentFormDisplayed(!commentFormDisplayed);
  }

  const nestedComments = (comment.replies || []).map((comment) => {
    return <Comment key={comment.id} comment={comment} type="child" />;
  });

  let replyText = "";

  if (comment.replies.length === 1) {
    replyText = "View 1 Reply";
  }

  if (comment.replies.length > 1) {
    replyText = `View ${comment.replies.length} Replies`;
  }

  if (isRepliesVisible) {
    replyText = "Hide Replies";
  }

  return (
    <div
      className={`${
        comment.depth === 0
          ? ""
          : "border-solid border-l-2 border-l-border ml-5 pl-5"
      }`}
    >
      <div className="bg-darkBackground rounded-md pb-2">
        <div className="flex my-1">
          <CommentVoting comment={comment} />
          <CommentInfo comment={comment} />
        </div>
        <div className="ml-12 flex gap-2">
          {comment.replies.length === 0 ? null : (
            <button
              onClick={toggleReplies}
              className={`${
                isRepliesVisible
                  ? "bg-primary text-textWhite hover:bg-primaryTint border-primary hover:border-primaryTint"
                  : "bg-darkBackground border-primary text-primary hover:border-primaryTint hover:text-primaryTint"
              } border-solid border-2 rounded-md px-1 py-0.5 text-xs active:scale-105 transition`}
            >
              {replyText}
            </button>
          )}

          <button
            onClick={commentFormHandler}
            className={`${
              commentFormDisplayed
                ? "bg-primary text-textWhite border-primary hover:bg-primaryTint hover:border-primaryTint"
                : "bg-darkBackground border-primary text-primary hover:border-primaryTint hover:text-primaryTint"
            } border-solid border-2 rounded-md px-1 py-0.5 text-xs active:scale-105 transition`}
          >
            Reply
          </button>
          {comment.owner_is_user ? (
            <button
              onClick={deleteCommentHandler}
              className="bg-darkBackground border-solid border-2 border-red-500 text-red-500 hover:border-red-400 hover:text-red-400 rounded-md px-1 py-0.5 text-xs active:scale-105 transition"
            >
              Delete
            </button>
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
