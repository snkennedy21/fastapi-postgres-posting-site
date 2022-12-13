import React from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetCommentsQuery } from "../../../store/rtk-query-apis/mainApi";

import CommentForm from "./CommentForm";
import Comment from "./Comment";
import PostVoting from "../PostVoting";
import Postcontent from "./PostContent";

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
    <div className="flex flex-col justify-center items-center">
      <div className="p-10 flex flex-col gap-4 w-[900px]">
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
            <Comment key={commentObj.Comment.id} commentObj={commentObj} />
          );
        })}
      </div>
    </div>
  );
}

export default PostDetail;
