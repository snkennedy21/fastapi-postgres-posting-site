import React from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetCommentsQuery } from "../../../store/rtk-query-apis/mainApi";

import CommentForm from "./comments/CommentForm";
import PostVoting from "../PostVoting";
import PostContent from "./PostContent";
import Comment from "./comments/Comment";
import Container from "../ui/Container";

import { useGetPostQuery } from "../../../store/rtk-query-apis/mainApi";

function PostDetailPage() {
  const { postId } = useParams();
  const { data: post, isLoading: postLoading } = useGetPostQuery(postId);
  const { data: comments, isLoading: commentsLoading } =
    useGetCommentsQuery(postId);
  const [commentFormDisplayed, setCommentFormDisplayed] = useState(false);

  if (commentsLoading) {
    return <div>Loading...</div>;
  }

  if (postLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <div className="flex border-primary border-2 border-solid rounded-md overflow-hidden relative">
        <PostVoting post={post} />
        <PostContent post={post} />
      </div>
      <div className="flex justify-end">
        <button
          onClick={() => setCommentFormDisplayed(true)}
          className="py-2 px-4 text-xl bg-primary rounded-md text-white hover:bg-blue-400 active:scale-105 transition-color"
        >
          Comment
        </button>
      </div>
      {commentFormDisplayed ? (
        <CommentForm setCommentFormDisplayed={setCommentFormDisplayed} />
      ) : (
        <React.Fragment></React.Fragment>
      )}
      {comments.map((commentObj) => {
        return <Comment key={commentObj.Comment.id} commentObj={commentObj} />;
      })}
    </Container>
  );
}

export default PostDetailPage;
