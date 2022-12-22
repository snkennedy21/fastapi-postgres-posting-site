import React from "react";

function CommentInfo(props) {
  return (
    <React.Fragment>
      <div className="px-2 w-full">
        <div className="flex justify-between">
          <p className="text-lg text-primary mb-3">{props.comment.owner}</p>
          <p className="text-textGrey">Time</p>
        </div>
        <p className="text-xl text-textGrey">{props.comment.content}</p>
      </div>
    </React.Fragment>
  );
}

export default CommentInfo;
