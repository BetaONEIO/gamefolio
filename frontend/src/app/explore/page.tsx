"use client";
import { SVG } from "@/assets/SVG";
import Modal from "@/components/Modals/Modal";
import VideoDetails from "@/components/Modals/VideoDetails";
import { leagueGothic } from "@/font/font";
import { fetchGameList } from "@/services/api";
import { dispatch, useSelector } from "@/store";
import { userSession } from "@/store/slices/authSlice";
import {
  getAllPostVideos,
  refreshPage,
  updateDetailedPost,
} from "@/store/slices/postSlice";
import { getAllUsers } from "@/store/slices/userSlice";
import { copyToClipboard } from "@/utils/helpers";
import { getCookieValue, getFromLocal } from "@/utils/localStorage";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

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

const SkeletonLoaderUserProfile = () => (
  <div className="flex flex-col border-2 border-[#1C2C2E] rounded-xl animate-pulse  pt-1 pb-4 px-2 gap-1">
    <div className="flex items-center gap-4 mb-2 p-2">
      <div className="rounded-xl w-12 h-12 bg-gray-700"></div>
      <div className="flex flex-col space-y-2">
        <div className="w-24 h-4 bg-gray-700 rounded"></div>
        <div className="w-32 h-4 bg-gray-700 rounded"></div>
      </div>
    </div>

    <hr className="h-px border-0 bg-[#1C2C2E] w-full rounded-full my-2" />

    <div className="flex flex-col flex-wrap justify-center text-center lg:justify-start lg:text-start p-2">
      <div className="flex items-center justify-center gap-1">
        <div className="flex flex-col items-center">
          <div className="w-10 h-6 bg-gray-700 rounded"></div>
          <div className="w-14 h-4 bg-gray-700 rounded mt-1"></div>
        </div>
        <div className="border-r border-[#1C2C2E] h-12 rounded-full mx-2"></div>
        <div className="flex flex-col items-center">
          <div className="w-10 h-6 bg-gray-700 rounded"></div>
          <div className="w-14 h-4 bg-gray-700 rounded mt-1"></div>
        </div>
        <div className="border-r border-[#1C2C2E] h-12 rounded-full mx-2"></div>
        <div className="flex flex-col items-center">
          <div className="w-10 h-6 bg-gray-700 rounded"></div>
          <div className="w-14 h-4 bg-gray-700 rounded mt-1"></div>
        </div>
      </div>
    </div>
  </div>
);

const SkeletonLoaderVideo = () => {
  return (
    <div className="flex-shrink-0 flex flex-col gap-2 w-68 h-48 border-2 border-[#1C2C2E] rounded-xl mx-1 animate-pulse overflow-x-auto">
      <div className="relative w-full h-36 bg-gray-700 rounded-2xl"></div>
      <div className="flex items-center gap-4">
        <div className="w-10 h-6 ml-2 bg-gray-700 rounded-xl"></div>
        <div>
          <div className="w-24 h-4 bg-gray-700 rounded"></div>
          <div className="w-16 h-3 mt-1 bg-gray-700 rounded"></div>
        </div>
      </div>
      <div className="flex items-center justify-between text-center mx-4">
        <div className="w-6 h-2 bg-gray-700 rounded-full"></div>
        <div className="w-6 h-2 bg-gray-700 rounded-full"></div>
        <div className="w-6 h-2 bg-gray-700 rounded-full"></div>
      </div>
    </div>
  );
};

function Explore() {
  const postState = useSelector((state: any) => state.post) || [];
  const userState = useSelector((state: any) => state.user) || [];
  const [videoDurations, setVideoDurations] = useState<{
    [key: string]: number;
  }>({});
  const [postID, setPostID] = useState("");
  const [detailedPost, setDetailedPost] = useState("");
  const [optionsForGame, setOptionsForGame] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState(optionsForGame);
  const [modalState, setModalState] = useState({
    isVideoDetailOpen: false,
  });

  const { loading } = postState;

  useEffect(() => {
    const payload = {
      userToken: getFromLocal("@token") || getCookieValue("gfoliotoken"),
    };
    const params = { payload };

    dispatch(userSession(params));
    dispatch(getAllPostVideos());
    dispatch(getAllUsers());
    handleGameList();
  }, [postState.refresh]);

  useEffect(() => {
    setFilteredOptions(optionsForGame);
  }, [optionsForGame]);

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

  const handleGameList = async () => {
    const gettingGameList = await fetchGameList();
    setOptionsForGame(gettingGameList);
  };

  // if (postState.loading) return <Loading />;

  const userVideos = userState.userList?.map((user: any) => {
    const videosForUser = postState.videos?.filter(
      (post: any) => post?.userID?.username === user.username
    );
    return { username: user.username, videoCount: videosForUser?.length };
  });

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

  return (
    <div className="flex flex-col gap-4 py-2  mx-4 pb-40 md:pb-0">
      <div className="flex items-center">
        <div className="flex justify-between items-center w-full">
          <div>
            <p className="font-semibold text-base sm:text-lg lg:text-lg text-white">
              Trending Games
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
        <div className="flex items-center overflow-scroll no-scrollbar gap-2">
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
                    className="w-28 h-40 hover:scale-105 transition-transform duration-100"
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

      <div className="flex items-center">
        <div className="flex justify-between items-center w-full">
          <div>
            <p className="font-semibold text-base sm:text-lg lg:text-lg text-white">
              Recommended Users
            </p>
          </div>
          <div className="flex items-center">
            <Link
              href="/explore/users"
              className="text-md sm:text-md lg:text-md hover:opacity-80 cursor-pointer underline text-[#62C860]"
            >
              View All
            </Link>
          </div>
        </div>
      </div>

      <div className="flex items-center h-48 my-2 overflow-scroll no-scrollbar gap-4">
        {userState?.userList?.length === 0 ? (
          <>
            {[...Array(6)]?.map((_, index) => (
              <SkeletonLoaderUserProfile key={index} />
            ))}
          </>
        ) : (
          userState?.userList?.slice(0, 10)?.map((user: any) => (
            <div
              key={user?.userID}
              className="flex flex-col border-2 border-[#1C2C2E] rounded-xl pt-1 pb-4 px-2 gap-1"
            >
              <div className="flex items-center gap-4 mb-2">
                <Image
                  className="rounded-xl w-12 h-12 mt-2 ml-2 object-cover"
                  src={user?.profilePicture}
                  width={10}
                  height={10}
                  sizes="100vw"
                  alt="profile"
                />
                <Link href={`/account/${user?.username}`} key={user._id}>
                  <div>
                    <div className="mt-2">
                      <span className="font-semibold text-white hover:text-[#43DD4E]">
                        {user?.name?.split(" ").slice(0, 2).join(" ")}
                      </span>
                    </div>
                    <div
                      className="flex items-center"
                      onClick={() => copyToClipboard(user?.username)}
                    >
                      <p className="text-white  hover:text-[#43DD4E]">
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
                </Link>
              </div>

              <hr className="h-px border-0 bg-[#1C2C2E] w-full rounded-full my-2" />

              <div className="flex flex-col flex-wrap justify-center text-center lg:justify-start lg:text-start">
                <div className="flex items-center justify-center gap-1">
                  <div className="flex flex-col">
                    <span
                      className={`${leagueGothic.className} flex justify-center text-lg md:text-2xl font-normal text-white`}
                    >
                      {userVideos.find(
                        (video: any) => video.username === user.username
                      )?.videoCount || 0}
                    </span>
                    <span className="md:text-base text-gray-400">Posts</span>
                  </div>

                  {/* Vertical divider */}
                  <div className="border-r border-[#1C2C2E] h-12 rounded-full"></div>

                  <div className="flex flex-col">
                    <span
                      className={`${leagueGothic.className} flex justify-center text-lg md:text-2xl font-normal text-white`}
                    >
                      {user?.followers?.length || 0}
                    </span>
                    <span className="md:text-base text-gray-400">
                      Followers
                    </span>
                  </div>
                  {/* Vertical divider */}
                  <div className="border-r border-[#1C2C2E] h-12 rounded-full"></div>

                  <div className="flex-col">
                    <span
                      className={`${leagueGothic.className} flex justify-center text-lg md:text-2xl font-normal text-white`}
                    >
                      {user?.following?.length || 0}
                    </span>
                    <span className="md:text-base text-gray-400">
                      Following
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="flex items-center">
        <div className="flex justify-between items-center w-full">
          <div>
            <p className="font-semibold text-base sm:text-lg lg:text-lg text-white">
              Recommended Videos
            </p>
          </div>
          <div className="flex items-center">
            <Link
              href="/explore/videos"
              className="text-md sm:text-md lg:text-md hover:opacity-80 cursor-pointer underline text-[#62C860]"
            >
              View All
            </Link>
          </div>
        </div>
      </div>

      <div className="flex items-center  my-2 overflow-scroll no-scrollbar gap-4">
        {loading ? (
          <>
            {[...Array(4)]?.map((_, index) => (
              <SkeletonLoaderVideo key={index} />
            ))}
          </>
        ) : postState.videos?.length === 0 ? (
          <div className="flex w-full h-20  justify-center items-center text-gray-500">
            No data available
          </div>
        ) : (
          postState.videos?.slice(0, 4)?.map((item: any) => (
            <div
              key={item?.userID}
              className="flex-shrink-0 flex flex-col gap-2 w-64 h-64 border-2 border-[#1C2C2E] rounded-xl mx-1 pb-2 cursor-pointer hover:opacity-80"
              onClick={() =>
                handleModalToggle("isVideoDetailOpen", item._id, item)
              }
            >
              <div className="relative overflow-hidden rounded-xl">
                <video
                  src={item.video}
                  className="w-full h-36 rounded-xl hover:opacity-80 hover:scale-105 transition-transform duration-300"
                  controls={false}
                  autoPlay={false}
                  width={50}
                  height={50}
                  onLoadedMetadata={(e) => handleVideoMetadata(e, item._id)}
                />
                <span className="absolute bottom-2 right-3">
                  {formatTime(videoDurations[item._id])}
                </span>
              </div>
              <div className="flex items-center gap-4 mb-2">
                <Image
                  className="rounded-xl w-10 h-10 ml-2 object-cover"
                  src={item?.userID?.profilePicture}
                  alt="Account Profile"
                  height={10}
                  width={10}
                  sizes="100vw"
                />
                <div>
                  <div>
                    <span className="font-semibold text-xs sm:text-sm text-white hover:text-[#43DD4E]">
                      {item?.userID?.name.split(" ").slice(0, 2).join(" ")}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <p className="text-sm font-light text-gray-400 hover:opacity-80">
                      {formatTimeAgo(item.date)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-center mx-4">
                <div className="flex items-center">
                  <Image
                    className="mr-2 cursor-pointer hover:opacity-80"
                    src={SVG.Like}
                    alt="Like"
                    width={20}
                    height={20}
                  />
                  <p className="text-white">
                    {
                      item.reactions?.filter(
                        (reaction: any) => reaction.reactionType === "like"
                      )?.length
                    }
                  </p>
                </div>
                <div className="flex items-center">
                  <Image
                    className="mr-2 cursor-pointer hover:opacity-80"
                    src={SVG.Love}
                    alt="Love"
                    width={20}
                    height={20}
                  />
                  <p className="text-white">
                    {
                      item.reactions?.filter(
                        (reaction: any) => reaction.reactionType === "love"
                      )?.length
                    }
                  </p>
                </div>
                <div className="flex items-center">
                  <Image
                    className="mr-2 cursor-pointer hover:opacity-80"
                    src={SVG.Comment}
                    alt="Comment"
                    width={25}
                    height={25}
                  />
                  <p className="text-white">{item.comments?.length}</p>
                </div>
              </div>
            </div>
          ))
        )}
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

export default Explore;
