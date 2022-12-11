import React from "react";

import { useNavigate } from "react-router-dom";

import { FaCommentAlt } from "react-icons/fa";

function PostListItem(props) {
  const navigate = useNavigate();

  console.log(props.post);

  function viewPostDetailHandler(e) {
    const postId = parseInt(e.target.dataset.post);
    navigate(`/posts/${postId}`);
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-col px-2 justify-between">
        <p className="text-sm">Posted by: {props.post.owner_username}</p>
        <h2
          onClick={viewPostDetailHandler}
          data-post={props.post.post_id}
          className="text-3xl font-medium mb-10 hover:text-primary transition hover:cursor-pointer"
        >
          {props.post.title}
        </h2>
        <div className="flex items-center gap-1 text-sm absolute bottom-0">
          <FaCommentAlt /> 0 Comments
        </div>
      </div>
    </div>
  );
}

export default PostListItem;
