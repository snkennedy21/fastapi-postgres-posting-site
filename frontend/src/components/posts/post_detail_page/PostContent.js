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
            <p className="text-lg text-primary">{props.post.owner_username}</p>
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
            <h2
              data-post={props.post.post_id}
              className="text-3xl text-textWhite font-medium mb-4"
            >
              {props.post.title}
            </h2>
            <p className="text-2xl text-textGrey">{props.post.content}</p>
          </React.Fragment>
        )}
        <div className="flex gap-2">
          {props.post.current_user_is_owner ? (
            <React.Fragment>
              <DeletePost post={props.post} />
              <button
                onClick={openUpdateFormHandler}
                data-post={props.post.post_id}
              >
                Edit
              </button>
            </React.Fragment>
          ) : (
            <div className="mb-4"></div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PostContent;
