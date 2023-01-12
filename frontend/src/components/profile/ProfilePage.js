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
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (userDataLoading) {
      return;
    }
    const image = new Image();
    image.src = `data:image/jpeg;base64,${userData.photo}`;
    setImage(image.src);
    setPosts(userData.posts);
  }, [userData]);

  if (userDataLoading) {
    return <div>Loading...</div>;
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
              <img className="rounded-full w-full" src={profile} />
            ) : (
              <img className="rounded-full w-full" src={image} />
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
        <div className="p-7 flex justify-around rounded-md w-1/2">
          <button
            value="Votes"
            className="px-4 py-2 border-2 border-solid border-primary rounded-2xl text-2xl text-primary"
          >
            Votes
          </button>
          <button
            value="Time"
            className="px-4 py-2 border-2 border-solid border-primary rounded-2xl text-2xl text-primary"
          >
            Time
          </button>
          <button
            value="Comments"
            className="px-4 py-2 border-2 border-solid border-primary rounded-2xl text-2xl text-primary"
          >
            Comments
          </button>
        </div>
        {posts.map((post) => {
          return <Post key={post.id} post={post} />;
        })}
      </Container>
    </React.Fragment>
  );
}

export default ProfilePage;