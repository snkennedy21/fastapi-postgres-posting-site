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
    <div className="flex flex-col justify-center items-center">
      <div className="w-[1000px] mt-10 mb-5">
        <button className="bg-primary py-2 px-4 rounded-md">Posts</button>
      </div>
      <div className="flex flex-col gap-4 w-[1000px] bg-lightBackground rounded-md mx-2">
        <div className="flex">
          <PostVoting post={post} />
          <PostContent post={post} />
        </div>
        <div className="flex border-b-2 border-b-solid border-b-border mx-3"></div>
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
        <div className="m-5">
          {comments.map((comment) => {
            return <Comment key={comment.id} comment={comment} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default PostDetailPage;
