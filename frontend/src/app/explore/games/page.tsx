"use client";
import React, { useEffect, useState } from "react";
import Modal from "@/components/Modals/Modal";
import VideoDetails from "@/components/Modals/VideoDetails";
import { dispatch, useSelector } from "@/store";
import { userSession } from "@/store/slices/authSlice";
import { getAllPostVideos, refreshPage } from "@/store/slices/postSlice";
import { getCookieValue, getFromLocal } from "@/utils/localStorage";
import Loading from "./loading";
import Link from "next/link";
import { IMAGES } from "@/assets/images";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import required modules
import { EffectFade, Navigation, Pagination } from "swiper/modules";

function Games() {
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

  function padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  const handlePageRefresh = () => {
    dispatch(refreshPage());
  };

  return (
    <div className="m-2">
      <div className="mx-2">
        <p className="font-semibold text-base sm:text-lg lg:text-lg text-white m-2">
          Trending Games Now
        </p>
      </div>

      <div className="flex gap-4 h-80 mx-3">
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
          </SwiperSlide>
        </Swiper>
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
          {postState.videos.slice(0, 20).map((items: any) => (
            <div key={items.id}>
              <div className="w-28 h-40">
                <video
                  src={items.video}
                  width="100"
                  height="133"
                  controls={false}
                  autoPlay={false}
                  className="w-28 h-40 object-cover rounded-xl"
                />
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

export default Games;
