import React from "react";
import Container from "../ui/Container";
import { useGetUserProfileQuery } from "../../store/rtk-query-apis/mainApi";
import profile from "../../images/profile.jpg";
import EditProfileModal from "./EditProfileModal";
import { useState, useEffect } from "react";
import Post from "../posts/post_list_page/Post";

function ProfilePage(props) {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const { data: userData, isLoading: userDataLoading } =
    useGetUserProfileQuery();
  const [posts, setPosts] = useState([]);
  const [orderBy, setOrderBy] = useState("Recent");

  useEffect(() => {
    if (userDataLoading) {
      return;
    }
    setPosts(userData.posts);
  }, [userData]);

  if (userDataLoading) {
    return <div>Loading...</div>;
  }

  console.log(posts);

  function modalHandler() {
    setEditModalOpen(!editModalOpen);
  }

  function sortPosts(e) {
    if (e.target.value === "Votes") {
      console.log("sort");
    } else if (e.target.value === "Time") {
      console.log("sort");
    } else if (e.target.value === "Comments") {
      console.log("sort");
    }
  }

  return (
    <React.Fragment>
      <EditProfileModal
        editModalOpen={editModalOpen}
        toggleModal={modalHandler}
        username={userData.username}
      />
      <div className="flex justify-center">
        <div className="p-10 flex flex-col gap-4 w-[1100px] items-center">
          <div className="bg-lightBackground p-7 flex rounded-md relative">
            <button
              onClick={() => setEditModalOpen(true)}
              className="absolute top-1 right-2 text-lg z-30"
            >
              Edit
            </button>
            <div className="pr-7">
              <img
                className="rounded-full w-full"
                src={profile}
                alt="profile picture"
              />
            </div>
            <div className="w-11/12">
              <p className="text-2xl">
                <span className="font-bold">Username:</span> {userData.username}
              </p>
              <p className="text-2xl">
                <span className="font-bold">Email:</span> {userData.email}
              </p>
              <p className="text-2xl">
                <span className="font-bold">About:</span> My name is sean kenedy
                and I love to design posts for online forums. I hope you take
                the time to read this and consider me My name is sean kenedy and
                I love to design posts for online forums.
              </p>
            </div>
          </div>
          <div className="p-7 flex justify-around rounded-md w-1/2">
            <button
              onClick={sortPosts}
              value="Votes"
              className="px-4 py-2 border-2 border-solid border-primary rounded-2xl text-2xl text-primary"
            >
              Votes
            </button>
            <button
              onClick={sortPosts}
              value="Time"
              className="px-4 py-2 border-2 border-solid border-primary rounded-2xl text-2xl text-primary"
            >
              Time
            </button>
            <button
              onClick={sortPosts}
              value="Comments"
              className="px-4 py-2 border-2 border-solid border-primary rounded-2xl text-2xl text-primary"
            >
              Comments
            </button>
          </div>
          {posts.map((post) => {
            return <Post key={post.id} post={post} />;
          })}
        </div>
      </div>
    </React.Fragment>
  );
}

export default ProfilePage;
