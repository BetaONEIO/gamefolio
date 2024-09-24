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
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import required modules
import { EffectFade, Navigation, Pagination } from "swiper/modules";
import { fetchGameList } from "@/services/api";
import Image from "next/image";

const SkeletonLoaderGames = () => (
  <div className="flex items-center">
    <div className="flex items-center overflow-scroll no-scrollbar gap-2">
      {[...Array(5)]?.map((_, index) => (
        <div
          key={index}
          className="w-28 h-40 bg-gray-700 rounded-xl animate-pulse"
        ></div>
      ))}
    </div>
  </div>
);

const SkeletonTrendingLoader = () => {
  return (
    <SwiperSlide>
      <div className="w-full h-80 rounded-xl bg-gray-700 animate-pulse"></div>

      <div
        className="absolute inset-0 rounded-xl bg-gradient-to-t from-[#091619] via-transparent to-transparent"
        style={{ opacity: 1 }}
      ></div>
    </SwiperSlide>
  );
};

function Games() {
  const postState = useSelector((state: any) => state.post) || [];
  const [postID, setPostID] = useState("");
  const [detailedPost, setDetailedPost] = useState("");
  const [optionsForGame, setOptionsForGame] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState(optionsForGame);
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
    handleGameList();
  }, []);

  useEffect(() => {
    setFilteredOptions(optionsForGame);
  }, [optionsForGame]);

  const handleGameList = async () => {
    const gettingGameList = await fetchGameList();
    setOptionsForGame(gettingGameList);
  };

  function padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  const handlePageRefresh = () => {
    dispatch(refreshPage());
  };

  const removeGame = (gameNameToRemove: any) => {
    // Filter out the game named "Just Chatting"
    const filteredGames = filteredOptions?.filter(
      (item: any) => item.name !== gameNameToRemove
    );
    return filteredGames;
  };

  // Assuming you have the name of the game as "Just Chatting"
  const gameToRemove = "Just Chatting";

  // Call removeGame function to filter out the game
  const filteredGames = removeGame(gameToRemove);

  const isTrendingDataFetching = filteredGames.length === 0;

  return (
    <div className="m-2 h-fit pb-40 md:pb-0">
      <div className="mx-2">
        <p className="font-semibold text-base sm:text-lg lg:text-lg text-white m-2">
          Trending Games Now
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 relative mx-4">
        <div className="relative w-full ">
          {isTrendingDataFetching ? (
            <SkeletonTrendingLoader />
          ) : (
            <Swiper
              effect={"fade"}
              navigation={true}
              pagination={{ clickable: true }}
              modules={[EffectFade, Navigation, Pagination]}
              className="mySwiper h-80 rounded-lg"
            >
              {filteredGames?.slice(0, 3)?.map((item: any) => (
                <SwiperSlide key={item.id}>
                  <Image
                    width={1920}
                    height={1080}
                    className="w-full h-full rounded-xl bg-cover bg-no-repeat bg-center hover:scale-105 transition-transform duration-100"
                    src={item.box_art_url.replace(
                      "{width}x{height}",
                      "1920x1080"
                    )}
                    alt={item.name}
                    style={styles.swiperImage}
                    sizes="100vw"
                  />
                  <div style={styles.overlay}></div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
          <div className="absolute top-4 left-4 flex flex-wrap gap-4 z-10">
            <button
              className="font-semibold rounded-2xl px-4 py-2 text-white cursor-pointer hover:opacity-80 hover:text-[#43DD4E] sm:px-2 sm:py-1 text-xs sm:text-lg"
              style={{ backgroundColor: "rgba(41, 45, 50, 0.8)" }}
            >
              Action
            </button>
            <button
              className="font-semibold rounded-2xl px-4 py-2 text-white cursor-pointer hover:opacity-80 hover:text-[#43DD4E] sm:px-2 sm:py-1 text-xs sm:text-lg"
              style={{ backgroundColor: "rgba(41, 45, 50, 0.8)" }}
            >
              Fighting
            </button>
            <button
              className="font-semibold rounded-2xl px-4 py-2 text-white cursor-pointer hover:opacity-80 hover:text-[#43DD4E] sm:px-2 sm:py-1 text-xs sm:text-lg"
              style={{ backgroundColor: "rgba(41, 45, 50, 0.8)" }}
            >
              Thrilling
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center my-2">
        <div className="flex justify-between items-center w-full sm:mx-2 lg:mx-4">
          <div>
            <p className="font-semibold text-base sm:text-lg lg:text-lg text-white">
              Popular Games
            </p>
          </div>
          <div className="flex items-center">
            <Link
              href="/explore/games"
              className="text-md sm:text-md lg:text-md hover:opacity-80 cursor-pointer underline text-[#62C860]"
            >
              View All
            </Link>
          </div>
        </div>
      </div>

      <div className="flex items-center my-2">
        <div className="flex items-center overflow-scroll no-scrollbar gap-2 px-4">
          {filteredGames?.length === 0 ? (
            <>
              {[...Array(3)]?.map((_, index) => (
                <SkeletonLoaderGames key={index} />
              ))}
            </>
          ) : (
            filteredGames?.slice(0, 20)?.map((item: any) => (
              <div key={item.id}>
                <div className="w-28 h-40 overflow-hidden rounded-xl">
                  <Image
                    width={40}
                    height={40}
                    className="w-28 h-40  hover:scale-105 transition-transform duration-100"
                    src={item.box_art_url.replace(
                      "{width}x{height}",
                      "112x160"
                    )}
                    alt={item.name}
                    sizes="100vw"
                  />
                </div>
              </div>
            ))
          )}
        </div>
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
    width: "100%",
    height: "100%",
  },
  scroller: {
    scrollbarColor: "#43DD4E #FFFFFF",
  },
  // Add more styles as needed
};

export default Games;
