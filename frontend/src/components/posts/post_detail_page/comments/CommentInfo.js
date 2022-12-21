import React from "react";

function CommentInfo(props) {
  return (
    <React.Fragment>
      <div className="px-2">
        <p className="text-lg text-primary mb-3">{props.comment.owner}</p>
        <p className="text-xl">{props.comment.content}</p>
      </div>
    </React.Fragment>
  );
}

export default CommentInfo;
