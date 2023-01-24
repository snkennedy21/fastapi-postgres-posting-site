import React from "react";
import Container from "../ui/Container";
import { useGetUserProfileQuery } from "../../store/rtk-query-apis/mainApi";
import profile from "../../images/profile.jpg";
import EditProfileModal from "./EditProfileModal";
import { useState, useEffect } from "react";
import Post from "../posts/post_list_page/Post";
import Loading from "../ui/Loading";
import { useSelector } from "react-redux";

function ProfilePage() {
  const token = useSelector((state) => state.token).token;
  const [editModalOpen, setEditModalOpen] = useState(false);
  const { data: userData, isLoading: userDataLoading } =
    useGetUserProfileQuery();
  const [posts, setPosts] = useState([]);

  console.log(userData);

  useEffect(() => {
    if (userDataLoading) {
      return;
    }
    setPosts(userData.posts);
  }, [userData, userDataLoading]);

  if (userDataLoading) {
    return <Loading />;
  }

  function modalHandler() {
    setEditModalOpen(!editModalOpen);
  }

  return (
    <React.Fragment>
      <EditProfileModal
        editModalOpen={editModalOpen}
        toggleModal={modalHandler}
        username={userData.username}
        about={userData.about}
      />
      <Container>
        <div className="text-textWhite">
          {token ? "Authenticated" : "Not Authenticated"}
        </div>
        <div className="bg-lightBackground p-7 flex rounded-md relative">
          <button
            onClick={() => setEditModalOpen(true)}
            className="absolute top-1 right-2 text-lg z-30"
          >
            Edit
          </button>
          <div className="pr-7">
            {userData.photo_url === null ? (
              <img className="rounded-full w-40" src={profile} alt="emtpy" />
            ) : (
              <img
                className="rounded-full w-40"
                src={userData.photo_url}
                alt={userData.username}
              />
            )}
          </div>
          <div className="w-11/12">
            <p className="text-2xl">
              <span className="font-bold">Username:</span> {userData.username}
            </p>
            <p className="text-2xl">
              <span className="font-bold">Email:</span> {userData.email}
            </p>
            <p className="text-2xl">
              <span className="font-bold">About:</span> {userData.about}
            </p>
          </div>
        </div>
        <h2 className="text-textWhite text-4xl">
          {userData.username.slice(-1) === "s" ||
          userData.username.slice(-1) === "S"
            ? userData.username + "' "
            : userData.username + "'s "}
          Posts
        </h2>
        {posts.map((post) => {
          return <Post key={post.id} post={post} />;
        })}
      </Container>
    </React.Fragment>
  );
}

export default ProfilePage;
