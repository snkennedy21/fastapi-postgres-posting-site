import React from "react";

import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { FaCommentAlt, FaThumbsUp } from "react-icons/fa";

import profile from "../../../images/profile.jpg";

function PostInfo(props) {
  const navigate = useNavigate();
  const [image, setImage] = useState(profile);

  function viewPostDetailHandler(e) {
    const postId = parseInt(e.target.dataset.post);
    navigate(`/posts/${postId}`);
  }

  return (
    <div className="flex flex-col w-full">
      <div className="border-b-solid border-b-2 border-b-border">
        <div className="flex justify-between">
          <div className="flex gap-2 items-center mb-2">
            <img
              className="rounded-full w-6 h-6"
              src={props.post.owner.photo_url}
            />

            <p className="text-sm text-primary">{props.post.owner.username}</p>
          </div>

          <p className="text-textGrey">Time</p>
        </div>
        <h2
          onClick={viewPostDetailHandler}
          data-post={props.post.id}
          className="text-3xl text-textWhite font-medium mb-10 hover:text-primary transition hover:cursor-pointer"
        >
          {props.post.title}
        </h2>
      </div>
      <div className="flex flex-col gap-1 text-sm text-textGrey pt-3">
        <div className="flex items-center gap-1 text-sm">
          <FaThumbsUp /> {props.post.net_vote_count} votes
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
