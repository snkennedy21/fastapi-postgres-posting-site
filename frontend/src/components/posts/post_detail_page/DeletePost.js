import React from "react";
import { useNavigate } from "react-router-dom";

import { useDeletePostMutation } from "../../../store/rtk-query-apis/mainApi";

function DeletePost(props) {
  const [deletePost] = useDeletePostMutation();
  const navigate = useNavigate();

  function deletePostHandler(e) {
    const postId = parseInt(e.target.dataset.post);
    deletePost(postId);
    navigate("/posts");
  }

  return (
    <button
      className="rounded-md px-1 hover:bg-red-500 hover:text-textWhite transition"
      onClick={deletePostHandler}
      data-post={props.post.id}
    >
      Delete
    </button>
  );
}

export default DeletePost;
