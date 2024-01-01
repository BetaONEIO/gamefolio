"use client";
import { SVG } from "@/assets/SVG";
import Layout from "@/components/CustomLayout/layout";
import Modal from "@/components/Modals/Modal";
import VideoDetails from "@/components/Modals/VideoDetails";
import { leagueGothic } from "@/font/font";
import { dispatch, useSelector } from "@/store";
import { userSession } from "@/store/slices/authSlice";
import { getAllPostVideos, refreshPage } from "@/store/slices/postSlice";
import { getCookieValue, getFromLocal } from "@/utils/localStorage";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense, useEffect, useState } from "react";
import Loading from "./loading";

function Gamefolio() {
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
    <Layout>
      <Suspense fallback={<Loading />}>
        {/* Header */}
        <div className="flex items-center py-2 bg-[#091619]">
          <div className="flex justify-between items-center w-full mx-4">
            <div>
              <h1 className={`${leagueGothic.className} text-4xl text-gray-50`}>
                MY GAMEFOLIO
              </h1>
            </div>
            <div className="flex items-center my-3 mx-2">
              <Link href="/account/my-folio">
                <div className="flex items-center p-2 mr-2 rounded-full bg-[#162423]">
                  <Image
                    className="mr-2"
                    src={SVG.GGcoin}
                    alt="GGcoin"
                    width={30}
                    height={30}
                  />
                  <p className="font-semibold pr-2 text-white">GG COIN</p>
                </div>
              </Link>
              <Link href="/account/settings">
                <Image
                  className="cursor-pointer hover:opacity-60"
                  src={SVG.Setting}
                  alt="Setting"
                  width={24}
                  height={24}
                />
              </Link>
            </div>
          </div>
        </div>
        <hr className="border-t border-gray-600" />

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
                onLoadedMetadata={(e) => handleVideoMetadata(e, item._id)}
              />
              <span className="absolute bottom-2 right-2">
                {videoDurations[item._id] ? (
                  formatTime(videoDurations[item._id])
                ) : (
                  <Loading />
                )}
              </span>
            </div>
          ))}
        </div>
      </Suspense>

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
    </Layout>
  );
}

export default Gamefolio;
