"use client";
import React, { useEffect, useState } from "react";
import Modal from "@/components/Modals/Modal";
import VideoDetails from "@/components/Modals/VideoDetails";
import { dispatch, useSelector } from "@/store";
import { userSession } from "@/store/slices/authSlice";
import { getAllPostVideos, refreshPage } from "@/store/slices/postSlice";
import { getCookieValue, getFromLocal } from "@/utils/localStorage";
import Loading from "./loading";
import Image from "next/image";
import { SVG } from "@/assets/SVG";

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
    setDetailedPost(detailedPost);
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

  if (postState.loading) return <Loading />;

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
    <div className="m-4">
      <div className="flex items-center mx-2">
        <p className="font-semibold text-base sm:text-lg lg:text-lg text-white">
          Video Recommended for you
        </p>
      </div>

      <div className="flex flex-wrap w-full gap-2 mt-2">
        {postState.videos.slice(0, 5).map((item: any) => {
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
              <div className="relative">
                <video
                  src={item.video}
                  className="w-full h-36 rounded-2xl hover:opacity-80"
                  controls={false}
                  autoPlay={false}
                  width={50}
                  height={50}
                  onLoadedMetadata={(e) => handleVideoMetadata(e, item._id)}
                />

                <span className="absolute bottom-2 right-3">
                  {formatTime(videoDurations[item._id])}
                </span>
              </div>

              <div className="flex items-center gap-4 mb-2">
                <Image
                  className="rounded-xl w-10 h-10 ml-2 object-cover"
                  src={item?.userID?.profilePicture}
                  alt="Account Profile"
                  height={10}
                  width={10}
                />

                <div>
                  <div>
                    <span className="text-xs sm:text-sm text-white">
                      {item?.userID?.name}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <p className="text-sm font-light text-gray-400">
                      {formatTimeAgo(item.date)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex  items-center justify-between text-center mx-4">
                <div className="flex items-center">
                  <Image
                    className="mr-2 cursor-pointer hover:opacity-80"
                    src={SVG.Like}
                    alt="Like"
                    width={20}
                    height={20}
                  />
                  <p className="text-white">
                    {" "}
                    {
                      item.reactions.filter(
                        (reaction: any) => reaction.reactionType === "like"
                      ).length
                    }
                  </p>
                </div>

                <div className="flex items-center">
                  <Image
                    className="mr-2 cursor-pointer hover:opacity-80"
                    src={SVG.Love}
                    alt="Love"
                    width={20}
                    height={20}
                  />
                  <p className="text-white">
                    {" "}
                    {
                      item.reactions.filter(
                        (reaction: any) => reaction.reactionType === "love"
                      ).length
                    }
                  </p>
                </div>

                <div className="flex items-center">
                  <Image
                    className="mr-2 cursor-pointer hover:opacity-80"
                    src={SVG.Comment}
                    alt="Comment"
                    width={25}
                    height={25}
                  />
                  <p className="text-white">{item.comments.length}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Modal
        isOpen={modalState.isVideoDetailOpen}
        handleClose={() => handleModalToggle("isVideoDetailOpen")}
      >
        <VideoDetails
          postID={postID}
          detailedPost={detailedPost}
          handleCloseModal={() => handleModalToggle("isVideoDetailOpen")}
          handlePageRefresh={() => handlePageRefresh()}
        />
      </Modal>
    </div>
  );
}

export default Video;
