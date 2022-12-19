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
        className="w-full p-2 text-2xl rounded-md border-black border-2 focus:border-primary outline-none transition duration-300"
        placeholder="title"
      ></input>
      <textarea
        onChange={contentChangeHandler}
        ref={contentRef}
        value={content}
        className="w-full p-2 text-2xl rounded-md border-black border-2 focus:border-primary outline-none transition duration-300 h-[100px]"
        placeholder="Content"
      ></textarea>
      <button>Submit</button>
    </form>
  );
}

export default UpdatePostForm;
