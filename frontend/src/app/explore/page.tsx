"use client";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { IMAGES } from "@/assets/images";
import Layout from "@/components/CustomLayout/layout";
import ExploreHeader from "@/components/ExploreHeader/ExploreHeader";
import { dispatch, useSelector } from "@/store";
import { userSession } from "@/store/slices/authSlice";
import { getAllPostVideos, refreshPage } from "@/store/slices/postSlice";
import { getCookieValue, getFromLocal } from "@/utils/localStorage";
import Loading from "./loading";
import Modal from "@/components/Modals/Modal";
import VideoDetails from "@/components/Modals/VideoDetails";

function Explore() {
  const postState = useSelector((state: any) => state.post) || [];
  const [videoDurations, setVideoDurations] = useState<{
    [key: string]: number;
  }>({});
  const [postID, setPostID] = useState("");
  const [detailedPost, setDetailedPost] = useState("");
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
  }, [postState.refresh]);

  const sectionStyle = {
    backgroundImage: `linear-gradient(to bottom, rgba(4, 50, 12, 1), rgba(4, 50, 12, 0) 10%)`,
  };

  const games = [
    { id: 1, IMAGE: IMAGES.ExploreIMG1 },
    { id: 2, IMAGE: IMAGES.ExploreIMG2 },
    { id: 3, IMAGE: IMAGES.ExploreIMG3 },
    { id: 4, IMAGE: IMAGES.ExploreIMG1 },
    { id: 5, IMAGE: IMAGES.ExploreIMG2 },
    { id: 6, IMAGE: IMAGES.ExploreIMG3 },
    { id: 7, IMAGE: IMAGES.ExploreIMG1 },
    { id: 8, IMAGE: IMAGES.ExploreIMG2 },
    { id: 9, IMAGE: IMAGES.ExploreIMG3 },
    { id: 10, IMAGE: IMAGES.ExploreIMG2 },
    { id: 11, IMAGE: IMAGES.ExploreIMG1 },
    { id: 12, IMAGE: IMAGES.ExploreIMG2 },
    { id: 13, IMAGE: IMAGES.ExploreIMG3 },
  ];

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
        <ExploreHeader />

        <div
          style={sectionStyle}
          className="flex flex-col bg-[#091619] py-4 overflow-y-scroll no-scrollbar"
        >
          <div className="flex items-center">
            <div className="flex justify-between items-center w-full sm:mx-2 lg:mx-4">
              <div>
                <p className="font-semibold text-base sm:text-lg lg:text-lg text-white">
                  Explore By Games
                </p>
              </div>
              <div className="flex items-center">
                <Link
                  href="/explore-search/explore-games"
                  className="text-md sm:text-md lg:text-md hover:opacity-80 cursor-pointer text-white"
                >
                  View All
                </Link>
              </div>
            </div>
          </div>

          <div className="flex items-center my-4">
            <div className="flex items-center overflow-scroll no-scrollbar gap-2 px-4 ">
              {postState.videos.slice(0, 20).map((items: any) => (
                <div key={items.id}>
                  <div className="w-28 h-44">
                    <video
                      src={items.video}
                      width="100"
                      height="133"
                      controls={false}
                      autoPlay={false}
                      className="w-28 h-44 object-cover rounded-xl"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="px-4">
              <p className="font-semibold text-base sm:text-lg lg:text-lg">
                Popular
              </p>
            </div>

            <div className="flex flex-wrap justify-start items-start mx-3">
              {postState.videos.map((item: any) => (
                <div
                  key={item._id}
                  className="relative my-2 mx-3"
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
          </div>
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

export default Explore;
