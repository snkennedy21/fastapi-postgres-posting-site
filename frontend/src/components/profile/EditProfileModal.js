import { FaTimes } from "react-icons/fa";
import adjustTextareaHeight from "../../functions/adjustTextareaHeight";
import { useState, useRef, useEffect } from "react";

function EditProfileModal(props) {
  const [username, setUsername] = useState(props.username);
  const [about, setAbout] = useState(
    "My name is sean kenedy and I love to design posts for online forums. I hope you take the time to read this and consider me My name is sean kenedy and I love to design posts for online forums"
  );
  const aboutRef = useRef(null);

  useEffect(() => {
    aboutRef.current.style.height = `${aboutRef.current.scrollHeight}px`;
  }, []);

  function submitHandler(e) {
    e.preventDefault();
    props.toggleModal();
  }

  function aboutChangeHandler(e) {
    setAbout(e.target.value);
    adjustTextareaHeight(e, "104px");
  }

  return (
    <div
      className={`${
        props.editModalOpen
          ? "-translate-y-1/2 opacity-1"
          : "-translate-y-full opacity-0"
      } absolute top-1/2 left-1/2 -translate-x-1/2 w-full small:w-[600px] flex justify-center transition duration-500 z-40`}
    >
      <div className="w-full mx-4 bg-white p-8 flex flex-col rounded-md">
        <h2 className="text-4xl mb-5">Edit Profile</h2>
        <FaTimes
          onClick={props.toggleModal}
          className="absolute top-2 right-7 w-6 h-6 hover:cursor-pointer"
        />
        <form className="flex flex-col gap-4">
          <div>
            <label className="text-xl">Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 text-2xl rounded-md border-black border-2 focus:border-primary outline-none transition duration-300"
              placeholder="Username"
            />
          </div>
          <div>
            <label className="text-xl">About</label>
            <textarea
              value={about}
              onChange={aboutChangeHandler}
              ref={aboutRef}
              className="w-full p-2 text-2xl rounded-md border-black border-2 focus:border-primary outline-none transition duration-300 h-[100px]"
              placeholder="About"
            />
          </div>
          <div className="flex justify-end gap-2 mt-5">
            <button
              onClick={(e) => {
                e.preventDefault();
                props.toggleModal();
              }}
              className="border-2 border-solid border-primary px-4 py-2 rounded-md text-xl"
            >
              Cancel
            </button>
            <button
              onClick={submitHandler}
              className="bg-primary px-4 py-2 rounded-md text-xl"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfileModal;
