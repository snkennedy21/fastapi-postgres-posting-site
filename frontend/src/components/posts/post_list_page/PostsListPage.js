// React Imports
import React from "react";
import Container from "../../ui/Container";
import Post from "./Post";
import PrimaryButton from "../../ui/PrimaryButton";
import Loading from "../../ui/Loading";

// RTK Query Imports
import { useGetAllPostsQuery } from "../../../store/rtk-query-apis/mainApi";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PostsListPage() {
  const token = useSelector((state) => state.token).token;
  const navigate = useNavigate();
  const { data: posts, isLoading } = useGetAllPostsQuery();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container>
      <div>
        <PrimaryButton
          clickHandler={() => {
            if (!token) {
              localStorage.setItem("intendedDestination", "/posts/create");
              navigate("/account/login");
              return;
            }
            navigate("/posts/create");
          }}
        >
          {"New Post"}
        </PrimaryButton>
      </div>
      {posts.map((post, index) => {
        return <Post key={post.id} post={post} index={index} />;
      })}
    </Container>
  );
}

export default PostsListPage;
