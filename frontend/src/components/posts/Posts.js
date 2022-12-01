import React from "react";
// import { useGetAllPostsQuery } from "../../store/rtk-query-apis/postsApi";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetAllPostsQuery } from "../../store/rtk-query-apis/postsApi";

function Posts() {
  const token = useSelector((state) => state.token).token;
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);
  const tokenValue = useSelector((state) => state.token.tokenValue);
  const { data, isLoading } = useGetAllPostsQuery();

  console.log(isLoading);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (token) {
    return (
      <div className="flex justify-center items-center h-32">
        {data.map((post) => {
          return <p key={post.Post.id}>{post.Post.title}</p>;
        })}
      </div>
    );
  } else {
    return <div>Not Authenticated</div>;
  }
}

export default Posts;
