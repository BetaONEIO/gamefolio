"use client";
import React, { useRef, useEffect, useCallback, useState } from "react";
import { dispatch, useSelector } from "@/store";
import { userSession } from "@/store/slices/authSlice";
import { getAllPostVideos, refreshPage } from "@/store/slices/postSlice";
import { getCookieValue, getFromLocal } from "@/utils/localStorage";
import Loading from "./loading";
import VideoDetails from "@/components/Modals/VideoDetails";
import Modal from "@/components/Modals/Modal";

function ExploreVideo() {
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
    console.log("FirstTime");
    dispatch(userSession(params));
    dispatch(getAllPostVideos());
  }, []);
  console.log("SecondTime");

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
    <>
      <div className="flex flex-wrap justify-start items-start mx-3">
        {postState.videos.map((item: any, index: number) => (
          <div
            key={item._id}
            className="relative my-1 mx-3"
            onClick={() =>
              handleModalToggle("isVideoDetailOpen", item._id, item)
            }
          >
            <video
              src={item.video}
              className="w-96 h-44 sm:w-52 sm:h-28 rounded-xl hover:opacity-80"
              width={20}
              height={20}
              controls={false}
              autoPlay={false}
              preload="metadata"
              // onClick={handleVideoClick}
              onLoadedMetadata={(e) => handleVideoMetadata(e, item._id)}
            />
            <span className="absolute bottom-2 right-2">
              {videoDurations[item._id]
                ? formatTime(videoDurations[item._id])
                : "Loading..."}
            </span>
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
    </>
  );
}

export default ExploreVideo;
