import React from "react";
import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useDeletePostMutation } from "../../../store/rtk-query-apis/mainApi";

import DeletePost from "./DeletePost";
import UpdatePostForm from "./UpdatePostForm";

function PostContent(props) {
  const [updateFormOpen, setUpdateFormOpen] = useState(false);

  const navigate = useNavigate();

  function openUpdateFormHandler() {
    setUpdateFormOpen(!updateFormOpen);
  }

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col px-2">
        <div>
          <div className="flex justify-between">
            <p className="text-sm text-primary">{props.post.owner_username}</p>
            <p className="text-textGrey">Time</p>
          </div>
        </div>
        {updateFormOpen ? (
          <UpdatePostForm
            title={props.post.title}
            content={props.post.content}
            id={props.post.post_id}
            setUpdateFormOpen={setUpdateFormOpen}
          />
        ) : (
          <React.Fragment>
            <h2 data-post={props.post.post_id} className="text-3xl font-medium">
              {props.post.title}
            </h2>
            <p>{props.post.content}</p>
          </React.Fragment>
        )}
        {props.post.current_user_is_owner ? (
          <div className="flex gap-2">
            <DeletePost post={props.post} />
            <button
              onClick={openUpdateFormHandler}
              data-post={props.post.post_id}
              className="border border-2 border-solid border-purple-500 text-purple-500 hover:bg-purple-500 active:bg-purple-600 hover:text-white w-16 py-1 px-2 rounded-md transition"
            >
              Edit
            </button>
          </div>
        ) : (
          <div className="mb-4"></div>
        )}
      </div>
    </div>
  );
}

export default PostContent;
