import CommentVoting from "./CommentVoting";
import CommentInfo from "./CommentInfo";
import React from "react";

function Comment({ comment }) {
  const nestedComments = (comment.replies || []).map((comment) => {
    return <Comment key={comment.id} comment={comment} type="child" />;
  });

  console.log(comment.depth);
  return (
    <div className="ml-5">
      <div
        className={`my-2 flex border-primary border-2 border-solid rounded-md overflow-hidden relative bg-white`}
      >
        {/* <div>{comment.content}</div> */}
        <CommentVoting />
        <CommentInfo comment={comment} />
      </div>
      {nestedComments}
    </div>
  );
}

export default Comment;
