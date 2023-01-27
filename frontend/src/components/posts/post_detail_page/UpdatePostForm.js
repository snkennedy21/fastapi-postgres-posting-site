import React from "react";
import { useState, useRef, useEffect } from "react";

import adjustTextareaHeight from "../../../functions/adjustTextareaHeight";

import { useUpdatePostMutation } from "../../../store/rtk-query-apis/mainApi";

function UpdatePostForm(props) {
  const [title, setTitle] = useState(props.title);
  const [content, setContent] = useState(props.content);
  const [updatePost] = useUpdatePostMutation();
  const contentRef = useRef(null);

  useEffect(() => {
    contentRef.current.style.height = `${contentRef.current.scrollHeight}px`;
  }, []);

  function titleChangeHandler(e) {
    setTitle(e.target.value);
  }

  function contentChangeHandler(e) {
    setContent(e.target.value);
    adjustTextareaHeight(e, "100px");
  }

  function updatePostSubmitHandler(e) {
    e.preventDefault();
    const data = {
      title: title,
      content: content,
      id: props.id,
    };
    updatePost(data);
    props.setUpdateFormOpen(false);
  }

  return (
    <form
      onSubmit={updatePostSubmitHandler}
      className="flex flex-col gap-1 my-2"
    >
      <input
        onChange={titleChangeHandler}
        value={title}
        className="w-full p-2 text-2xl rounded-md bg-darkBackground text-textGrey border-border border-2 focus:border-primary outline-none transition"
        placeholder="title"
      ></input>
      <textarea
        onChange={contentChangeHandler}
        ref={contentRef}
        value={content}
        className="w-full p-2 text-2xl rounded-md bg-darkBackground text-textGrey border-border border-2 focus:border-primary outline-none transition h-[100px]"
        placeholder="Content"
      ></textarea>
      <button className="py-2 px-4 text-xl bg-primary border-solid border-2 border-primary rounded-md text-textWhite hover:bg-primaryTint hover:border-primaryTint active:scale-105 transition-color self-end">
        Submit
      </button>
    </form>
  );
}

export default UpdatePostForm;
