"use client";
import { SVG } from "@/assets/SVG";
import Layout from "@/components/CustomLayout/layout";
import { dispatch, useSelector } from "@/store";
import { userSession } from "@/store/slices/authSlice";
import { getAllClipVideos, refreshPage } from "@/store/slices/clipSlice";
import { getCookieValue, getFromLocal } from "@/utils/localStorage";
import Image from "next/image";
import React, { useEffect } from "react";

function Clip() {
  const clipState = useSelector((state: any) => state.clip) || [];

  const payload = {
    userToken: getFromLocal("@token") || getCookieValue("gfoliotoken"),
  };
  const params = {
    payload,
  };
  useEffect(() => {
    dispatch(userSession(params));
    dispatch(getAllClipVideos());
  }, [clipState.refresh]);

  console.log("clipState", clipState);

  const handlePageRefresh = () => {
    dispatch(refreshPage());
  };
  // Function to toggle play/pause on video click
  const handleVideoClick = (
    event: React.MouseEvent<HTMLVideoElement, MouseEvent>
  ) => {
    const video = event.currentTarget;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  return (
    <Layout>
      <div className="flex flex-col justify-center items-center py-4">
        {clipState.videos.map((clip: any) => {
          return (
            <div
              key={clip?._id}
              className="relative w-11/12 sm:w-5/12 h-1/5 mb-4"
            >
              <div className="absolute top-0 left-0 p-4">
                <div className="flex items-center gap-2">
                  <Image
                    className="hover:opacity-80 rounded-lg object-cover"
                    src={clip?.userID?.profilePicture}
                    alt="Profile avatar"
                    width={50}
                    height={50}
                  />
                  <div>
                    <h1 className="w-[230px] sm:w-[350px] text-sm md:text-lg sm:text-md font-bold text-gray-900 dark:text-white hover:opacity-80">
                      {clip?.userID?.name}
                    </h1>
                    <p className="text-sm md:text-md sm:text-md text-base font-light text-gray-600 dark:text-gray-400">
                      {clip?.date &&
                        new Date(clip.date).toLocaleString("en-US", {
                          hour: "numeric",
                          minute: "numeric",
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute top-1.5 right-0 p-4 justify-self-center">
                <Image
                  className="w-7 h-7 hover:opacity-80 rounded-full object-cover"
                  src={SVG.Share}
                  alt="Story"
                  width={30}
                  height={30}
                />
              </div>
              <div className="absolute top-20 mx-4 md:mx-5">
                <p className="font-light text-xs sm:text-sm">
                  {clip?.description}
                </p>
              </div>

              <video
                className="w-full h-screen object-cover rounded-lg"
                src={clip.video}
                width={300}
                height={300}
                controls={false} // Disable default controls
                onClick={handleVideoClick} // Handle video click event
              />

              <div className="absolute inset-x-0 bottom-20 p-4 flex items-center justify-between">
                <p className="font-light text-xs sm:text-sm hover:opacity-80">
                  Liked by john Smith_12 and {clip?.like} others
                </p>
              </div>
              <div className="absolute inset-x-0 bottom-14 p-4 flex items-center justify-between">
                <p className="font-light text-xs sm:text-sm hover:opacity-80">
                  {clip.music}
                </p>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 p-2 rounded-lg bg-[#162423]">
                    <Image
                      className="hover:opacity-80"
                      src={SVG.Like}
                      alt="Like"
                      width={30}
                      height={30}
                    />
                  </div>
                  <div className="w-10 h-10 p-2 rounded-lg bg-[#162423]">
                    <Image
                      className="hover:opacity-80"
                      src={SVG.Chat}
                      alt="Comment"
                      width={30}
                      height={30}
                    />
                  </div>
                  <div className="w-10 h-10 p-2 rounded-lg bg-[#162423]">
                    <Image
                      className="hover:opacity-80"
                      src={SVG.GGcoin}
                      alt="Gcoin"
                      width={30}
                      height={30}
                    />
                  </div>
                </div>
                <Image
                  className="w-10 h-10 hover:opacity-80"
                  src={SVG.Mute}
                  alt="Mute"
                  width={40}
                  height={40}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
}

export default Clip;
