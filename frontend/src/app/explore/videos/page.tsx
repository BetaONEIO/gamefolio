"use client";
import React, { useEffect, useState } from "react";
import Modal from "@/components/Modals/Modal";
import VideoDetails from "@/components/Modals/VideoDetails";
import { dispatch, useSelector } from "@/store";
import { userSession } from "@/store/slices/authSlice";
import {
  getAllPostVideos,
  refreshPage,
  updateDetailedPost,
} from "@/store/slices/postSlice";
import { getCookieValue, getFromLocal } from "@/utils/localStorage";
import Image from "next/image";
import { SVG } from "@/assets/SVG";

const SkeletonLoaderRecommendation = () => {
  return (
    <div className="flex-shrink-0 flex flex-col gap-2 w-68 h-60 border-2 border-[#1C2C2E] rounded-xl mx-1 animate-pulse overflow-x-auto">
      <div className="relative w-full h-36 bg-gray-700 rounded-2xl"></div>
      <div className="flex items-center gap-4">
        <div className="w-10 h-6 ml-2 bg-gray-700 rounded-xl"></div>
        <div>
          <div className="w-24 h-4 bg-gray-700 rounded"></div>
          <div className="w-16 h-3 mt-1 bg-gray-700 rounded"></div>
        </div>
      </div>
      <div className="flex items-center justify-between text-center mx-4">
        <div className="w-6 h-2 bg-gray-700 rounded-full"></div>
        <div className="w-6 h-2 bg-gray-700 rounded-full"></div>
        <div className="w-6 h-2 bg-gray-700 rounded-full"></div>
      </div>
    </div>
  );
};

function Video() {
  const authState = useSelector((state: any) => state.auth.userData) || [];
  const postState = useSelector((state: any) => state.post) || [];
  const [postID, setPostID] = useState("");
  const [detailedPost, setDetailedPost] = useState("");
  const [videoDurations, setVideoDurations] = useState<{
    [key: string]: number;
  }>({});
  const [modalState, setModalState] = useState({
    isVideoDetailOpen: false,
  });

  const handleModalToggle = (
    modalName: keyof typeof modalState,
    postID?: any,
    detailedPost?: any
  ) => {
    setPostID(postID);
    dispatch(updateDetailedPost(detailedPost));
    setModalState((prevState) => ({
      ...prevState,
      [modalName]: !prevState[modalName],
    }));
  };

  const payload = {
    userToken: getFromLocal("@token") || getCookieValue("gfoliotoken"),
  };

  const params = {
    payload,
  };

  useEffect(() => {
    dispatch(userSession(params));
    dispatch(getAllPostVideos());
  }, []);

  const handleVideoMetadata = (
    event: React.SyntheticEvent<HTMLVideoElement, Event>,
    videoId: string
  ) => {
    const video = event.currentTarget;
    const duration = video.duration;
    setVideoDurations((prevDurations) => ({
      ...prevDurations,
      [videoId]: duration,
    }));
  };

  function formatTimeAgo(timestamp: any) {
    const currentDate = new Date();
    const previousDate = new Date(timestamp);
    const timeDifference = currentDate.getTime() - previousDate.getTime();
    const minutesAgo = Math.floor(timeDifference / (1000 * 60));

    if (minutesAgo < 60) {
      return `${minutesAgo} minutes ago`;
    } else if (minutesAgo < 1440) {
      return `${Math.floor(minutesAgo / 60)} hours ago`;
    } else {
      return `${Math.floor(minutesAgo / 1440)} days ago`;
    }
  }

  const formatTime = (seconds: number): string => {
    if (isNaN(seconds)) return "loading"; // Adding error handling
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedTime = `${minutes}:${
      remainingSeconds < 10 ? "0" : ""
    }${remainingSeconds}`;
    return formattedTime;
  };

  function padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  const handlePageRefresh = () => {
    dispatch(refreshPage());
  };

  return (
    <div className="m-4 h-screen">
      <div className="flex items-center mx-2 mb-2">
        <p className="font-semibold sm:text-lg text-xs text-white">
          Video Recommended for you
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {postState.videos?.length === 0 ? (
          <>
            {[...Array(4)]?.map((_, index) => (
              <SkeletonLoaderRecommendation key={index} />
            ))}
          </>
        ) : (
          postState.videos?.slice(0, 5)?.map((item: any) => {
            const hasLikeReacted = item.reactions.some(
              (reaction: any) =>
                reaction.userID === authState._id &&
                reaction.reactionType === "like"
            );

            const hasLoveReacted = item.reactions.some(
              (reaction: any) =>
                reaction.userID === authState._id &&
                reaction.reactionType === "love"
            );
            return (
              <div
                key={item?.userID}
                className="flex flex-col gap-2 w-68 h-64 border-2 border-[#1C2C2E] rounded-xl mx-1 pb-2"
                onClick={() =>
                  handleModalToggle("isVideoDetailOpen", item._id, item)
                }
              >
                <div className="relative overflow-hidden rounded-t-xl aspect-w-16 aspect-h-9">
                  <video
                    src={item.video}
                    className="object-cover w-full h-36 rounded-xl hover:opacity-80 hover:scale-105 transition-transform duration-300"
                    controls={false}
                    autoPlay={false}
                    width={50}
                    height={50}
                    onLoadedMetadata={(e) => handleVideoMetadata(e, item._id)}
                  />

                  <span className="absolute bottom-2 right-3 text-white">
                    {formatTime(videoDurations[item._id])}
                  </span>
                </div>

                <div className="p-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Image
                      className="rounded-full w-10 h-10 object-cover"
                      src={item?.userID?.profilePicture}
                      alt="Account Profile"
                      height={40}
                      width={40}
                    />
                    <div>
                      <p className="text-sm text-white font-semibold  hover:text-[#43DD4E]">
                        {item?.userID?.name}
                      </p>
                      <p className="text-xs text-gray-400 hover:opacity-80">
                        {formatTimeAgo(item.date)}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between mx-2">
                    <div className="flex items-center gap-2">
                      <Image
                        className="cursor-pointe hover:opacity-80"
                        src={SVG.Like}
                        alt="Like"
                        width={20}
                        height={20}
                      />
                      <p className="text-white">
                        {
                          item.reactions?.filter(
                            (reaction: any) => reaction.reactionType === "like"
                          )?.length
                        }
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Image
                        className="cursor-pointer hover:opacity-80"
                        src={SVG.Love}
                        alt="Love"
                        width={20}
                        height={20}
                      />
                      <p className="text-white">
                        {
                          item.reactions?.filter(
                            (reaction: any) => reaction.reactionType === "love"
                          )?.length
                        }
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Image
                        className="cursor-pointer hover:opacity-80"
                        src={SVG.Comment}
                        alt="Comment"
                        width={25}
                        height={25}
                      />
                      <p className="text-white">{item.comments?.length}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <Modal
        isOpen={modalState.isVideoDetailOpen}
        handleClose={() => handleModalToggle("isVideoDetailOpen")}
      >
        <VideoDetails
          postID={postID}
          handleCloseModal={() => handleModalToggle("isVideoDetailOpen")}
          handlePageRefresh={() => handlePageRefresh()}
        />
      </Modal>
    </div>
  );
}

export default Video;
