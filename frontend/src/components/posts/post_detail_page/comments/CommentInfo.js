import React from "react";
import { useDeleteCommentMutation } from "../../../../store/rtk-query-apis/mainApi";

function CommentInfo(props) {
  const [deleteComment] = useDeleteCommentMutation();

  function deleteCommentHandler() {
    deleteComment(props.comment.id);
  }

  return (
    <React.Fragment>
      <div className="px-2">
        <p className="text-lg text-primary">{props.comment.owner}</p>
        <p className="text-lg">{props.comment.content}</p>
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
