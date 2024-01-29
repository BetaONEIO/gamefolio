"use client";
import { IMAGES } from "@/assets/images";
import Layout from "@/components/CustomLayout/layout";
import Modal from "@/components/Modals/Modal";
import VideoDetails from "@/components/Modals/VideoDetails";
import { dispatch, useSelector } from "@/store";
import { userSession } from "@/store/slices/authSlice";
import { getAllPostVideos, refreshPage } from "@/store/slices/postSlice";
import { getCookieValue, getFromLocal } from "@/utils/localStorage";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import Loading from "./loading";
import CustomHeader from "@/components/CustomHeader/CustomHeader";
import Image from "next/image";
import { copyToClipboard } from "@/utils/helpers";
import { leagueGothic } from "@/font/font";
import { SVG } from "@/assets/SVG";
import { getAllUsers } from "@/store/slices/userSlice";
import { usePathname } from "next/navigation";

function Explore() {
  const authState = useSelector((state: any) => state.auth.userData) || [];
  const postState = useSelector((state: any) => state.post) || [];
  const userState = useSelector((state: any) => state.user) || [];
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
    dispatch(getAllUsers());
  }, [postState.refresh]);

  const sectionStyle = {
    backgroundImage: `linear-gradient(to bottom, rgba(4, 50, 12, 1), rgba(4, 50, 12, 0) 10%)`,
  };

  const userVideos = postState.videos.filter(
    (post: any) => post?.userID?._id === authState._id
  );

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

  const currentRoute = usePathname();
  const isItemActive = (path: string) => {
    return currentRoute === path ? true : false;
  };

  return (
    <Layout>
      <Suspense fallback={<Loading />}>
        <CustomHeader>EXPLORE</CustomHeader>

        <div className="py-4">
          <ul className="flex items-center">
            <li>
              <a
                href="/explore-search/explore-videos"
                className="text-base font-normal text-white"
              >
                <div className="my-2 w-full">
                  <span className="px-6">All</span>
                </div>
                {isItemActive("/explore-search/explore-videos") && (
                  <div className="w-full h-1 bg-[#62C860] rounded-lg"></div>
                )}
              </a>
            </li>

            <li>
              <a
                href="/explore-search/explore-games"
                className="text-base font-normal text-white"
              >
                <div className="my-2 w-full">
                  <span className="px-6">Games</span>
                </div>
                {isItemActive("/explore-search/explore-games") && (
                  <div className="w-full h-1 bg-[#62C860] rounded-lg"></div>
                )}
              </a>
            </li>

            <li>
              <a
                href="/explore-search/explore-videos"
                className="text-base font-normal text-white"
              >
                <div className="my-2 w-full">
                  <span className="px-6">Videos</span>
                </div>
                {isItemActive("/explore-search/explore-videos") && (
                  <div className="w-full h-1 bg-[#62C860] rounded-lg"></div>
                )}
              </a>
            </li>

            <li>
              <a
                href="/explore-search/explore-user"
                className="text-base font-normal text-white"
              >
                <div className="my-2 w-full">
                  <span className="px-6">Users</span>
                </div>
                {isItemActive("/explore-search/explore-user") && (
                  <div className="w-full h-1 bg-[#62C860] rounded-lg"></div>
                )}
              </a>
            </li>
          </ul>
        </div>

        <div
          style={sectionStyle}
          className="flex flex-col bg-[#091619] py-2 overflow-y-scroll no-scrollbar"
        >
          <div className="flex items-center">
            <div className="flex justify-between items-center w-full sm:mx-2 lg:mx-4">
              <div>
                <p className="font-semibold text-base sm:text-lg lg:text-lg text-white">
                  Trending Games
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

          <div className="flex items-center my-2">
            <div className="flex items-center overflow-scroll no-scrollbar gap-2 px-4">
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

          <div className="flex items-center">
            <div className="flex justify-between items-center w-full sm:mx-2 lg:mx-4">
              <div>
                <p className="font-semibold text-base sm:text-lg lg:text-lg text-white">
                  Recommended Users
                </p>
              </div>
              <div className="flex items-center">
                <Link
                  href="/explore-search/explore-games"
                  className="text-md sm:text-md lg:text-md hover:opacity-80 cursor-pointer text-red"
                >
                  View All
                </Link>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center mx-2">
            {userState?.userList?.slice(0, 4).map((user: any) => (
              <div
                key={user?.userID}
                className="flex flex-col w-full h-44 gap-2 border-2 border-[#1C2C2E] rounded-xl mx-1 my-2 overflow-scroll no-scrollbar"
              >
                <div className="flex items-center w-full gap-4 mb-2">
                  <Image
                    className="rounded-xl w-16 h-16 mt-2 ml-2 object-cover"
                    src={user?.profilePicture}
                    width={10}
                    height={10}
                    sizes="100vw"
                    alt="Account Profile"
                  />
                  <div>
                    <div>
                      <span className="text-white">{user?.name}</span>
                    </div>
                    <div
                      className="flex items-center"
                      onClick={() => copyToClipboard(user?.username)}
                    >
                      <p className="text-white">
                        ({user?.username || "no_username"})
                      </p>
                      <Image
                        className="cursor-pointer hover:opacity-80"
                        src={SVG.AccountCopyUsername}
                        width={16}
                        height={16}
                        alt="Copy Username"
                      />
                    </div>
                  </div>
                </div>

                <hr className="h-px border-0 bg-[#1C2C2E] mb-1 w-full rounded-full" />

                <div className="flex flex-col flex-wrap justify-center text-center lg:justify-start lg:text-start">
                  <div className="flex items-center justify-center gap-1">
                    <div className="flex flex-col">
                      <span
                        className={`${leagueGothic.className} flex justify-center text-lg md:text-2xl font-normal text-white`}
                      >
                        {userVideos.length || 0}
                      </span>
                      <span className="md:text-lg text-gray-400">Posts</span>
                    </div>

                    {/* Vertical divider */}
                    <div className="border-r border-[#1C2C2E] h-12 rounded-full"></div>

                    <div
                      className="flex flex-col"
                      // onClick={() => handleModalToggle("isFollowerModalOpen")}
                    >
                      <span
                        className={`${leagueGothic.className} flex justify-center text-lg md:text-2xl font-normal text-white`}
                      >
                        {user?.follower?.length || 0}
                      </span>
                      <span className="md:text-lg text-gray-400">
                        Followers
                      </span>
                    </div>
                    {/* Vertical divider */}
                    <div className="border-r border-[#1C2C2E] h-12 rounded-full"></div>

                    <div
                      className="flex-col"
                      // onClick={() => handleModalToggle("isFollowingModalOpen")}
                    >
                      <span
                        className={`${leagueGothic.className} flex justify-center text-lg md:text-2xl font-normal text-white`}
                      >
                        {user?.following?.length || 0}
                      </span>
                      <span className="md:text-lg text-gray-400">
                        Following
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center">
            <div className="flex justify-between items-center w-full sm:mx-2 lg:mx-4">
              <div>
                <p className="font-semibold text-base sm:text-lg lg:text-lg text-white">
                  Recommended Videos
                </p>
              </div>
              <div className="flex items-center">
                <Link
                  href="/explore-search/explore-games"
                  className="text-md sm:text-md lg:text-md hover:opacity-80 cursor-pointer text-red"
                >
                  View All
                </Link>
              </div>
            </div>
          </div>

          <div className="flex items-center mx-2">
            {postState.videos.slice(0, 4).map((item: any) => (
              <div
                key={item?.userID}
                className="flex flex-col w-full h-full gap-2 border-2 border-[#1C2C2E] rounded-xl mx-1 my-2 pb-2 overflow-scroll no-scrollbar"
                onClick={() =>
                  handleModalToggle("isVideoDetailOpen", item._id, item)
                }
              >
                <div className="relative">
                  <video
                    src={item.video}
                    className="w-full h-full sm:w-full sm:h-full rounded-2xl hover:opacity-80 p-2"
                    width={50}
                    height={50}
                    controls={false}
                    autoPlay={false}
                    onLoadedMetadata={(e) => handleVideoMetadata(e, item._id)}
                  />

                  <span className="absolute bottom-2 right-2">
                    {formatTime(videoDurations[item._id])}
                  </span>
                </div>

                <div>
                  <div className="flex items-center w-full gap-4 mb-2">
                    <Image
                      className="rounded-xl w-5 h-5 ml-2 object-cover"
                      src={item?.profilePicture}
                      width={10}
                      height={10}
                      sizes="100vw"
                      alt="Account Profile"
                    />
                    <div>
                      <div>
                        <span className="text-white">
                          {/* {item?.name} */}
                          Sara Collin
                        </span>
                      </div>
                      <div className="flex items-center">
                        <p className="text-sm font-light text-gray-400">
                          10 minutes ago
                          {/* {post?.date &&
                              new Date(post.date).toLocaleString("en-US", {
                                hour: "numeric",
                                minute: "numeric",
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })} */}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col flex-wrap justify-center text-center lg:justify-start lg:text-start">
                    <div className="flex items-center justify-between mx-4">
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
                </div>
              </div>
            ))}
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
