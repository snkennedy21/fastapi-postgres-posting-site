import React from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetCommentsQuery } from "../../../store/rtk-query-apis/mainApi";

import CommentForm from "./CommentForm";
import Comment from "./Comment";
import PostVoting from "../PostVoting";
import Postcontent from "./PostContent";
import CommentVoting from "./CommentVoting";
import Container from "../ui/Container";

import { useGetPostQuery } from "../../../store/rtk-query-apis/mainApi";

function PostDetail() {
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
        <Postcontent post={post} />
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
        <></>
      )}
      {comments.map((commentObj) => {
        return (
          <div
            className="flex border-primary border-2 border-solid rounded-md overflow-hidden relative bg-white"
            key={commentObj.Comment.id}
          >
            <CommentVoting />
            <Comment key={commentObj.Comment.id} commentObj={commentObj} />
          </div>
        );
      })}
    </Container>
  );
}

export default PostDetail;
