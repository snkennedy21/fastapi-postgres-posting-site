import React from "react";
import { useState } from "react";
import { useCreatePostMutation } from "../../store/rtk-query-apis/mainApi";
import { useSelector } from "react-redux";

function CreatePost() {
  const token = useSelector((state) => state.token).token;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [createPost] = useCreatePostMutation();

  function submitPostHandler(e) {
    e.preventDefault();
    const data = {
      title: title,
      content: content,
    };
    createPost(data);
  }

  function titleChangeHandler(e) {
    setTitle(e.target.value);
  }

  function contentChangeHandler(e) {
    setContent(e.target.value);
  }

  if (token) {
    return (
      <div className="flex flex-col justify-center items-center py-28">
        <form
          onSubmit={submitPostHandler}
          className="bg-blue-100 flex flex-col gap-6 w-60 p-12"
        >
          <input
            onChange={titleChangeHandler}
            value={title}
            name="title"
            placeholder="Title"
          ></input>
          <textarea
            onChange={contentChangeHandler}
            value={content}
            name="content"
            placeholder="Content"
          ></textarea>
          <button className="bg-green-400">Post</button>
        </form>
      </div>
    );
  } else {
    return <div>You are trying to access an unauthenticated route</div>;
  }
}

export default CreatePost;
