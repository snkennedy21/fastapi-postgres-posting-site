import React from "react";
import { useState, useEffect } from "react";
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
import { useSelector } from "react-redux";

function PostDetailPage() {
  const [commentFormDisplayed, setCommentFormDisplayed] = useState(false);
  const [updateFormOpen, setUpdateFormOpen] = useState(false);
  const { postId } = useParams();
  const { data: post, isLoading: postLoading } = useGetPostQuery(postId);
  const { data: comments, isLoading: commentsLoading } =
    useGetCommentsQuery(postId);
  const [postLoaded, setPostLoaded] = useState(false);
  const token = useSelector((state) => state.token).token;

  const navigate = useNavigate();

  function commentFormHandler() {
    if (!token) {
      localStorage.setItem("intendedDestination", `/posts/${postId}`);
      navigate("/account/login");
      return;
    }
    setCommentFormDisplayed(!commentFormDisplayed);
  }

  useEffect(() => {
    localStorage.setItem("intendedDestination", "/");
    setPostLoaded(true);
  }, []);

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
          {"View Posts"}
        </PrimaryButton>
      </div>
      <div
        className={`${
          postLoaded ? "opacity-1" : "translate-y-20 opacity-0"
        } flex flex-col gap-4 bg-lightBackground rounded-md transition duration-500`}
      >
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
            className={`${
              commentFormDisplayed
                ? "bg-primary text-textWhite hover:bg-primaryTint border-primary hover:border-primaryTint"
                : "bg-lightBackground border-primary text-primary hover:border-primaryTint hover:text-primaryTint"
            } border-solid border-2  rounded-md px-1 py-0.5 text-xs active:scale-105 transition`}
            onClick={commentFormHandler}
          >
            {commentFormDisplayed ? "Cancel" : "Comment"}
          </button>
          {post.owner_is_user ? (
            <React.Fragment>
              <button
                className={`${
                  updateFormOpen
                    ? "bg-primary text-textWhite hover:bg-primaryTint"
                    : "bg-lightBackground border-solid border-2 border-primary text-primary hover:border-primaryTint hover:text-primaryTint"
                } rounded-md px-4 py-0.5 text-xs active:scale-105 transition`}
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
            return (
              <Comment key={comment.id} comment={comment} postId={postId} />
            );
          })}
        </div>
      </div>
    </Container>
  );
}

export default PostDetailPage;
