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
      <div className="flex flex-col items-center m-10">
        <form
          onSubmit={submitPostHandler}
          className="px-0 md:px-10 py-7 w-full max-w-[900px]"
        >
          <div className="mb-3 flex flex-col md:flex-row md:justify-between md:gap-2">
            <input
              onChange={titleChangeHandler}
              className="w-full p-2 text-2xl rounded-md border-black border-2 focus:border-primary outline-none transition duration-300"
              type="text"
              placeholder="Title"
            ></input>
          </div>
          <div className="flex flex-col mb-3">
            <textarea
              onChange={contentChangeHandler}
              className="w-full p-2 text-2xl rounded-md border-black border-2 focus:border-primary outline-none transition duration-300"
              rows="10"
              placeholder="Content"
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button className="py-2 px-4 text-xl bg-primary rounded-md text-white hover:bg-blue-400 active:scale-105 transition-color">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  } else {
    return <div>You are trying to access an unauthenticated route</div>;
  }
}

export default CreatePost;
