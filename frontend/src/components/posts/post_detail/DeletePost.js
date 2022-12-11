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
      onClick={deletePostHandler}
      data-post={props.post.post_id}
      className="border border-2 border-solid border-red-500 text-red-500 hover:bg-red-500 active:bg-red-600 hover:text-white w-16 py-1 px-2 rounded-md mb-4 transition"
    >
      Delete
    </button>
  );
}

export default DeletePost;
