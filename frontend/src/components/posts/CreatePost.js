import React from "react";
import { useState } from "react";
import { useCreatePostMutation } from "../../store/rtk-query-apis/mainApi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import adjustTextareaHeight from "../../functions/adjustTextareaHeight";

function CreatePost() {
  const token = useSelector((state) => state.token).token;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [createPost] = useCreatePostMutation();
  const navigate = useNavigate();

  function submitPostHandler(e) {
    e.preventDefault();
    const data = {
      title: title,
      content: content,
    };
    createPost(data);
    navigate("/posts");
  }

  function titleChangeHandler(e) {
    setTitle(e.target.value);
  }

  function contentChangeHandler(e) {
    setContent(e.target.value);
    adjustTextareaHeight(e, "204px");
  }

  function cancelForm(e) {
    e.preventDefault();
    navigate("/posts");
  }

  if (token) {
    return (
      <div className="flex flex-col items-center m-10">
        <form
          onSubmit={submitPostHandler}
          className="bg-lightBackground rounded-md px-0 md:px-10 py-7 w-full max-w-[900px]"
        >
          <div className="mb-3 flex flex-col md:flex-row md:justify-between md:gap-2">
            <input
              onChange={titleChangeHandler}
              className="w-full p-2 text-2xl text-textGrey rounded-md bg-darkBackground border-border border-2 focus:border-primary outline-none transition"
              type="text"
              placeholder="Title"
            ></input>
          </div>
          <div className="flex flex-col mb-3">
            <textarea
              onChange={contentChangeHandler}
              className="w-full p-2 text-2xl text-textGrey rounded-md bg-darkBackground border-border border-2 focus:border-primary outline-none transition h-[200px]"
              placeholder="Content"
            ></textarea>
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={cancelForm}
              className="py-2 px-4 text-xl bg-primary rounded-md text-white hover:bg-blue-400 active:scale-105 transition-color"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 text-xl bg-primary rounded-md text-white hover:bg-blue-400 active:scale-105 transition-color"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  } else {
    return (
      <div className="flex justify-center items-center h-32 text-3xl">
        Not Authenticated to Create Posts
      </div>
    );
  }
}

export default CreatePost;
