// React Imports
import React from "react";
import { useState } from "react";

// Redux Imports
import { useDispatch, useSelector } from "react-redux";

// RTK Query Imports
import { useGetAllPostsQuery } from "../../store/rtk-query-apis/postsApi";

function Posts() {
  const token = useSelector((state) => state.token).token;
  const { data: posts, isLoading } = useGetAllPostsQuery();

  console.log(posts);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (token) {
    return (
      <div className="flex justify-center items-center h-32">
        {posts.map((post) => {
          return (
            <React.Fragment key={post.Post.id}>
              <div>
                <h2>Title: {post.Post.title}</h2>
                <p>Content: {post.Post.content}</p>
                <p>Owner: {post.Post.owner.email}</p>
                <p>Votes: {post.votes}</p>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    );
  } else {
    return <div>Not Authenticated</div>;
  }
}

export default Posts;
