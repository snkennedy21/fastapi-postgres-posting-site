import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGetCommentsQuery } from "../../../store/rtk-query-apis/mainApi";

import PostContent from "./PostContent";
import CommentForm from "./CommentForm";
import Comment from "./Comment";

function PostDetail() {
  const { postId } = useParams();
  const { data: comments, isLoading: commentsLoading } =
    useGetCommentsQuery(postId);

  if (commentsLoading) {
    return <div>Loading...</div>;
  }

  console.log(comments);

  return (
    <div className="flex flex-col justify-center items-center">
      <PostContent />
      <Link to="/posts">Posts</Link>
      <CommentForm />
      {comments.map((commentObj) => {
        return <Comment commentObj={commentObj} />;
      })}
    </div>
  );
}

export default PostDetail;
