"use client";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { SVG } from "@/assets/SVG";
import { leagueGothic } from "@/font/font";
import { dispatch, useSelector } from "@/store";
import { userSession } from "@/store/slices/authSlice";
import { getAllPostVideos } from "@/store/slices/postSlice";
import { getAllUsers } from "@/store/slices/userSlice";
import { copyToClipboard } from "@/utils/helpers";
import { getCookieValue, getFromLocal } from "@/utils/localStorage";
import SkeletonLoaderUser from "./loading";

function User() {
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
    dispatch(getAllPostVideos());
    dispatch(getAllUsers());
  }, [userState.refresh]);

  const userVideos = userState.userList.map((user: any) => {
    const videosForUser = postState.videos?.filter(
      (post: any) => post?.userID?.username === user.username
    );
    return { username: user.username, videoCount: videosForUser.length };
  });

  return (
    <div className="m-2">
      <div>
        <p className="font-semibold text-base sm:text-lg lg:text-lg text-white mx-2">
          User Profiles
        </p>
      </div>
      <div className="flex flex-wrap justify-start items-start h-64">
        {userState?.userList?.length === 0 ? (
          <>
            {[...Array(8)].map((_, index) => (
              <SkeletonLoaderUser key={index} />
            ))}
          </>
        ) : (
          userState?.userList?.map((user: any) => (
            <div
              key={user?.userID}
              className="flex flex-col h-44 gap-2 border-2 border-[#1C2C2E] rounded-xl mx-1 my-2"
            >
              <Link href={`/account/${user?.username}`} key={user._id}>
                <div className="flex items-center gap-4 mb-2">
                  <Image
                    className="rounded-xl w-16 h-16 mt-2 ml-2 object-cover"
                    src={user?.profilePicture}
                    alt="Profile"
                    width={10}
                    height={10}
                    sizes="100vw"
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
                        alt="Copy Username"
                        width={16}
                        height={16}
                      />
                    </div>
                  </div>
                </div>
              </Link>

              <hr className="h-px border-0 bg-[#1C2C2E] mb-1 w-full rounded-full" />

              <div className="flex flex-col flex-wrap justify-center text-center lg:justify-start lg:text-start">
                <div className="flex items-center justify-center gap-2">
                  <div className="flex flex-col">
                    <span
                      className={`${leagueGothic.className} flex justify-center text-lg md:text-2xl font-normal text-white`}
                    >
                      {userVideos.find(
                        (video: any) => video.username === user.username
                      )?.videoCount || 0}
                    </span>
                    <span className="text-md text-gray-400">Posts</span>
                  </div>

                  {/* Vertical divider */}
                  <div className="border-r border-[#1C2C2E] h-12 rounded-full"></div>

                  <div className="flex flex-col">
                    <span
                      className={`${leagueGothic.className} flex justify-center text-lg md:text-2xl font-normal text-white`}
                    >
                      {user?.followers?.length || 0}
                    </span>
                    <span className="text-md text-gray-400">Followers</span>
                  </div>

                  {/* Vertical divider */}
                  <div className="border-r border-[#1C2C2E] h-12 rounded-full"></div>

                  <div className="flex-col">
                    <span
                      className={`${leagueGothic.className} flex justify-center text-lg md:text-2xl font-normal text-white`}
                    >
                      {user?.following?.length || 0}
                    </span>
                    <span className="text-md text-gray-400">Following</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default User;
