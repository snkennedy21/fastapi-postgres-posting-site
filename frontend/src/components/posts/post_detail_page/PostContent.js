import React from "react";

import { useNavigate } from "react-router-dom";

import { useDeletePostMutation } from "../../../store/rtk-query-apis/mainApi";

import DeletePost from "./DeletePost";

function PostContent(props) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col">
      <div className="flex flex-col px-2 justify-between">
        <p className="text-sm">Posted by: {props.post.owner_username}</p>
        <h2 data-post={props.post.post_id} className="text-3xl font-medium">
          {props.post.title}
        </h2>
        {props.post.current_user_is_owner ? (
          <DeletePost post={props.post} />
        ) : (
          <div className="mb-4"></div>
        )}
        <p>{props.post.content}</p>
      </div>
    </div>
  );
}

export default PostContent;
