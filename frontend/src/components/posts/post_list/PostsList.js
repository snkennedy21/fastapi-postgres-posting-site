// React Imports
import React from "react";
import PostListItem from "./PostListItem";
import PostVoting from "../PostVoting";
import Container from "../ui/Container";

// Redux Imports
import { useSelector } from "react-redux";

// RTK Query Imports
import { useGetAllPostsQuery } from "../../../store/rtk-query-apis/mainApi";

function PostsList() {
  const token = useSelector((state) => state.token).token;
  const { data: posts, isLoading } = useGetAllPostsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log(posts);

  if (token) {
    return (
      <Container>
        {posts.map((post) => {
          return (
            <div
              className="flex border-primary border-2 border-solid rounded-md overflow-hidden relative bg-white"
              key={post.post_id}
            >
              <PostVoting post={post}></PostVoting>
              <PostListItem post={post} />
            </div>
          );
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

export default PostsList;
