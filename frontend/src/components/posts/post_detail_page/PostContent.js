import React from "react";
import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useDeletePostMutation } from "../../../store/rtk-query-apis/mainApi";

import DeletePost from "./DeletePost";
import UpdatePostForm from "./UpdatePostForm";

function PostContent(props) {
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col px-2">
        <div>
          <div className="flex justify-between">
            <p className="text-lg text-primary">{props.post.owner_username}</p>
            <p className="text-textGrey">Time</p>
          </div>
        </div>
        {props.updateFormOpen ? (
          <UpdatePostForm
            title={props.post.title}
            content={props.post.content}
            id={props.post.id}
            setUpdateFormOpen={props.setUpdateFormOpen}
          />
        ) : (
          <React.Fragment>
            <h2
              data-post={props.post.post_id}
              className="text-3xl text-textWhite font-medium mb-4"
            >
              {props.post.title}
            </h2>
            <p className="text-2xl text-textGrey">{props.post.content}</p>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

export default PostContent;
