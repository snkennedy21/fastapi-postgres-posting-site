import React from "react";

import { useNavigate } from "react-router-dom";

import { useDeletePostMutation } from "../../../store/rtk-query-apis/mainApi";

import DeletePost from "./DeletePost";

function PostContent(props) {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <div className="flex flex-col">
        <div className="flex flex-col px-2 justify-between">
          <p className="text-sm">
            Posted by: {props.postObj.Post.owner.username}
          </p>
          <h2
            data-post={props.postObj.Post.id}
            className="text-3xl font-medium"
          >
            {props.postObj.Post.title}
          </h2>
          {props.postObj.owner ? (
            <DeletePost postObj={props.postObj} />
          ) : (
            <div className="mb-4"></div>
          )}
          <p>{props.postObj.Post.content}</p>
        </div>
      </div>
    </React.Fragment>
  );
}

export default PostContent;
