"use client";
import { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import { SVG } from "@/assets/SVG";
import CustomHeader from "@/components/CustomHeader/CustomHeader";
import Layout from "@/components/CustomLayout/layout";
import DeletePost from "@/components/Modals/DeletePost";
import Modal from "@/components/Modals/Modal";
import VideoDetails from "@/components/Modals/VideoDetails";
import { dispatch, useSelector } from "@/store";
import { userSession } from "@/store/slices/authSlice";
import { getTrendingPosts, refreshPage } from "@/store/slices/postSlice";
import { getCookieValue, getFromLocal } from "@/utils/localStorage";
import Loading from "./loading";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import required modules
import { IMAGES } from "@/assets/images";
import { EffectFade, Navigation, Pagination } from "swiper/modules";

function Trending() {
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
  }, [postState.refresh]);

  const [modalState, setModalState] = useState({
    isPostShareOpen: false,
    isVideoDetailOpen: false,
    isPostDeleteOpen: false,
  });

  const sectionStyle = {
    backgroundImage: `linear-gradient(to bottom, rgba(4, 50, 12, 1), rgba(4, 50, 12, 0) 10%)`,
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
                </SwiperSlide>
              </Swiper>

              <div
                className="hidden w-2/5 h-[22.5rem] md:flex flex-col gap-8 rounded-lg bg-[#091619] border border-[#1C2C2E] px-4 py-6 overflow-y-auto"
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

            {/* <div className="absolute flex items-center gap-4">
              <h1 className="p-2 bg-[#292D32] rounded-xl">Action</h1>
              <h1 className="p-2 bg-[#292D32] rounded-xl">Fighting</h1>
              <h1 className="p-2 bg-[#292D32] rounded-xl">Thrilling</h1>
            </div> */}

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

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {postState?.trendingVideos?.map((item: any) => (
                <div
                  key={item?.userID}
                  className="flex flex-col w-full h-60 border-2 border-[#1C2C2E] rounded-xl my-2"
                  onClick={() =>
                    handleModalToggle("isVideoDetailOpen", item._id, item)
                  }
                >
                  <div className="relative overflow-hidden rounded-t-xl aspect-w-16 aspect-h-9">
                    <video
                      src={item.video}
                      className="object-cover w-full h-full hover:opacity-80"
                      controls={false}
                      autoPlay={false}
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
                        <p className="text-sm text-white">
                          {item?.userID?.name}
                        </p>
                        <p className="text-xs text-gray-400">
                          {formatTimeAgo(item.date)}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between mx-2">
                      <div className="flex items-center gap-2">
                        <Image
                          className="cursor-pointer hover:opacity-80"
                          src={SVG.Like}
                          alt="Like"
                          width={20}
                          height={20}
                        />
                        <p className="text-white">
                          {
                            item.reactions.filter(
                              (reaction: any) =>
                                reaction.reactionType === "like"
                            ).length
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
                            item.reactions.filter(
                              (reaction: any) =>
                                reaction.reactionType === "love"
                            ).length
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
                        <p className="text-white">{item.comments.length}</p>
                      </div>
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
