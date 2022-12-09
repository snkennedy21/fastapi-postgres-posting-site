// React Imports
import React from "react";
import PostListItem from "./PostListItem";

// Redux Imports
import { useSelector } from "react-redux";

// RTK Query Imports
import { useGetAllPostsQuery } from "../../../store/rtk-query-apis/mainApi";

function Posts() {
  const token = useSelector((state) => state.token).token;
  const { data: posts, isLoading } = useGetAllPostsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log(posts);

  if (token) {
    return (
      <div className="flex justify-center">
        <div className="mt-10 flex flex-col">
          {posts.map((postObj) => {
            return <PostListItem key={postObj.Post.id} postObj={postObj} />;
          })}
        </div>
      </div>
    );
  } else {
    return <div>Not Authenticated</div>;
  }
}

export default Posts;
