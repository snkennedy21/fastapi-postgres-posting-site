import React from "react";
import { useParams } from "react-router-dom";
import { useGetPostQuery } from "../../store/rtk-query-apis/mainApi";

function PostDetail() {
  const { postId } = useParams();
  const { data } = useGetPostQuery(postId);

  console.log(postId);

  return <div>Hello</div>;
}

export default PostDetail;
