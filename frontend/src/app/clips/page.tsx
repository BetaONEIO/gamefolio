"use client";
import React, { Suspense, useEffect, useState } from "react";
import { SVG } from "@/assets/SVG";
import Layout from "@/components/CustomLayout/layout";
import Modal from "@/components/Modals/Modal";
import SharePost from "@/components/Modals/SharePost";
import { toastError } from "@/components/Toast/Toast";
import { dispatch, useSelector } from "@/store";
import { userSession } from "@/store/slices/authSlice";
import {
  createClipReaction,
  deleteClipReaction,
  getAllClipVideos,
  refreshPage,
} from "@/store/slices/clipSlice";
import { getCookieValue, getFromLocal } from "@/utils/localStorage";
import Image from "next/image";
import Loading from "./loading";
import Link from "next/link";

interface VideoState {
  isMuted?: boolean;
}

function Clip() {
  const authState = useSelector((state: any) => state.auth.userData) || [];
  const clipState = useSelector((state: any) => state.clip) || [];
  const [clipID, setClipID] = useState("");
  const [videoStates, setVideoStates] = useState<{ [key: string]: VideoState }>(
    {}
  );

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

  const [modalState, setModalState] = useState({
    isClipShareOpen: false,
  });

  const handleModalToggle = (modalName: keyof typeof modalState) => {
    setModalState((prevState) => ({
      ...prevState,
      [modalName]: !prevState[modalName],
    }));
  };

  const handlePageRefresh = () => {
    dispatch(refreshPage());
  };

  const handleCreateReaction = async (clipID: any, reactionType: any) => {
    const payload = {
      userID: authState._id,
      clipID: clipID,
      reactionType: reactionType,
    };

    console.log("My Payload CREATE clip Reaction: >><> ", payload);

    const successCallback = (response: any) => {
      // console.log("RESPONSE ADDVIDEO: ", response);
      handlePageRefresh();
      // toastSuccess(response);
    };

    const errorCallback = (error: string) => {
      toastError(error);
    };

    const params = {
      payload,
      successCallback,
      errorCallback,
    };

    dispatch(createClipReaction(params));
  };

  const handleDeleteReaction = async (clipID: any, reactionID: any) => {
    const payload = {
      userID: authState._id,
      clipID: clipID,
      reactionID: reactionID,
    };

    console.log("My Payload Reaction: >><> ", payload);

    const successCallback = (response: any) => {
      console.log("RESPONSE ADDVIDEO: ", response);
      handlePageRefresh();
      // toastSuccess(response);
    };

    const errorCallback = (error: string) => {
      toastError(error);
    };

    const params = {
      payload,
      successCallback,
      errorCallback,
    };

    dispatch(deleteClipReaction(params));
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

  const handleToggleMute = (clipID: string) => {
    setVideoStates((prevStates) => ({
      ...prevStates,
      [clipID]: {
        ...prevStates[clipID],
        isMuted: !prevStates[clipID]?.isMuted,
      },
    }));
  };

  return (
    <Layout>
      <Suspense fallback={<Loading />}>
        <div className="flex flex-col justify-center items-center py-4">
          {clipState.videos.map((clip: any) => {
            const hasLikeReacted = clip.reactions.some(
              (reaction: any) =>
                reaction.userID === authState._id &&
                reaction.reactionType === "like"
            );

            // Find the reaction ID for the current user
            const reactionID = clip.reactions.find(
              (reaction: any) => reaction.userID === authState._id
            );

            const videoState = videoStates[clip._id] || {
              isMuted: false,
            };

            return (
              <div
                key={clip?._id}
                className="relative w-11/12 sm:w-5/12 h-1/5 mb-4"
              >
                <div className="absolute top-0 left-0 p-4">
                  <div className="flex items-center gap-2">
                    <Image
                      className="w-12 h-12 hover:opacity-80 rounded-xl object-cover"
                      src={clip?.userID?.profilePicture}
                      alt="Profile avatar"
                      width={50}
                      height={50}
                    />
                    <div>
                      <Link
                        href={`/account/${clip?.userID?.username}`}
                        key={clip?._id}
                      >
                        <h1 className="w-[230px] sm:w-[350px] text-sm md:text-lg sm:text-md font-bold text-white hover:opacity-80">
                          {clip?.userID?.name}
                        </h1>
                      </Link>
                      <p className="text-sm md:text-md sm:text-md font-light text-gray-400 ">
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
                {/* <div
                  className="cursor-pointer absolute top-1.5 right-0 p-4 justify-self-center"
                  onClick={() => handleModalToggle("isClipShareOpen")}
                >
                  <Image
                    className="w-7 h-7 hover:opacity-80 rounded-full object-cover"
                    src={SVG.Share}
                    alt="Story"
                    width={30}
                    height={30}
                  />
                </div> */}
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
                  controls={false}
                  onClick={handleVideoClick}
                  muted={videoState.isMuted}
                  preload="auto"
                  autoFocus
                />

                <div className="absolute inset-x-0 bottom-20 p-4 flex items-center justify-between">
                  <p className="font-light text-xs sm:text-sm hover:opacity-80">
                    Liked by {clip?.userID?.name} and others
                  </p>
                </div>
                <div className="absolute inset-x-0 bottom-14 p-4 flex items-center justify-between">
                  <p className="font-light text-xs sm:text-sm hover:opacity-80">
                    {clip?.music}
                  </p>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div
                      className="flex items-center w-10 h-10 p-2 rounded-lg bg-[#162423] cursor-pointer"
                      onClick={
                        hasLikeReacted
                          ? () => handleDeleteReaction(clip._id, reactionID._id)
                          : () => handleCreateReaction(clip._id, "like")
                      }
                    >
                      <Image
                        className="hover:opacity-80"
                        src={SVG.Like}
                        alt="Like"
                        width={30}
                        height={30}
                      />
                      <p className="text-white">
                        {
                          clip.reactions.filter(
                            (reaction: any) => reaction.reactionType === "like"
                          ).length
                        }
                      </p>
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
                  <div className="absolute bottom-2 right-3">
                    <button
                      className="cursor-pointer hover:opacity-80"
                      onClick={() => handleToggleMute(clip._id)}
                    >
                      {videoState.isMuted ? (
                        <Image
                          src={SVG.Mute}
                          alt="Mute"
                          width={40}
                          height={40}
                        />
                      ) : (
                        <Image
                          src={SVG.UnMute}
                          alt="Unmute"
                          width={40}
                          height={40}
                        />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <Modal
          isOpen={modalState.isClipShareOpen}
          handleClose={() => handleModalToggle("isClipShareOpen")}
        >
          <SharePost
            handleCloseModal={() => handleModalToggle("isClipShareOpen")}
          />
        </Modal>
      </Suspense>
    </Layout>
  );
}

export default Clip;
