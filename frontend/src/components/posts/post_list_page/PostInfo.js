import React from "react";

import { useNavigate } from "react-router-dom";

import { FaCommentAlt, FaThumbsUp } from "react-icons/fa";

function PostInfo(props) {
  const navigate = useNavigate();

  function viewPostDetailHandler(e) {
    const postId = parseInt(e.target.dataset.post);
    navigate(`/posts/${postId}`);
  }

  console.log(props.post);

  return (
    <div className="flex flex-col w-full">
      <div className="border-b-solid border-b-2 border-b-border">
        {/* <div className="flex flex-col px-2 justify-between"> */}
        <div className="flex justify-between">
          <p className="text-sm text-primary">{props.post.owner_username}</p>
          <p className="text-textGrey">Time</p>
        </div>
        <h2
          onClick={viewPostDetailHandler}
          data-post={props.post.post_id}
          className="text-3xl text-textWhite font-medium mb-10 hover:text-primary transition hover:cursor-pointer"
        >
          {props.post.title}
        </h2>
      </div>
      <div className="flex flex-col gap-1 text-sm text-textGrey pt-3">
        <div className="flex items-center gap-1 text-sm">
          <FaThumbsUp /> {props.post.num_upvotes - props.post.num_downvotes}{" "}
          votes
        </div>
        <div className="flex items-center gap-1 text-sm">
          <FaCommentAlt /> {props.post.num_comments} Comments
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}

export default PostInfo;
