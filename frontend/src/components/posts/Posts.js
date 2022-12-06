// React Imports
import React from "react";
import { useState, useEffect } from "react";

// Redux Imports
import { useDispatch, useSelector } from "react-redux";

// RTK Query Imports
import {
  useGetAllPostsQuery,
  useVoteMutation,
  useDeleteVoteMutation,
} from "../../store/rtk-query-apis/postsApi";

function Posts() {
  const token = useSelector((state) => state.token).token;
  const { data: data, isLoading } = useGetAllPostsQuery();
  const [addVote] = useVoteMutation();
  const [deleteVote] = useDeleteVoteMutation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  function voteHandler(e) {
    const postId = parseInt(e.target.dataset.post);
    const voteDirection = parseInt(e.target.dataset.direction);
    const userVoted = e.target.dataset.user_voted;
    const upvote = e.target.dataset.upvote;
    const voteData = {
      post_id: postId,
      direction: voteDirection,
    };
    const deleteVoteData = {
      post_id: postId,
    };

    if (upvote === undefined) {
      addVote(voteData);
    } else if (upvote === "true" && voteDirection === 0) {
      deleteVote(deleteVoteData);
    } else if (upvote === "false" && voteDirection === 1) {
      deleteVote(deleteVoteData);
    }
  }

  console.log(data);

  if (token) {
    return (
      <div className="mt-10 flex gap-12 justify-center items-center h-32 pt-10">
        {data.map((post) => {
          return (
            <div key={post.Post.id} className="flex flex-col">
              <div>
                <h2>Title: {post.Post.title}</h2>
                <p>Content: {post.Post.content}</p>
                {/* <p>Owner: {post.Post.owner.username}</p> */}
                <p>Votes: {post.upvotes - post.downvotes}</p>
              </div>
              <div>
                <button
                  onClick={voteHandler}
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
                <button className="mt-2 py-2 px-6 bg-red-400 text-2xl hover:bg-red-500 active:bg-red-600">
                  Delete
                </button>
              ) : (
                <></>
              )}
            </div>
          );
        })}
      </div>
    );
  } else {
    return <div>Not Authenticated</div>;
  }
}

export default Posts;
