// React Imports
import React from "react";
import Container from "../../ui/Container";
import Post from "./Post";
import PrimaryButton from "../../ui/PrimaryButton";
import Loading from "../../ui/Loading";

import { useSelector } from "react-redux";

// RTK Query Imports
import { useGetAllPostsQuery } from "../../../store/rtk-query-apis/mainApi";

import { useNavigate } from "react-router-dom";

function PostsListPage() {
  const token = useSelector((state) => state.token).token;
  const navigate = useNavigate();
  const { data: posts, isLoading } = useGetAllPostsQuery();

  if (isLoading) {
    return <Loading />;
  }

  console.log(posts);

  return (
    <Container>
      <div className="text-textWhite">
        {token ? "Authenticated" : "Not Authenticated"}
      </div>
      <div>
        <PrimaryButton
          clickHandler={() => {
            navigate("/posts/create");
          }}
        >
          {"New Post"}
        </PrimaryButton>
      </div>
      {posts.map((post) => {
        return <Post key={post.id} post={post} />;
      })}
    </Container>
  );
}

export default PostsListPage;
