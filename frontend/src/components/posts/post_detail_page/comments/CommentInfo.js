import React from "react";

function CommentInfo(props) {
  return (
    <React.Fragment>
      <div className="px-2 w-full">
        <div className="flex flex-col sm:flex-row justify-between">
          <div className="flex gap-2 items-center my-1">
            <img
              className="rounded-full w-6 h-6"
              alt={`${props.comment.owner.username}`}
              src={props.comment.owner.photo_url}
            />
            <p className="text-lg text-primary">
              {props.comment.owner.username}
            </p>
          </div>
          <p className="text-textGrey">Time</p>
        </div>
        <p className="text-xl text-textGrey">{props.comment.content}</p>
      </div>
    </React.Fragment>
  );
}

export default CommentInfo;
