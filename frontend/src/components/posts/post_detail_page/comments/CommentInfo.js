import React from "react";
import { useDeleteCommentMutation } from "../../../../store/rtk-query-apis/mainApi";

function CommentInfo(props) {
  const [deleteComment] = useDeleteCommentMutation();

  function deleteCommentHandler() {
    deleteComment(props.comment.id);
  }

  return (
    <React.Fragment>
      <div className="flex flex-col px-2 justify-between">
        <p className="text-sm mb-4">Posted by: {props.comment.owner}</p>
        <p>Comment: {props.comment.content}</p>
      </div>
      {props.comment.owner_is_user ? (
        <button
          onClick={deleteCommentHandler}
          className="bg-red-400 text-2xl hover:bg-red-500 active:bg-red-600"
        >
          Delete
        </button>
      ) : (
        <></>
      )}
    </React.Fragment>
  );
}

export default CommentInfo;
