import React from "react";
import Container from "../posts/ui/Container";
import { useGetUserProfileQuery } from "../../store/rtk-query-apis/mainApi";
import profile from "../../images/profile.jpg";
import EditProfileModal from "./EditProfileModal";
import { useState } from "react";

function ProfilePage() {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const { data: user, isLoading: userLoading } = useGetUserProfileQuery();

  if (userLoading) {
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
        username={user.username}
      />
      <div className="flex justify-center">
        <div className="p-10 flex flex-col gap-4 w-[1100px] items-center">
          <div className="bg-lightBackground p-7 flex rounded-md relative">
            <button
              onClick={() => setEditModalOpen(true)}
              className="absolute top-1 right-2 text-lg z-40"
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
                <span className="font-bold">Username:</span> {user.username}
              </p>
              <p className="text-2xl">
                <span className="font-bold">Email:</span> {user.email}
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
            <button className="px-4 py-2 border-2 border-solid border-primary rounded-2xl text-2xl text-primary">
              Recent
            </button>
            <button className="px-4 py-2 border-2 border-solid border-primary rounded-2xl text-2xl text-primary">
              Popular
            </button>
            <button className="px-4 py-2 border-2 border-solid border-primary rounded-2xl text-2xl text-primary">
              Oldest
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ProfilePage;
