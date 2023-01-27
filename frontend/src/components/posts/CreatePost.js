import React from "react";
import { useState, useEffect } from "react";
import { useCreatePostMutation } from "../../store/rtk-query-apis/mainApi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import adjustTextareaHeight from "../../functions/adjustTextareaHeight";
import Container from "../ui/Container";
import PrimaryButton from "../ui/PrimaryButton";

function CreatePost() {
  const token = useSelector((state) => state.token).token;
  const [title, setTitle] = useState("");
  const [formLoaded, setFormLoaded] = useState(false);
  const [content, setContent] = useState("");
  const [createPost] = useCreatePostMutation();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("intendedDestination", "/");
    setFormLoaded(true);
  }, []);

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
      <Container>
        {/* <h2 className="text-4xl text-textWhite">Rules</h2>
        <p className="text-textGrey text-xl">
          Full Stack Overflow is a great place to share ideas, ask questions,
          and connect with others who have similar interests. However, it's
          important to remember that the internet is a public space and that
          what you post can be seen by many people. To ensure that interactions
          on this forum are positive and productive, it's important to be
          respectful and considerate of others. This means avoiding personal
          attacks, being open to differing viewpoints, and being mindful of the
          language you use. By following these guidelines, you can help create a
          welcoming and inclusive online community for all members.
        </p> */}
        <button className="text-xl text-primary self-end border-2 border-solid border-primary px-2 py-1 rounded-md hover:bg-primary hover:text-textWhite">
          Rules
        </button>
        <form
          onSubmit={submitPostHandler}
          className={`${
            formLoaded ? "opacity-1" : "translate-y-20 opacity-0"
          } bg-lightBackground rounded-md px-10 py-7 w-full transition duration-500`}
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
            <PrimaryButton clickHandler={cancelForm}>{"Cancel"}</PrimaryButton>
            <PrimaryButton type="submit">{"Submit"}</PrimaryButton>
          </div>
        </form>
      </Container>
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
