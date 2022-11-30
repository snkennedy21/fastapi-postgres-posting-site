import React from "react";
// import { useGetAllPostsQuery } from "../../store/rtk-query-apis/postsApi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function Posts() {
  // const { data } = useGetAllPostsQuery();
  const dispatch = useDispatch();
  const tokenValue = useSelector((state) => state.token.tokenValue);

  async function getPosts() {
    const url = "http://localhost:8000/posts";
    console.log(tokenValue);
    const fetchConfig = {
      headers: {
        Authorization: `Bearer ${tokenValue}`,
      },
    };
    const response = await fetch(url, fetchConfig);
    const posts = await response.json();
    console.log(posts);
  }

  useEffect(() => {
    getPosts();
  }, [tokenValue]);

  return <div className="flex justify-center items-center h-32">Posts</div>;
}

export default Posts;
