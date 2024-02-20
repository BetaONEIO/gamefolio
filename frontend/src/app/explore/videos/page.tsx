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

  function formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${padZero(minutes)}:${padZero(remainingSeconds)}`;
  }

  function padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  const handlePageRefresh = () => {
    dispatch(refreshPage());
  };

  return (
    <div className="m-4">
      <div className="flex items-center">
        <p className="font-semibold text-base sm:text-lg lg:text-lg text-white">
          Video Recommended for you
        </p>
      </div>

      <div className="flex flex-wrap w-full justify-between gap-2 mt-2">
        {postState.videos.map((item: any) => (
          <div
            key={item?.userID}
            className="flex flex-col gap-2 w-64 h-60 border-2 border-[#1C2C2E] rounded-xl mx-1 pb-2"
            onClick={() =>
              handleModalToggle("isVideoDetailOpen", item._id, item)
            }
          >
            <div className="relative">
              <video
                src={item.video}
                className="w-80 h-full rounded-2xl hover:opacity-80"
                controls={false}
                autoPlay={false}
                onLoadedMetadata={(e) => handleVideoMetadata(e, item._id)}
              />

              <span className="absolute bottom-2 right-3">
                {formatTime(videoDurations[item._id])}
              </span>
            </div>

            <div className="flex items-center gap-4 mb-2">
              <Image
                className="rounded-xl w-10 h-10 ml-2 object-cover"
                src={item?.profilePicture}
                alt="Account Profile"
                height={10}
                width={10}
              />

              <div>
                <div>
                  <span className="text-xs sm:text-sm text-white">
                    Sara Collin
                  </span>
                </div>
                <div className="flex items-center">
                  <p className="text-sm font-light text-gray-400">
                    10 minutes ago
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
                <p className="text-white">24</p>
              </div>

              <div className="flex items-center">
                <Image
                  className="mr-2 cursor-pointer hover:opacity-80"
                  src={SVG.Love}
                  alt="Love"
                  width={20}
                  height={20}
                />
                <p className="text-white">24</p>
              </div>

              <div className="flex items-center">
                <Image
                  className="mr-2 cursor-pointer hover:opacity-80"
                  src={SVG.Comment}
                  alt="Comment"
                  width={25}
                  height={25}
                />
                <p className="text-white">24</p>
              </div>
            </div>
          </div>
        ))}
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
