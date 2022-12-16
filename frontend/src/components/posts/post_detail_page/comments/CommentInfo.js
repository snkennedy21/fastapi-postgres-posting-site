import React from "react";

function CommentInfo(props) {
  return (
    <React.Fragment>
      <div className="flex flex-col px-2 justify-between">
        <p className="text-sm mb-4">
          Posted by: {props.commentObj.Comment.owner.username}
        </p>
        <p>Comment: {props.commentObj.Comment.content}</p>
      </div>
      {props.commentObj.owned_by_current_user ? (
        <button className="bg-red-400 text-2xl hover:bg-red-500 active:bg-red-600">
          Delete
        </button>
      ) : (
        <></>
      )}
    </React.Fragment>
  );
}

export default CommentInfo;