"use client";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "@/assets/images";
import { dispatch, useSelector } from "@/store";
import { userSession } from "@/store/slices/authSlice";
import { getAllUsers } from "@/store/slices/userSlice";
import { getCookieValue, getFromLocal } from "@/utils/localStorage";
import Loading from "./loading";
import { leagueGothic } from "@/font/font";
import { SVG } from "@/assets/SVG";
import { copyToClipboard } from "@/utils/helpers";

function User() {
  const authState = useSelector((state: any) => state.auth.userData) || [];
  const userState = useSelector((state: any) => state.user) || [];
  const postState = useSelector((state: any) => state.post) || [];
  const payload = {
    userToken: getFromLocal("@token") || getCookieValue("gfoliotoken"),
  };
  const params = {
    payload,
  };
  useEffect(() => {
    dispatch(userSession(params));
    dispatch(getAllUsers());
  }, [userState.refresh]);

  const userVideos = postState.videos.filter(
    (post: any) => post?.userID?._id === authState._id
  );

  if (userState.loading) return <Loading />;

  return (
    <div className="flex flex-wrap justify-start items-start h-64 mx-2">
      {userState?.userList?.slice(0, 10).map((user: any) => (
        <div
          key={user?.userID}
          className="flex flex-col h-44 gap-2 border-2 border-[#1C2C2E] rounded-xl mx-1 my-2"
        >
          <div className="flex items-center gap-4 mb-2">
            <Image
              className="rounded-xl w-16 h-16 mt-2 ml-2 object-cover"
              src={user?.profilePicture}
              width={10}
              height={10}
              sizes="100vw"
              alt="Account Profile"
            />
            <div>
              <div>
                <span className="text-white">{user?.name}</span>
              </div>
              <div
                className="flex items-center"
                onClick={() => copyToClipboard(user?.username)}
              >
                <p className="text-white">
                  ({user?.username || "no_username"})
                </p>
                <Image
                  className="cursor-pointer hover:opacity-80"
                  src={SVG.AccountCopyUsername}
                  width={16}
                  height={16}
                  alt="Copy Username"
                />
              </div>
            </div>
          </div>

          <hr className="h-px border-0 bg-[#1C2C2E] mb-1 w-full rounded-full" />

          <div className="flex flex-col flex-wrap justify-center text-center lg:justify-start lg:text-start">
            <div className="flex items-center justify-center gap-1">
              <div className="flex flex-col">
                <span
                  className={`${leagueGothic.className} flex justify-center text-lg md:text-2xl font-normal text-white`}
                >
                  {userVideos.length || 0}
                </span>
                <span className="md:text-lg text-gray-400">Posts</span>
              </div>

              {/* Vertical divider */}
              <div className="border-r border-[#1C2C2E] h-12 rounded-full"></div>

              <div
                className="flex flex-col"
                // onClick={() => handleModalToggle("isFollowerModalOpen")}
              >
                <span
                  className={`${leagueGothic.className} flex justify-center text-lg md:text-2xl font-normal text-white`}
                >
                  {user?.follower?.length || 0}
                </span>
                <span className="md:text-lg text-gray-400">Followers</span>
              </div>
              {/* Vertical divider */}
              <div className="border-r border-[#1C2C2E] h-12 rounded-full"></div>

              <div
                className="flex-col"
                // onClick={() => handleModalToggle("isFollowingModalOpen")}
              >
                <span
                  className={`${leagueGothic.className} flex justify-center text-lg md:text-2xl font-normal text-white`}
                >
                  {user?.following?.length || 0}
                </span>
                <span className="md:text-lg text-gray-400">Following</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default User;
