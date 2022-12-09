import React from "react";

import { useNavigate } from "react-router-dom";

import {
  useVoteMutation,
  useDeleteVoteMutation,
} from "../../../store/rtk-query-apis/mainApi";

import { FaAngleUp, FaAngleDown } from "react-icons/fa";

function PostListItem(props) {
  const [addVote] = useVoteMutation();
  const [deleteVote] = useDeleteVoteMutation();
  const navigate = useNavigate();

  function voteHandler(e) {
    const postId = parseInt(e.currentTarget.dataset.post);
    const voteDirection = parseInt(e.currentTarget.dataset.direction);
    const upvote = e.currentTarget.dataset.upvote;
    const postOwnedByCurrentUser =
      e.currentTarget.dataset.post_owned_by_current_user;
    const addVoteData = {
      post_id: postId,
      direction: voteDirection,
    };
    const deleteVoteData = {
      post_id: postId,
    };

    if (postOwnedByCurrentUser === "true") {
      alert("Cannot Vote on Your Own Post");
      return;
    }

    if (upvote === undefined) {
      addVote(addVoteData);
    } else if (upvote === "true" && voteDirection === 0) {
      deleteVote(deleteVoteData);
    } else if (upvote === "false" && voteDirection === 1) {
      deleteVote(deleteVoteData);
    }
  }

  function viewPostDetailHandler(e) {
    const postId = parseInt(e.target.dataset.post);
    navigate(`/posts/${postId}`);
  }

  return (
    <div className="flex flex-col">
      <div className="flex gap-4">
        <div className="flex flex-col justify-center items-center bg-orange-400">
          <button
            onClick={voteHandler}
            data-post_owned_by_current_user={props.postObj.owner}
            data-post={props.postObj.Post.id}
            data-user_voted={props.postObj.user_voted}
            data-upvote={props.postObj.upvote}
            data-direction={1}
            className="button"
          >
            <FaAngleUp
              className={`${
                props.postObj.upvote === true ? "text-primary" : ""
              } text-4xl hover:text-primary hover:cursor-pointer`}
            />
          </button>
          <p className="text-2xl font-bold">
            {props.postObj.upvotes - props.postObj.downvotes}
          </p>
          <button
            onClick={voteHandler}
            data-post_owned_by_current_user={props.postObj.owner}
            data-post={props.postObj.Post.id}
            data-user_voted={props.postObj.user_voted}
            data-upvote={props.postObj.upvote}
            data-direction={0}
          >
            <FaAngleDown
              className={`${
                props.postObj.upvote === false ? "text-primary" : ""
              } text-4xl hover:text-primary hover:cursor-pointer`}
            />
          </button>
        </div>
        <div className="flex flex-col justify-between bg-green-500">
          <h2
            onClick={viewPostDetailHandler}
            data-post={props.postObj.Post.id}
            className="text-3xl font-medium"
          >
            {props.postObj.Post.title}
          </h2>
          {/* <p>Content: {props.postObj.Post.content}</p> */}

          <div className="flex gap-3">
            <p>Posted by: {props.postObj.Post.owner.username}</p>
            <p>Comments: 0</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostListItem;
