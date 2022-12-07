import React from "react";
import { useParams } from "react-router-dom";
import { useGetPostQuery } from "../../store/rtk-query-apis/mainApi";

function PostDetail() {
  const { postId } = useParams();
  const { data: post, isLoading } = useGetPostQuery(postId);

  console.log(post);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col">
      <div>
        <h2>Title: {post.Post.title}</h2>
        <p>Content: {post.Post.content}</p>
        {/* <p>Owner: {post.Post.owner.username}</p> */}
        <p>Votes: {post.upvotes - post.downvotes}</p>
      </div>
      <div>
        <button
          data-post={post.Post.id}
          data-user_voted={post.user_voted}
          data-upvote={post.upvote}
          data-direction={1}
          className="py-2 px-6 bg-green-400 text-2xl hover:bg-green-500 active:bg-green-600"
        >
          +
        </button>
        <button
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
          data-post={post.Post.id}
          className="mt-2 py-2 px-6 bg-red-400 text-2xl hover:bg-red-500 active:bg-red-600"
        >
          Delete
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}

export default PostDetail;
