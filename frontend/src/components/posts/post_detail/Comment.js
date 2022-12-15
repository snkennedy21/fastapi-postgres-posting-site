import React from "react";

function Comment(props) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col px-2 justify-between">
        <p>Comment: {props.commentObj.Comment.content}</p>
        <p>Posted by: {props.commentObj.Comment.owner.username}</p>
        {props.commentObj.owned_by_current_user ? (
          <button className="bg-red-400 text-2xl hover:bg-red-500 active:bg-red-600">
            Delete
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Comment;
