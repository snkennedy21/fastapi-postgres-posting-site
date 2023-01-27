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
      className="bg-lightBackground border-solid border-2 border-red-500 text-red-500 hover:border-red-400 hover:text-red-400 rounded-md px-1 py-0.5 text-xs active:scale-105 transition"
      onClick={deletePostHandler}
      data-post={props.post.id}
    >
      Delete
    </button>
  );
}

export default DeletePost;
