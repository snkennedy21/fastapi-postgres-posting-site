import React from "react";
import { FaTimes } from "react-icons/fa";
import adjustTextareaHeight from "../../functions/adjustTextareaHeight";
import { useState, useRef, useEffect } from "react";
import { useUpdateUserMutation } from "../../store/rtk-query-apis/mainApi";

function EditProfileModal(props) {
  const [username, setUsername] = useState(props.username);
  const [about, setAbout] = useState(props.about ? props.about : "");
  const [updateUserInfo] = useUpdateUserMutation();
  const [usernameError, setUsernameError] = useState("");
  const [remainingChars, setRemainingChars] = useState(200);
  const [remainingCharsVisible, setRemainingCharsVisible] = useState(false);
  const [file, setFile] = useState("");
  const aboutRef = useRef(null);

  useEffect(() => {
    aboutRef.current.style.height = `${aboutRef.current.scrollHeight}px`;
    if (!props.about) return;
    setRemainingChars(200 - props.about.length);
    setRemainingChars(200 - about.length);
  }, [props.about, about]);

  function submitHandler(e) {
    e.preventDefault();
    updateUserInfo(e.target)
      .unwrap()
      .then((payload) => {
        props.toggleModal();
      })
      .catch((error) => {
        if (error.data.detail === "usernameExists") {
          setUsernameError("This username already exists");
        }
        if (error.data.detail === "usernameEmpty") {
          setUsernameError("This field cannot be blank");
        }
      });
  }

  function aboutChangeHandler(e) {
    setRemainingCharsVisible(true);
    setAbout(e.target.value);
    adjustTextareaHeight(e, "104px");
  }

  function usernameChangeHandler(e) {
    setUsername(e.target.value);
    setUsernameError("");
  }

  function fileChangeHandler(e) {
    setFile(e.target.value);
  }

  return (
    <React.Fragment>
      <div
        className={`${
          props.editModalOpen
            ? "opacity-1 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } absolute z-40 top-0 left-0 bg-darkBackground backdrop-blur-sm w-full h-full tranistion duration-500 bg-opacity-80`}
      ></div>
      <div
        className={`${
          props.editModalOpen
            ? "-translate-y-1/2 opacity-1 pointer-events-auto"
            : "-translate-y-full opacity-0 pointer-events-none"
        } absolute top-1/2 left-1/2 -translate-x-1/2 w-full small:w-[600px] flex justify-center transition duration-500 z-40`}
      >
        <div className="w-full mx-4 bg-lightBackground p-8 flex flex-col rounded-md">
          <h2 className="text-4xl mb-5 text-textWhite">Edit Profile</h2>
          <FaTimes
            onClick={props.toggleModal}
            className="absolute top-2 right-7 w-6 h-6 text-textBlack hover:cursor-pointer"
          />
          <form onSubmit={submitHandler} className="flex flex-col gap-4">
            <div>
              {usernameError !== "" ? (
                <label className="text-xl text-red-500">{usernameError}</label>
              ) : (
                <label className="text-xl text-textBlack">Username</label>
              )}
              <input
                name="username"
                value={username}
                onChange={usernameChangeHandler}
                className={`${
                  usernameError ? "border-red-800" : "border-border"
                } w-full p-2 text-2xl rounded-md border-border border-2 bg-darkBackground text-textGrey focus:border-primary outline-none transition`}
                placeholder="Username"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-xl text-textBlack">About</label>
              <textarea
                name="about"
                value={about}
                onChange={aboutChangeHandler}
                maxLength={200}
                ref={aboutRef}
                className="w-full p-2 text-2xl rounded-md border-border border-2 bg-darkBackground text-textGrey focus:border-primary outline-none transition h-[100px]"
                placeholder="About"
              />
              {remainingCharsVisible ? (
                <p className="self-end">{remainingChars} Remaining</p>
              ) : (
                <div className="h-6"></div>
              )}
            </div>
            <div className="flex flex-col">
              <label className="text-xl text-textBlack">
                Upload Photo (Max File Size 5kb)
              </label>
              <input
                name="file"
                type="file"
                value={file}
                onChange={fileChangeHandler}
                className="bg-orange-49=00"
              />
            </div>
            <div className="flex justify-end gap-2 mt-5">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  props.toggleModal();
                }}
                className="border-2 border-solid border-primary px-4 py-2 rounded-md text-xl text-textBlack"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-primary px-4 py-2 rounded-md text-xl text-textBlack"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}

export default EditProfileModal;
