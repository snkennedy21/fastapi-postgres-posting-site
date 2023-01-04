// React Imports
import React from "react";
import PostListItem from "./PostInfo";
import PostVoting from "../PostVoting";
import Container from "../ui/Container";
import Post from "./Post";

// Redux Imports
import { useSelector } from "react-redux";

// RTK Query Imports
import { useGetAllPostsQuery } from "../../../store/rtk-query-apis/mainApi";

function PostsListPage() {
  const token = useSelector((state) => state.token).token;
  const { data: posts, isLoading } = useGetAllPostsQuery();

  console.log(posts);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (token) {
    return (
      <Container>
        <button className="bg-primary self-end py-2 px-4 rounded-md">
          Create Post
        </button>
        {posts.map((post) => {
          return <Post key={post.id} post={post} />;
        })}
      </Container>
    );
  } else {
    return (
      <div className="flex justify-center items-center h-32 text-3xl">
        Not Authenticated to View Posts
      </div>
    );
  }
}

export default PostsListPage;
