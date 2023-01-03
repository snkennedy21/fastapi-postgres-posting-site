import React from "react";
import Container from "../posts/ui/Container";
import { useGetUserProfileQuery } from "../../store/rtk-query-apis/mainApi";
import profile from "../../images/profile.jpg";

function ProfilePage() {
  const { data: user, isLoading: userLoading } = useGetUserProfileQuery();

  if (userLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center">
      <div className="p-10 flex flex-col gap-4 w-[1100px]">
        <div className="bg-lightBackground p-7 flex rounded-md">
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
              and I love to design posts for online forums. I hope you take the
              time to read this and consider me My name is sean kenedy and I
              love to design posts for online forums.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
