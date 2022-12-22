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
    <div className="flex justify-center">
      <div className="p-10 flex flex-col gap-4 w-[1000px]">
        <div className="mt-5 mb-5">
          <button className="bg-primary py-2 px-4 rounded-md">Posts</button>
        </div>
        <div className="flex flex-col gap-4 bg-lightBackground rounded-md mx-2">
          <div className="flex">
            <PostVoting post={post} />
            <PostContent post={post} />
          </div>
          <div className="flex gap-4 border-b-2 border-b-solid border-b-border mx-3">
            <button
              onClick={() => setCommentFormDisplayed(!commentFormDisplayed)}
            >
              Comment
            </button>
            <p>Edit</p>
            <p>Delete</p>
          </div>

          <div className="m-5">
            {commentFormDisplayed ? (
              <CommentForm setCommentFormDisplayed={setCommentFormDisplayed} />
            ) : (
              <React.Fragment></React.Fragment>
            )}

            {comments.map((comment) => {
              return <Comment key={comment.id} comment={comment} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostDetailPage;
