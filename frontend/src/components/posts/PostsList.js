// React Imports
import React from "react";
import { useState, useEffect } from "react";
import Post from "./Post";

// Redux Imports
import { useSelector } from "react-redux";

// RTK Query Imports
import { useGetAllPostsQuery } from "../../store/rtk-query-apis/mainApi";

function Posts() {
  const token = useSelector((state) => state.token).token;
  const { data: posts, isLoading } = useGetAllPostsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log(posts);

  if (token) {
    return (
      <div className="mt-10 flex gap-12 justify-center items-center h-32 pt-10">
        {posts.map((postObj) => {
          return <Post key={postObj.Post.id} postObj={postObj} />;
        })}
      </div>
    );
  } else {
    return <div>Not Authenticated</div>;
  }
}

export default Posts;
