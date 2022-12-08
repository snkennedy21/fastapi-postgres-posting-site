import React from "react";

import { useNavigate } from "react-router-dom";

import {
  useVoteMutation,
  useDeleteVoteMutation,
} from "../../../store/rtk-query-apis/mainApi";

function PostListItem(props) {
  const [addVote] = useVoteMutation();
  const [deleteVote] = useDeleteVoteMutation();
  const navigate = useNavigate();

  function voteHandler(e) {
    const postId = parseInt(e.target.dataset.post);
    const voteDirection = parseInt(e.target.dataset.direction);
    const upvote = e.target.dataset.upvote;
    const postOwnedByCurrentUser = e.target.dataset.post_owned_by_current_user;
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
      <div>
        <h2>Title: {props.postObj.Post.title}</h2>
        <p>Content: {props.postObj.Post.content}</p>
        <p>Owner: {props.postObj.Post.owner.username}</p>
        <p>Votes: {props.postObj.upvotes - props.postObj.downvotes}</p>
      </div>
      <div>
        <button
          onClick={voteHandler}
          data-post_owned_by_current_user={props.postObj.owner}
          data-post={props.postObj.Post.id}
          data-user_voted={props.postObj.user_voted}
          data-upvote={props.postObj.upvote}
          data-direction={1}
          className="py-2 px-6 bg-green-400 text-2xl hover:bg-green-500 active:bg-green-600"
        >
          +
        </button>
        <button
          onClick={voteHandler}
          data-post_owned_by_current_user={props.postObj.owner}
          data-post={props.postObj.Post.id}
          data-user_voted={props.postObj.user_voted}
          data-upvote={props.postObj.upvote}
          data-direction={0}
          className="py-2 px-6 bg-red-400 text-2xl hover:bg-red-500 active:bg-red-600"
        >
          -
        </button>
      </div>
      <button
        onClick={viewPostDetailHandler}
        data-post={props.postObj.Post.id}
        className="mt-2 py-2 px-6 bg-yellow-400 text-2xl hover:bg-yellow-500 active:bg-yellow-600"
      >
        View Details
      </button>
    </div>
  );
}

export default PostListItem;
