"use client";
import { SVG } from "@/assets/SVG";
import Layout from "@/components/CustomLayout/layout";
import DeletePost from "@/components/Modals/DeletePost";
import Modal from "@/components/Modals/Modal";
import VideoDetails from "@/components/Modals/VideoDetails";
import { toastError } from "@/components/Toast/Toast";
import { leagueGothic } from "@/font/font";
import { dispatch, useSelector } from "@/store";
import { userSession } from "@/store/slices/authSlice";
import {
  createVideoReaction,
  deleteVideoReaction,
  getAllPostVideos,
  getTrendingPosts,
  refreshPage,
} from "@/store/slices/postSlice";
import { getCookieValue, getFromLocal } from "@/utils/localStorage";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import React, { Suspense, useEffect, useState, useRef } from "react";
import Loading from "./loading";
import CustomHeader from "@/components/CustomHeader/CustomHeader";
import { getAllUsers } from "@/store/slices/userSlice";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import required modules
import { EffectFade, Navigation, Pagination } from "swiper/modules";
import { IMAGES } from "@/assets/images";

function Page() {
  const authState = useSelector((state: any) => state.auth.userData) || [];
  const postState = useSelector((state: any) => state.post) || [];
  const messageState = useSelector((state: any) => state.chat) || [];
  const [emoji, setEmoji] = useState(false);
  const [postID, setPostID] = useState("");
  const [detailedPost, setDetailedPost] = useState("");
  const [videoDurations, setVideoDurations] = useState<{
    [key: string]: number;
  }>({});
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      message: "",
    },
  });

  const payload = {
    userToken: getFromLocal("@token") || getCookieValue("gfoliotoken"),
  };
  const params = {
    payload,
  };
  useEffect(() => {
    dispatch(userSession(params));
    dispatch(getTrendingPosts());
    dispatch(getAllPostVideos());
    dispatch(getAllUsers());
  }, [postState.refresh]);

  const [modalState, setModalState] = useState({
    isPostShareOpen: false,
    isVideoDetailOpen: false,
    isPostDeleteOpen: false,
  });
  const sectionStyle = {
    backgroundImage: `linear-gradient(to bottom, rgba(4, 50, 12, 1), rgba(4, 50, 12, 0) 10%)`,
  };
  const headerStyle = {
    backgroundImage: `linear-gradient(180deg, #46A541 0%, #B5D759 100%)`,
  };

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

  // toggle emoji
  const toggleEmoji = () => {
    setEmoji(!emoji);
  };
  // toggle emoji
  const toggleModal = () => {
    setEmoji(!emoji);
  };

  const handleCreateReaction = async (postID: any, reactionType: any) => {
    const payload = {
      userID: authState._id,
      postID: postID,
      reactionType: reactionType,
    };

    const successCallback = (response: any) => {
      handlePageRefresh();
    };

    const errorCallback = (error: string) => {
      toastError(error);
    };

    const params = {
      payload,
      successCallback,
      errorCallback,
    };

    dispatch(createVideoReaction(params));
  };

  const handleDeleteReaction = async (postID: any, reactionID: any) => {
    const payload = {
      userID: authState._id,
      postID: postID,
      reactionID: reactionID,
    };

    const successCallback = (response: any) => {
      handlePageRefresh();
    };

    const errorCallback = (error: string) => {
      toastError(error);
    };

    const params = {
      payload,
      successCallback,
      errorCallback,
    };

    dispatch(deleteVideoReaction(params));
  };

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

  const handlePageRefresh = () => {
    dispatch(refreshPage());
  };

  // handle emoji
  const handleEmojiSelect = (selectedEmoji: any) => {
    // Get the current value of the message input field
    const currentMessage = watch("message");

    // Append the selected emoji to the current message value
    const updatedMessage = currentMessage + selectedEmoji;

    // Set the updated message value to the input field using setValue
    setValue("message", updatedMessage);
  };

  return (
    <Layout>
      <Suspense fallback={<Loading />}>
        {/* Header */}
        <CustomHeader>TRENDING</CustomHeader>

        <section
          style={sectionStyle}
          className="flex flex-col items-center bg-[#091619] min-h-screen"
        >
          <div className="p-4 flex flex-col w-full h-full gap-2">
            <div className="flex items-center gap-3">
              <p className="font-semibold text-base sm:text-lg lg:text-lg text-white">
                Trending Games
              </p>
              <div className="flex items-center bg-[#49DE4D] px-1 rounded-md">
                <Image
                  className="mr-2 cursor-pointer hover:opacity-80"
                  src={SVG.Trending}
                  alt="Trending"
                  width={20}
                  height={20}
                />
                <p className="font-semibold text-base sm:text-md lg:text-md text-white">
                  Trending
                </p>
              </div>
            </div>

            <div className="flex relative gap-4 h-80 w-full">
              <div>
                <Image
                  className="w-full h-80"
                  src={IMAGES.Bgbackground}
                  alt="UploadStory"
                  width={12}
                  height={12}
                  sizes="100vw"
                />
              </div>

              <div className="hidden w-3/6 h-full md:flex flex-col gap-4 rounded-lg bg-[#091619] border border-[#1C2C2E] overflow-y-auto pb-3">
                <Image
                  className="w-full h-40"
                  src={IMAGES.Bgbackground}
                  alt="UploadStory"
                  width={12}
                  height={12}
                  sizes="100vw"
                />

                <p className="font-normal text-[0.64rem] mx-3">
                  Join the fight for Sanctuary in Diablo IV, the ultimate action
                  RPG adventure. Experience the critically acclaimed campaign
                  and new seasonal content.
                </p>

                <div className="flex items-center justify-between mx-2">
                  <p className="text-[#43DD4E] text-sm">RELEASE DATE:</p>{" "}
                  <p className="text-sm">17 Oct, 2023</p>
                </div>
                <div className="flex items-center justify-between mx-2">
                  <p className="text-[#43DD4E] text-sm">PUBLISHER:</p>{" "}
                  <p className="text-sm">Krafton</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 h-80 w-full">
              <div className="w-full border border-[#1C2C2E]">
                <div className="flex items-center py-4 px-3">
                  <Image
                    className="w-12 h-12 rounded-3xl"
                    src={IMAGES.callofduty}
                    alt="pubg"
                    width={50}
                    height={50}
                  />
                  <div className="flex items-center justify-between w-full mx-2">
                    <div>
                      <p className="text-xs text-[#43DD4E] font-semibold">
                        Available on
                      </p>
                      <p className="text-sm font-semibold">Gaming World</p>
                    </div>

                    <div>
                      <Image
                        className="w-12 h-12 rounded-lg"
                        src={SVG.ArrowUpSide}
                        alt="Profile"
                        width={50}
                        height={50}
                      />
                    </div>
                  </div>
                </div>
                <hr className="border-t border-[#162423]" />
              </div>

              <div className="hidden w-[37%] h-full md:flex flex-col gap-4 rounded-lg bg-[#091619] border border-[#1C2C2E] overflow-y-auto px-2">
                <div className="flex justify-between w-full border-b-2 py-2 border-[#1C2C2E]">
                  <p>Rating & Reviews</p>
                  <p className="text-sm text-[#43DD4E] underline">See all</p>
                </div>

                <div className="overflow-y-auto">
                  <div className="my-2">
                    <div className="flex items-center gap-1">
                      <Image
                        width={12}
                        height={12}
                        className="w-12 h-10"
                        src={IMAGES.callofduty}
                        alt="UploadStory"
                      />
                      <div className="flex flex-col">
                        <div className="flex items-center gap-4 mx-2 w-">
                          <p className="w-32 text-sm text-white font-semibold">
                            Maria Samson
                          </p>
                          <p className="w-24 text-[0.60rem] text-gray-400">
                            4:30 AM-2/10/24
                          </p>
                        </div>
                        <span className="text-sm text-[#43DD4E] mx-2">
                          Rating
                        </span>
                      </div>
                    </div>

                    <div className="my-2">
                      <p className="font-normal text-[0.73rem] w-full">
                        Lorem ipsum dolor sit amet consectetur. Feugiat sapien
                        suspendisse.
                      </p>
                    </div>
                    <hr className="w-full border bg-gray-300 opacity-10" />
                  </div>

                  <div className="my-2">
                    <div className="flex items-center gap-1">
                      <Image
                        width={12}
                        height={12}
                        className="w-12 h-10"
                        src={IMAGES.callofduty}
                        alt="UploadStory"
                      />
                      <div className="flex flex-col">
                        <div className="flex items-center gap-4 mx-2 w-">
                          <p className="w-32 text-sm text-white font-semibold">
                            Maria Samson
                          </p>
                          <p className="w-24 text-[0.60rem] text-gray-400">
                            4:30 AM-2/10/24
                          </p>
                        </div>
                        <span className="text-sm text-[#43DD4E] mx-2">
                          Rating
                        </span>
                      </div>
                    </div>

                    <div className="my-2">
                      <p className="font-normal text-[0.73rem] w-full">
                        Lorem ipsum dolor sit amet consectetur. Feugiat sapien
                        suspendisse.
                      </p>
                    </div>
                    <hr className="w-full border bg-gray-300 opacity-10" />
                  </div>

                  <div className="my-2">
                    <div className="flex items-center gap-1">
                      <Image
                        width={12}
                        height={12}
                        className="w-12 h-10"
                        src={IMAGES.callofduty}
                        alt="UploadStory"
                      />
                      <div className="flex flex-col">
                        <div className="flex items-center gap-4 mx-2 w-">
                          <p className="w-32 text-sm text-white font-semibold">
                            Maria Samson
                          </p>
                          <p className="w-24 text-[0.60rem] text-gray-400">
                            4:30 AM-2/10/24
                          </p>
                        </div>
                        <span className="text-sm text-[#43DD4E] mx-2">
                          Rating
                        </span>
                      </div>
                    </div>

                    <div className="my-2">
                      <p className="font-normal text-[0.73rem] w-full">
                        Lorem ipsum dolor sit amet consectetur. Feugiat sapien
                        suspendisse.
                      </p>
                    </div>
                    <hr className="w-full border bg-gray-300 opacity-10" />
                  </div>
                </div>

                <div className="flex items-center flex-grow my-2 relative rounded-lg bg-[#162423] p-2 sticky-top-0">
                  <button onClick={toggleEmoji}>😀</button>
                  <input
                    type="text"
                    className="flex-grow px-1 py-1 bg-[#162423] focus:outline-none"
                    placeholder="Write message"
                    {...register("message")}
                  />

                  {emoji && (
                    <div className="absolute bottom-10 right-0">
                      <Picker
                        data={data}
                        onEmojiSelect={(data: any) =>
                          handleEmojiSelect(data.native)
                        }
                        previewPosition="none"
                      />
                    </div>
                  )}

                  <Image
                    className="absolute left-64 hover:opacity-70"
                    alt="Message sent"
                    width={24}
                    height={24}
                    src={SVG.ChatMessageSent}
                    // onClick={handleSubmit(handleSendMessage)}
                  />
                </div>
              </div>
            </div>
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

          <Modal
            isOpen={modalState.isPostDeleteOpen}
            handleClose={() => handleModalToggle("isPostDeleteOpen")}
          >
            <DeletePost
              postID={postID}
              handleCloseModal={() => handleModalToggle("isPostDeleteOpen")}
              handlePageRefresh={() => handlePageRefresh()}
            />
          </Modal>
        </section>
      </Suspense>
    </Layout>
  );
}

export default Page;
