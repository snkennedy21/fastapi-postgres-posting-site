import React from "react";
// import { useGetAllPostsQuery } from "../../store/rtk-query-apis/postsApi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function Posts() {
  const token = useSelector((state) => state.token).token;
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);
  const tokenValue = useSelector((state) => state.token.tokenValue);

  async function getPosts() {
    const url = "https://fastapi-postgres-snkennedy21.herokuapp.com/posts";
    const fetchConfig = {
      credentials: "include",
    };
    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      const postData = await response.json();
      setPosts(postData);
    }
  }

  useEffect(() => {
    getPosts();
  }, [tokenValue]);

  console.log(posts);

  if (token) {
    return (
      <div className="flex justify-center items-center h-32">
        {posts.map((post) => {
          return <p>{post.Post.title}</p>;
        })}
      </div>
    );
  } else {
    return <div>Not Authenticated</div>;
  }
}

export default Posts;
