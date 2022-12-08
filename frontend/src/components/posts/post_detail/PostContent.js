import React from "react";

import { useNavigate } from "react-router-dom";

import { useParams } from "react-router-dom";

import {
  useDeletePostMutation,
  useVoteMutation,
  useDeleteVoteMutation,
  useGetPostQuery,
} from "../../../store/rtk-query-apis/mainApi";

function PostContent() {
  const { postId } = useParams();
  const [addVote] = useVoteMutation();
  const [deleteVote] = useDeleteVoteMutation();
  const [deletePost] = useDeletePostMutation();
  const { data: post, isLoading: postLoading } = useGetPostQuery(postId);
  const navigate = useNavigate();

  function deletePostHandler(e) {
    const postId = parseInt(e.target.dataset.post);
    deletePost(postId);
    navigate("/posts");
  }

  function voteHandler(e) {
    const postId = parseInt(e.target.dataset.post);
    const voteDirection = parseInt(e.target.dataset.direction);
    const upvote = e.target.dataset.upvote;
    const postOwnedByCurrentUser = e.target.dataset.post_owned_by_current_user;
    const voteData = {
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
      addVote(voteData);
    } else if (upvote === "true" && voteDirection === 0) {
      deleteVote(deleteVoteData);
    } else if (upvote === "false" && voteDirection === 1) {
      deleteVote(deleteVoteData);
    }
  }

  if (postLoading) {
    return <div>Loading...</div>;
  }

  return (
    <React.Fragment>
      {" "}
      <div>
        <h2>Title: {post.Post.title}</h2>
        <p>Content: {post.Post.content}</p>
        <p>Owner: {post.Post.owner.username}</p>
        <p>Votes: {post.upvotes - post.downvotes}</p>
      </div>
      <div>
        <button
          onClick={voteHandler}
          data-post_owned_by_current_user={post.owner}
          data-post={post.Post.id}
          data-user_voted={post.user_voted}
          data-upvote={post.upvote}
          data-direction={1}
          className="py-2 px-6 bg-green-400 text-2xl hover:bg-green-500 active:bg-green-600"
        >
          +
        </button>
        <button
          onClick={voteHandler}
          data-post_owned_by_current_user={post.owner}
          data-post={post.Post.id}
          data-user_voted={post.user_voted}
          data-upvote={post.upvote}
          data-direction={0}
          className="py-2 px-6 bg-red-400 text-2xl hover:bg-red-500 active:bg-red-600"
        >
          -
        </button>
      </div>
      {post.owner ? (
        <button
          onClick={deletePostHandler}
          data-post={post.Post.id}
          className="mt-2 py-2 px-6 bg-red-400 text-2xl hover:bg-red-500 active:bg-red-600"
        >
          Delete
        </button>
      ) : (
        <></>
      )}
    </React.Fragment>
  );
}

export default PostContent;
