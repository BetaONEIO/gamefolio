"use client";
import { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import { IMAGES } from "@/assets/images";
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
import { fetchGameList } from "@/services/api";
import Loading from "./loading";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import required modules
import { EffectFade, Navigation, Pagination } from "swiper/modules";

function Trending() {
  const postState = useSelector((state: any) => state.post) || [];
  const [postID, setPostID] = useState("");
  const [detailedPost, setDetailedPost] = useState("");
  const [videoDurations, setVideoDurations] = useState<{
    [key: string]: number;
  }>({});
  const [optionsForGame, setOptionsForGame] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(optionsForGame);

  const payload = {
    userToken: getFromLocal("@token") || getCookieValue("gfoliotoken"),
  };

  const params = {
    payload,
  };

  useEffect(() => {
    dispatch(userSession(params));
    dispatch(getTrendingPosts());
    handleGameList();
  }, [postState.refresh]);

  useEffect(() => {
    setFilteredOptions(optionsForGame);
  }, [optionsForGame]);

  // console.log(" hjeoeo", optionsForGame);
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
    if (isNaN(seconds)) return "loading";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedTime = `${minutes}:${
      remainingSeconds < 10 ? "0" : ""
    }${remainingSeconds}`;
    return formattedTime;
  };

  const handleGameList = async () => {
    const gettingGameList = await fetchGameList();
    setOptionsForGame(gettingGameList);
  };

  const debounce = (func: any, delay: any) => {
    let timeoutId: any;
    return function (...args: any) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const delayedSearch = debounce((inputValue: any) => {
    const filtered = optionsForGame.filter((option: any) => {
      return option?.name?.toLowerCase().includes(inputValue);
    });
    setFilteredOptions(filtered);
  }, 1000);

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
          className="flex flex-col items-center bg-[#091619] min-h-screen relative"
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
                pagination={{ clickable: true }}
                modules={[EffectFade, Navigation, Pagination]}
                className="mySwiper h-80 w-full rounded-lg relative"
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

              <div className="absolute left-10 flex gap-4 mt-4">
                <button className="rounded-2xl px-4 py-2 bg-[#292D32] text-white">
                  Action
                </button>
                <button className="rounded-2xl px-4 py-2 bg-[#292D32] text-white">
                  Fighting
                </button>
                <button className="rounded-2xl px-4 py-2 bg-[#292D32] text-white">
                  Thrilling
                </button>
              </div>

              <div
                className="hidden w-2/5 h-[22.5rem] md:flex flex-col gap-6 rounded-lg bg-[#091619] border border-[#1C2C2E] px-4 py-6 overflow-y-auto"
                style={styles.scroller}
              >
                <div className="flex justify-start items-center">
                  <span className="font-bold">Upcoming Updates</span>
                </div>
                <div className="flex flex-col gap-4">
                  {filteredOptions.slice(0, 20).map((item: any) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center"
                    >
                      <div className="flex gap-2">
                        <Image
                          width={64}
                          height={64}
                          className="w-16 h-16 rounded-xl"
                          src={item.box_art_url.replace(
                            "{width}x{height}",
                            "64x64"
                          )}
                          alt={item.name}
                        />
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-[#43DD4E]">
                            Trending Now
                          </span>
                          <span className="text-md font-semibold text-white">
                            {item.name}
                          </span>
                          <span className="text-xs text-[#A1A1A1]">
                            New addition Arrived
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-4">
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
                  className="flex flex-col w-68 h-60 border-2 border-[#1C2C2E] rounded-xl my-2 cursor-pointer hover:opacity-80"
                  onClick={() =>
                    handleModalToggle("isVideoDetailOpen", item._id, item)
                  }
                >
                  <div className="relative overflow-hidden rounded-t-xl aspect-w-16 aspect-h-9">
                    <video
                      src={item.video}
                      className="object-cover w-full h-36"
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
                    <div className="flex items-center gap-2 mb-4">
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

                    <div className="flex justify-between mx-1">
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
