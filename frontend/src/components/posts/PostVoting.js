import React from "react";

import {
  useVoteMutation,
  useDeleteVoteMutation,
} from "../../store/rtk-query-apis/mainApi";

import { FaAngleUp, FaAngleDown } from "react-icons/fa";

function PostVoting(props) {
  const [addVote] = useVoteMutation();
  const [deleteVote] = useDeleteVoteMutation();

  function voteHandler(e) {
    const postId = parseInt(e.currentTarget.dataset.post);
    const voteDirection = parseInt(e.currentTarget.dataset.direction);
    const upvote = e.currentTarget.dataset.upvote;
    const postOwnedByCurrentUser = e.currentTarget.dataset.post_owner_is_user;
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

  return (
    <div className="flex flex-col items-center px-3">
      <button
        onClick={voteHandler}
        data-post_owner_is_user={props.post.owner_is_user}
        data-post={props.post.id}
        data-upvote={props.post.user_vote}
        data-direction={1}
        className="button"
      >
        <FaAngleUp
          className={`${
            props.post.user_vote === true ? "text-primary" : ""
          } text-4xl hover:text-primary hover:cursor-pointer`}
        />
      </button>
      <p className="text-2xl font-bold">{props.post.net_vote_count}</p>
      <button
        onClick={voteHandler}
        data-post_owner_is_user={props.post.owner_is_user}
        data-post={props.post.id}
        data-upvote={props.post.user_vote}
        data-direction={0}
      >
        <FaAngleDown
          className={`${
            props.post.user_vote === false ? "text-primary" : ""
          } text-4xl hover:text-primary hover:cursor-pointer`}
        />
      </button>
    </div>
  );
}

export default PostVoting;
