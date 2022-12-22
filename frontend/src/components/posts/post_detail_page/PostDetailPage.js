import React from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetCommentsQuery } from "../../../store/rtk-query-apis/mainApi";

import CommentForm from "./comments/CommentForm";
import PostVoting from "../PostVoting";
import PostContent from "./PostContent";
import Comment from "./comments/Comment";
import DeletePost from "./DeletePost";

import { useGetPostQuery } from "../../../store/rtk-query-apis/mainApi";

function PostDetailPage() {
  const [commentFormDisplayed, setCommentFormDisplayed] = useState(false);
  const [updateFormOpen, setUpdateFormOpen] = useState(false);

  const { postId } = useParams();
  const { data: post, isLoading: postLoading } = useGetPostQuery(postId);
  const { data: comments, isLoading: commentsLoading } =
    useGetCommentsQuery(postId);

  if (commentsLoading) {
    return <div>Loading...</div>;
  }

  if (postLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center">
      <div className="p-10 flex flex-col gap-4 w-[1000px]">
        <div className="mb-1">
          <button className="bg-primary py-2 px-4 rounded-md">Posts</button>
        </div>
        <div className="flex flex-col gap-4 bg-lightBackground rounded-md mx-2">
          <div className="flex">
            <PostVoting post={post} />
            <PostContent
              post={post}
              updateFormOpen={updateFormOpen}
              setUpdateFormOpen={setUpdateFormOpen}
            />
          </div>
          <div className="flex gap-4 border-b-2 border-b-solid border-b-border m-3 pl-14">
            <button
              onClick={() => setCommentFormDisplayed(!commentFormDisplayed)}
            >
              Comment
            </button>
            {post.current_user_is_owner ? (
              <React.Fragment>
                <DeletePost post={post} />
                <button
                  onClick={() => setUpdateFormOpen(!updateFormOpen)}
                  data-post={post.post_id}
                >
                  Edit
                </button>
              </React.Fragment>
            ) : (
              <div className="mb-4"></div>
            )}
            {/* </div> */}
          </div>

          <div className="m-5">
            {commentFormDisplayed ? (
              <CommentForm
                setCommentFormDisplayed={setCommentFormDisplayed}
                marginLeft="0"
              />
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
