import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetCommentsQuery } from "../../../store/rtk-query-apis/mainApi";

import CommentForm from "./comments/CommentForm";
import PostVoting from "../PostVoting";
import PostContent from "./PostContent";
import Comment from "./comments/Comment";
import DeletePost from "./DeletePost";
import Loading from "../../ui/Loading";

import { useGetPostQuery } from "../../../store/rtk-query-apis/mainApi";

import { useNavigate } from "react-router-dom";

import Container from "../../ui/Container";

import PrimaryButton from "../../ui/PrimaryButton";

function PostDetailPage() {
  const [commentFormDisplayed, setCommentFormDisplayed] = useState(false);
  const [updateFormOpen, setUpdateFormOpen] = useState(false);

  const { postId } = useParams();
  const { data: post, isLoading: postLoading } = useGetPostQuery(postId);
  const { data: comments, isLoading: commentsLoading } =
    useGetCommentsQuery(postId);

  const navigate = useNavigate();

  if (commentsLoading) {
    return <Loading />;
  }

  if (postLoading) {
    return <Loading />;
  }

  return (
    <Container>
      <div className="mb-1">
        <PrimaryButton
          clickHandler={() => {
            navigate("/posts");
          }}
        >
          {"Back"}
        </PrimaryButton>
      </div>
      <div className="flex flex-col gap-4 bg-lightBackground rounded-md">
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
            className="rounded-md px-1 hover:bg-primary hover:text-textWhite transition"
            onClick={() => setCommentFormDisplayed(!commentFormDisplayed)}
          >
            Comment
          </button>
          {post.owner_is_user ? (
            <React.Fragment>
              <button
                className="rounded-md px-1 hover:bg-primary hover:text-textWhite transition"
                onClick={() => setUpdateFormOpen(!updateFormOpen)}
                data-post={post.post_id}
              >
                Edit
              </button>
              <DeletePost post={post} />
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
    </Container>
  );
}

export default PostDetailPage;
