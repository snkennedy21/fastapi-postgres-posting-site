// React Imports
import React from "react";
import PostListItem from "./PostListItem";
import PostVoting from "../PostVoting";

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
      <div className="flex justify-center">
        <div className="p-10 flex flex-col gap-4 w-[900px]">
          {posts.map((postObj) => {
            return (
              <div
                className="flex border-primary border-2 border-solid rounded-md overflow-hidden relative"
                key={postObj.Post.id}
              >
                <PostVoting postObj={postObj}></PostVoting>
                <PostListItem postObj={postObj} />
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return <div>Not Authenticated</div>;
  }
}

export default PostsList;
