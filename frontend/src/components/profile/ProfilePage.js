import React from "react";
import Container from "../ui/Container";
import { useGetUserProfileQuery } from "../../store/rtk-query-apis/mainApi";
import profile from "../../images/profile.jpg";
import EditProfileModal from "./EditProfileModal";
import { useState, useEffect } from "react";
import Post from "../posts/post_list_page/Post";
import Loading from "../ui/Loading";

function ProfilePage() {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const { data: userData, isLoading: userDataLoading } =
    useGetUserProfileQuery();
  const [posts, setPosts] = useState([]);
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (userDataLoading) {
      return;
    }
    const image = new Image();
    image.src = `data:image/jpeg;base64,${userData.photo}`;
    setImage(image.src);
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
        <div className="bg-lightBackground p-7 flex rounded-md relative">
          <button
            onClick={() => setEditModalOpen(true)}
            className="absolute top-1 right-2 text-lg z-30"
          >
            Edit
          </button>
          <div className="pr-7">
            {image === null || image === "data:image/jpeg;base64," ? (
              <img className="rounded-full w-full" src={profile} alt="emtpy" />
            ) : (
              <img
                className="rounded-full w-full"
                src={image}
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
