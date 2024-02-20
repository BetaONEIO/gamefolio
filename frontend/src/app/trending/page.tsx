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
import React, { Suspense, useEffect, useState, useRef } from "react";
import Loading from "./loading";
import CustomHeader from "@/components/CustomHeader/CustomHeader";
import { getAllUsers } from "@/store/slices/userSlice";
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

function Trending() {
  const authState = useSelector((state: any) => state.auth.userData) || [];
  const postState = useSelector((state: any) => state.post) || [];
  const [postID, setPostID] = useState("");
  const [detailedPost, setDetailedPost] = useState("");
  const [videoDurations, setVideoDurations] = useState<{
    [key: string]: number;
  }>({});

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

  return (
    <Layout>
      <Suspense fallback={<Loading />}>
        {/* Header */}
        <CustomHeader>TRENDING</CustomHeader>

        <section
          style={sectionStyle}
          className="flex flex-col items-center bg-[#091619] min-h-screen"
        >
          <div className="p-8 flex flex-col w-full h-full gap-8">
            <div>
              <p className="font-semibold text-base sm:text-lg lg:text-lg text-white">
                Trending Games
              </p>
            </div>
            <div className="flex gap-4 h-80 w-full">
              <Swiper
                effect={"fade"}
                navigation={true}
                pagination={{
                  clickable: true,
                }}
                modules={[EffectFade, Navigation, Pagination]}
                className="mySwiper h-80 w-full rounded-lg"
              >
                <SwiperSlide>
                  <img src={IMAGES.TrendingPubg} style={styles.swiperImage} />
                  <div style={styles.overlay}></div>
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src="https://swiperjs.com/demos/images/nature-3.jpg"
                    style={styles.swiperImage}
                  />
                  <div style={styles.overlay}></div>
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src="https://swiperjs.com/demos/images/nature-4.jpg"
                    style={styles.swiperImage}
                  />
                  <div style={styles.overlay}></div>
                  {/* <Image
                        width={12}
                        height={12}
                        className="w-16 h-16"
                        src={IMAGES.callofduty}
                        alt="UploadStory"
                      /> */}
                </SwiperSlide>
              </Swiper>
              <div
                className="hidden w-2/5 h-full md:flex flex-col gap-8 rounded-lg bg-[#091619] border border-[#1C2C2E] px-4 py-6 overflow-y-auto "
                style={styles.scroller}
              >
                <div className="flex justify-start items-center">
                  <span className="font-bold">Upcoming Updates</span>
                </div>
                <div className="flex flex-col gap-6">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <Image
                        width={12}
                        height={12}
                        className="w-16 h-16"
                        src={IMAGES.callofduty}
                        alt="UploadStory"
                      />
                      <div className="flex flex-col ">
                        <span className="text-xs font-bold text-[#43DD4E] ">
                          Trending Now
                        </span>
                        <span className="text-lg text-white ">
                          Call of duty
                        </span>
                        <span className="text-xs text-gray-500 ">
                          New addition Arrived
                        </span>
                      </div>
                    </div>

                    <div>
                      <Image
                        className="cursor-pointer hover:opacity-80"
                        src={SVG.Threedots}
                        alt="Threedots"
                        width={5}
                        height={5}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-6">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <Image
                        width={12}
                        height={12}
                        className="w-16 h-16"
                        src={IMAGES.callofduty}
                        alt="UploadStory"
                      />
                      <div className="flex flex-col ">
                        <span className="text-xs font-bold text-[#43DD4E] ">
                          Trending Now
                        </span>
                        <span className="text-lg text-white ">
                          Subway surfer
                        </span>
                        <span className="text-xs text-gray-500 ">
                          New addition Arrived
                        </span>
                      </div>
                    </div>

                    <div>
                      <Image
                        className="cursor-pointer hover:opacity-80"
                        src={SVG.Threedots}
                        alt="Threedots"
                        width={5}
                        height={5}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-6">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <Image
                        width={12}
                        height={12}
                        className="w-16 h-16"
                        src={IMAGES.callofduty}
                        alt="UploadStory"
                      />
                      <div className="flex flex-col ">
                        <span className="text-xs font-bold text-[#43DD4E] ">
                          Trending Now
                        </span>
                        <span className="text-lg text-white ">PUBG Mobile</span>
                        <span className="text-xs text-gray-500 ">
                          New addition Arrived
                        </span>
                      </div>
                    </div>

                    <div>
                      <Image
                        className="cursor-pointer hover:opacity-80"
                        src={SVG.Threedots}
                        alt="Threedots"
                        width={5}
                        height={5}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-6">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <Image
                        width={12}
                        height={12}
                        className="w-16 h-16"
                        src={IMAGES.callofduty}
                        alt="UploadStory"
                      />
                      <div className="flex flex-col ">
                        <span className="text-xs font-bold text-[#43DD4E] ">
                          Trending Now
                        </span>
                        <span className="text-lg text-white ">
                          Call of duty
                        </span>
                        <span className="text-xs text-gray-500 ">
                          New addition Arrived
                        </span>
                      </div>
                    </div>

                    <div>
                      <Image
                        className="cursor-pointer hover:opacity-80"
                        src={SVG.Threedots}
                        alt="Threedots"
                        width={5}
                        height={5}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap w-full justify-between">
              {postState.videos.map((item: any) => (
                <div
                  key={item?.userID}
                  className="flex flex-col gap-2 w-60 h-full border-2 border-[#1C2C2E] rounded-xl  my-2 pb-2"
                  onClick={() =>
                    handleModalToggle("isVideoDetailOpen", item._id, item)
                  }
                >
                  <div className="relative">
                    <video
                      src={item.video}
                      className=" w-80 h-full rounded-2xl hover:opacity-80 p-2"
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

const styles = {
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "space-between",
  },
  swiperContainer: {
    width: "80%",
    height: "30%",
  },
  swiperImage: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute" as "absolute", // Explicitly specify position type
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background:
      "linear-gradient(to top, rgba(0, 0, 0, 0.4) 100%, rgba(0, 0, 0, 0) 100%)",
  },
  scroller: {
    scrollbarColor: "#43DD4E #FFFFFF",
  },
  // Add more styles as needed
};

export default Trending;
