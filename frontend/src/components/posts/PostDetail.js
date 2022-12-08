import React from "react";
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  useGetPostQuery,
  useDeletePostMutation,
  useVoteMutation,
  useDeleteVoteMutation,
  useCreateCommentMutation,
  useGetCommentsQuery,
} from "../../store/rtk-query-apis/mainApi";

function PostDetail() {
  const [content, setContent] = useState("");
  const { postId } = useParams();
  const { data: post, isLoading: postLoading } = useGetPostQuery(postId);
  const [deletePost] = useDeletePostMutation();
  const [addVote] = useVoteMutation();
  const [deleteVote] = useDeleteVoteMutation();
  const [createComment] = useCreateCommentMutation();
  const { data: comments, isLoading: commentsLoading } =
    useGetCommentsQuery(postId);
  const navigate = useNavigate();

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

  function deletePostHandler(e) {
    const postId = parseInt(e.target.dataset.post);
    deletePost(postId);
    navigate("/posts");
  }

  function contentChangeHandler(e) {
    setContent(e.target.value);
  }

  function commentSubmitHandler(e) {
    e.preventDefault();
    const commentData = {
      post_id: post.Post.id,
      content: content,
    };
    createComment(commentData);
  }

  if (postLoading) {
    return <div>Loading...</div>;
  }

  if (commentsLoading) {
    return <div>Loading...</div>;
  }

  console.log(comments);

  return (
    <div className="flex flex-col justify-center items-center">
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
      <Link to="/posts">Posts</Link>
      <form
        onSubmit={commentSubmitHandler}
        className="bg-blue-100 flex flex-col gap-6 w-60 p-12"
      >
        <textarea
          onChange={contentChangeHandler}
          value={content}
          name="content"
          placeholder="Content"
        ></textarea>
        <button className="bg-green-400">Login</button>
      </form>
      {comments.map((commentObj) => {
        return (
          <div key={commentObj.Comment.id}>
            <p>Comment: {commentObj.Comment.content}</p>
            <p>Posted by: {commentObj.Comment.owner.username}</p>
            {commentObj.owned_by_current_user ? (
              <button className="bg-red-400 text-2xl hover:bg-red-500 active:bg-red-600">
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
}

export default PostDetail;
