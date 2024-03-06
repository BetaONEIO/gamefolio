"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { dispatch, useSelector } from "@/store";
import { leagueGothic } from "@/font/font";
import { userSession } from "@/store/slices/authSlice";
import { getAllPostVideos, refreshPage } from "@/store/slices/postSlice";
import { getAllUsers } from "@/store/slices/userSlice";
import { copyToClipboard } from "@/utils/helpers";
import { getCookieValue, getFromLocal } from "@/utils/localStorage";
import { usePathname } from "next/navigation";
import { SVG } from "@/assets/SVG";
import Modal from "@/components/Modals/Modal";
import VideoDetails from "@/components/Modals/VideoDetails";

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

  const userVideos = userState.userList.map((user: any) => {
    const videosForUser = postState.videos.filter(
      (post: any) => post?.userID?.username === user.username
    );
    return { username: user.username, videoCount: videosForUser.length };
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
    <div className="flex flex-col py-2 overflow-y-scroll no-scrollbar mx-4">
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

      <div className="flex items-center p-2 overflow-scroll no-scrollbar gap-2">
        {userState?.userList?.slice(0, 10).map((user: any) => (
          <div
            key={user?.userID}
            className="flex flex-col border-2 border-[#1C2C2E] rounded-xl"
          >
            <div className="flex items-center gap-4 mb-2">
              <Image
                className="rounded-xl w-12 h-12 mt-2 ml-2 object-cover"
                src={user?.profilePicture}
                width={10}
                height={10}
                sizes="100vw"
                alt="Account Profile"
              />
              <div>
                <div className="mt-2">
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

            <hr className="h-px border-0 bg-[#1C2C2E] w-full rounded-full" />

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
                  <span className="md:text-lg text-gray-400">Posts</span>
                </div>

                {/* Vertical divider */}
                <div className="border-r border-[#1C2C2E] h-12 rounded-full"></div>

                <div className="flex flex-col">
                  <span
                    className={`${leagueGothic.className} flex justify-center text-lg md:text-2xl font-normal text-white`}
                  >
                    {user?.followers?.length || 0}
                  </span>
                  <span className="md:text-lg text-gray-400">Followers</span>
                </div>
                {/* Vertical divider */}
                <div className="border-r border-[#1C2C2E] h-12 rounded-full"></div>

                <div className="flex-col">
                  <span
                    className={`${leagueGothic.className} flex justify-center text-lg md:text-2xl font-normal text-white`}
                  >
                    {user?.following?.length || 0}
                  </span>
                  <span className="md:text-lg text-gray-400">Following</span>
                </div>
              </div>
            </div>
          </div>
        ))}
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

      <div className="flex items-center gap-2 mt-2 overflow-x-auto">
        {postState.videos.slice(0, 8).map((item: any) => (
          <div
            key={item?.userID}
            className="flex-shrink-0 flex flex-col gap-2 w-68 h-64 border-2 border-[#1C2C2E] rounded-xl mx-1 pb-2"
            onClick={() =>
              handleModalToggle("isVideoDetailOpen", item._id, item)
            }
          >
            <div className="relative">
              <video
                src={item.video}
                className="w-full h-36 rounded-2xl hover:opacity-80"
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
                  <span className="text-xs sm:text-sm text-white">
                    {item?.userID?.name}
                  </span>
                </div>
                <div className="flex items-center">
                  <p className="text-sm font-light text-gray-400">
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
                    item.reactions.filter(
                      (reaction: any) => reaction.reactionType === "like"
                    ).length
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
                    item.reactions.filter(
                      (reaction: any) => reaction.reactionType === "love"
                    ).length
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
                <p className="text-white">{item.comments.length}</p>
              </div>
            </div>
          </div>
        ))}
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

export default Explore;
