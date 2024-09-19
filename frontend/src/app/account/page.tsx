"use client";
import { SVG } from "@/assets/SVG";
import CustomHeader from "@/components/CustomHeader/CustomHeader";
import Layout from "@/components/CustomLayout/layout";
import AddClips from "@/components/Modals/AddClips";
import AddVideo from "@/components/Modals/AddVideo";
import Followers from "@/components/Modals/Followers";
import Following from "@/components/Modals/Following";
import Modal from "@/components/Modals/Modal";
import MoreOptions from "@/components/Modals/MoreOptions";
import VideoDetails from "@/components/Modals/VideoDetails";
import { toastError, toastSuccess } from "@/components/Toast/Toast";
import { leagueGothic } from "@/font/font";
import { BASE_URL } from "@/services/api";
import { dispatch, useSelector } from "@/store";
import { updateCover, userSession } from "@/store/slices/authSlice";
import {
  getAllPostVideos,
  getTrendingPosts,
  getUserBookmark,
  removeUserBookmark,
  updateDetailedPost,
} from "@/store/slices/postSlice";
import { getProfileInfo } from "@/store/slices/userSlice";
import { copyToClipboard } from "@/utils/helpers";
import { getCookieValue, getFromLocal } from "@/utils/localStorage";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";

interface MyVideosSectionProps {
  authState: any;
  postState: any;
  handleVideoDetailOpen: (postID: any, detailedPost: any) => void;
}

const MyVideosSection: React.FC<MyVideosSectionProps> = ({
  authState,
  postState,
  handleVideoDetailOpen,
}) => {
  const userVideos = postState.videos?.filter(
    (post: any) => post?.userID?._id === authState._id
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full p-4">
      {userVideos?.map((item: any) => {
        return (
          <div key={item._id} className="relative">
            <video
              src={item.video}
              className="w-96 sm:w-96 h-52 md:h-40  rounded-xl object-cover hover:opacity-80"
              width={20}
              height={20}
              controls={false}
              onClick={() => handleVideoDetailOpen(item._id, item)}
            />
            <div className="absolute bottom-1 right-2">
              <button className="cursor-pointer hover:opacity-80">
                <Image src={SVG.Mute} alt="Mute" width={40} height={40} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

interface MyBookmarkSectionProps {
  data: Array<any>;
  handleVideoDetailOpen: (postID: any, detailedPost: any) => void;
}

const MyBookmarkSection: React.FC<MyBookmarkSectionProps> = ({
  data,
  handleVideoDetailOpen,
}) => {
  const authState = useSelector((state: any) => state.auth.userData) || [];
  const handleRemoveBookmark = async (postID: any) => {
    const payload = {
      authUserID: authState._id,
      userID: data[0]?.bookmarkInfo?.userID,
      postID: postID,
    };

    const successCallback = (response: any) => {
      toastSuccess(response);
    };

    const errorCallback = (error: string) => {
      toastError(error);
    };

    const params = {
      payload,
      successCallback,
      errorCallback,
    };

    dispatch(removeUserBookmark(params));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full p-4">
      {data?.map((bookmarkPost) => (
        <div key={bookmarkPost.post._id} className="relative">
          <video
            src={bookmarkPost.post.video}
            className="w-96 sm:w-96 h-52 md:h-40  rounded-xl object-cover hover:opacity-80"
            width={0}
            height={0}
            controls={false}
            onClick={() =>
              handleVideoDetailOpen(bookmarkPost.post._id, bookmarkPost.post)
            }
          />
          <Image
            className="absolute top-2 right-2 cursor-pointer hover:opacity-70"
            src={SVG.Bookmark}
            alt="Play"
            width={24}
            height={24}
            sizes="100vw"
            onClick={() => handleRemoveBookmark(bookmarkPost.post._id)}
          />
        </div>
      ))}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

function Account() {
  const authState = useSelector((state: any) => state.auth.userData) || [];
  const postState = useSelector((state: any) => state.post) || [];
  const profileInfoState = useSelector((state: any) => state.user) || [];
  const [playstation, setPlaystation] = useState("");
  const [twitch, setTwitch] = useState("");
  const [xbox, setXbox] = useState("");
  const [steam, setSteam] = useState("");
  const [update, setUpdate] = useState<Boolean>(false);
  const [image, setImage] = useState<File | null>(null);
  const [selectedSection, setSelectedSection] = useState("videos");
  const [postID, setPostID] = useState("");
  const [modalState, setModalState] = useState({
    isShareModalOpen: false,
    isFollowerModalOpen: false,
    isFollowingModalOpen: false,
    isBadgeModalOpen: false,
    isVideoDetailOpen: false,
    isAddClipsOpen: false,
    isAddVideoOpen: false,
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      coverPicture: "",
    },
  });

  const totalCoinAmount = authState?.coins?.reduce(
    (total: any, user: any) => total + user.coinAmount,
    0
  );

  const badges = [
    {
      id: 1,
      Image: SVG.Badge1,
      userName: "Quick Starter",
      Name: "Milestone 1000 coins",
      coins: 10,
    },
    {
      id: 2,
      Image: SVG.Badge2,
      userName: "Rapid Riser",
      Name: "Milestone 1000 coins",
      coins: 1000,
    },
    {
      id: 3,
      Image: SVG.Badge3,
      userName: "Swift Performer",
      Name: "Milestone 3000 coins",
      coins: 3000,
    },
    {
      id: 4,
      Image: SVG.Badge4,
      userName: "Speedy Striver",
      Name: "Milestone 5000 coins",
      coins: 5000,
    },
    {
      id: 5,
      Image: SVG.Badge5,
      userName: "Fast Tracker",
      Name: "Milestone 8000 coins",
      coins: 8000,
    },
    {
      id: 6,
      Image: SVG.Badge6,
      userName: "Blazing Achiever",
      Name: "Milestone 10000 coins",
      coins: 10000,
    },
    {
      id: 7,
      Image: SVG.Badge7,
      userName: "Hyper Performer",
      Name: "Milestone 15000 coins",
      coins: 15000,
    },
    {
      id: 8,
      Image: SVG.Badge8,
      userName: "Lightning Leader",
      Name: "Milestone 20000 coins",
      coins: 20000,
    },
    {
      id: 9,
      Image: SVG.Badge9,
      userName: "Supersonic Champion",
      Name: "Milestone 50000 coins",
      coins: 50000,
    },
  ];

  const achievedBadges = badges?.filter(
    (badge) => totalCoinAmount >= badge.coins
  );

  const userVideos = postState.videos?.filter(
    (post: any) => post?.userID?._id === authState._id
  );

  const payload = {
    userToken: getFromLocal("@token") || getCookieValue("gfoliotoken"),
  };
  const params = {
    payload,
  };
  useEffect(() => {
    dispatch(userSession(params));
    dispatch(getUserBookmark(params));
    dispatch(getProfileInfo({ payload: params }));
    dispatch(getTrendingPosts());
    dispatch(getAllPostVideos());
  }, [postState.refresh]);

  useEffect(() => {
    if (update === true) {
      handleSubmit(handleUpdateCover)();
    }
  }, [update === true]);

  const handleModalToggle = (modalName: keyof typeof modalState) => {
    setModalState((prevState) => ({
      ...prevState,
      [modalName]: !prevState[modalName],
    }));
  };

  const handleVideoDetailOpen = (postID: string, detailedPost: any) => {
    setPostID(postID);
    dispatch(updateDetailedPost(detailedPost));
    setModalState((prevState) => ({
      ...prevState,
      isVideoDetailOpen: true,
    }));
  };

  const onUpdateCoverPicture = (value: string) => {
    setValue("coverPicture", value);
    setUpdate(true);
  };

  const handleUploadImage = async (e: any) => {
    console.log("yess click");
    const file = e.target.files ? e.target.files[0] : null;
    console.log("file: ", file);
    if (file) {
      setImage(file);
      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios.post(
          `${BASE_URL}/storage/image/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        onUpdateCoverPicture(response.data.imageURL);
        toastSuccess(response.data.message);
      } catch (error) {
        toastError(error);
      }
    }
  };

  const handleUpdateCover = (data: any) => {
    const payload = {
      userID: authState._id,
      ...data,
    };

    const successCallback = (response: any) => {
      toastSuccess(response);
      setUpdate(false);
    };

    const errorCallback = (error: string) => {
      toastError(error);
      setUpdate(false);
    };

    const params = {
      payload,
      successCallback,
      errorCallback,
    };
    dispatch(updateCover(params));
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

  function handlePageRefresh(): void {
    throw new Error("Function not implemented.");
  }

  const backgroundImage = `url(${authState.coverPicture})`;

  const sectionStyle = {
    backgroundImage: `linear-gradient(to bottom, rgba(4, 50, 12, 1), rgba(4, 50, 12, 0) 10%)`,
  };

  return (
    <Layout>
      {/* Header */}
      <CustomHeader>ACCOUNT</CustomHeader>

      <div style={sectionStyle} className=" pt-4 z-50">
        <div
          className=" disable-blur flex flex-col relative items-center lg:flex-row lg:justify-center gap-4 h-60 mx-4 my-4"
          style={{
            background: `linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.6) 40%, rgba(9, 22, 25, 0.7) 99%), ${backgroundImage} no-repeat center / cover`,
            backgroundSize: "cover",
            backfaceVisibility: "visible",
          }}
        >
          {/* Black shade overlay */}

          <div className="w-32 h-40">
            <Image
              className="rounded-xl w-32 h-32 object-cover border-2 border-[#43DD4E]"
              src={authState?.profilePicture}
              width={10}
              height={10}
              sizes="100vw"
              alt="Account Profile"
            />
          </div>

          <div className="flex justify-between w-9/12">
            <div
              key={authState?.userID}
              className="flex flex-1 flex-col gap-2 flex-wrap justify-center text-center lg:justify-start lg:text-start p-2"
            >
              <span className="font-semibold text-white">
                {authState?.name}
              </span>
              <div className="flex items-center gap-6 justify-center lg:justify-between">
                <div
                  className="flex items-center"
                  onClick={() => copyToClipboard(authState?.username)}
                >
                  <p className="text-white">
                    ({authState?.username || "no_username"})
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

              <div className="flex h-8 items-center justify-start md:gap-8">
                <div className="flex items-center gap-2 ">
                  <span
                    className={`${leagueGothic.className} text-lg md:text-2xl font-normal text-white`}
                  >
                    {userVideos?.length || 0}
                  </span>
                  <span className="md:text-lg text-gray-400">Posts</span>
                </div>

                {/* Vertical divider */}
                <div className="border-r border-gray-700 h-full rounded-full mx-2"></div>
                <div
                  className="flex items-center gap-2 hover:opacity-80 cursor-pointer"
                  onClick={() => handleModalToggle("isFollowerModalOpen")}
                >
                  <span
                    className={`${leagueGothic.className} text-lg md:text-2xl font-normal text-white`}
                  >
                    {authState?.follower?.length || 0}
                  </span>
                  <span className="md:text-lg text-gray-400">Followers</span>
                </div>
                {/* Vertical divider */}
                <div className="border-r border-gray-700 h-full  rounded-full mx-2"></div>

                <div
                  className="flex items-center gap-2 hover:opacity-80 cursor-pointer"
                  onClick={() => handleModalToggle("isFollowingModalOpen")}
                >
                  <span
                    className={`${leagueGothic.className} text-lg md:text-2xl font-normal text-white`}
                  >
                    {authState?.following?.length || 0}
                  </span>
                  <span className="md:text-lg text-gray-400">Following</span>
                </div>
              </div>

              <div className="hidden sm:block">
                <h1 className="text-white text-md font-semibold">About Me!</h1>
                <p className="text-gray-400">{authState?.bio}</p>
              </div>
            </div>

            <label htmlFor="dropzone-file">
              <div className="flex w-8 h-8 md:w-fit md:h-fit p-1 md:px-2 items-center md:border-2 border-gray-50 rounded-xl gap-2 hover:opacity-80 cursor-pointer ">
                <Image
                  className="w-fit h-fit object-cover"
                  src={SVG.Camera2}
                  width={10}
                  height={10}
                  sizes="100vw"
                  alt="Account Profile"
                />
                <p className="hidden md:block text-white text-xs md:text-sm">
                  Edit coverphoto
                </p>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={handleUploadImage}
                />
              </div>
            </label>
          </div>
        </div>

        {/* Stories */}
        {/* <CurrentUserStories /> */}

        {/* Top Bar */}

        <div className="flex mx-3">
          <div className="hidden w-2/5  md:flex flex-col sm:w-60 md:w-60 lg:w-96 h-80 border-2 border-[#1C2C2E] rounded-lg p-1">
            <h1 className="text-white font-bold my-2">Connect</h1>
            <div className="relative flex items-center space-x-2 rounded-lg bg-[#162423] p-2 mt-2">
              <Image
                src={SVG.PlayStation}
                alt="Connect with Playstation"
                width={10}
                height={10}
                className="rounded-xl w-10 h-10 object-cover"
              />
              <input
                className="hidden lg:block text-white font-normal text-xs bg-[#162423] outline-none py-3"
                placeholder={
                  profileInfoState?.profileUserInfo?.socialUsernames?.find(
                    (social: any) => social.playstation
                  )?.playstation || "Connect with Playstation"
                }
                value={playstation}
                onChange={(e) => setPlaystation(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2 rounded-lg bg-[#162423] p-2 mt-2">
              <Image
                className="rounded-xl w-10 h-10 object-cover"
                src={SVG.Twitch}
                width={10}
                height={10}
                sizes="100vw"
                alt="Account Profile"
              />
              <input
                className="hidden lg:block text-white font-normal text-xs bg-[#162423] outline-none py-3"
                placeholder={
                  profileInfoState?.profileUserInfo?.socialUsernames?.find(
                    (social: any) => social.twitch
                  )?.twitch || "Connect with Twitch"
                }
                value={twitch}
                onChange={(e) => setTwitch(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2 rounded-lg bg-[#162423] p-2 mt-2">
              <Image
                className="rounded-xl w-10 h-10 object-cover"
                src={SVG.Xbox}
                width={10}
                height={10}
                sizes="100vw"
                alt="Account Profile"
              />
              <input
                className="hidden lg:block text-white font-normal text-xs bg-[#162423] outline-none py-3"
                placeholder={
                  profileInfoState?.profileUserInfo?.socialUsernames?.find(
                    (social: any) => social.xbox
                  )?.xbox || "Connect with xbox"
                }
                value={xbox}
                onChange={(e) => setXbox(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2 rounded-lg bg-[#162423] p-2 mt-2">
              <Image
                className="rounded-xl w-10 h-10 object-cover"
                src={SVG.Steam}
                width={10}
                height={10}
                sizes="100vw"
                alt="Account Profile"
              />
              <input
                className="hidden lg:block text-white font-normal text-xs bg-[#162423] outline-none py-3"
                placeholder={
                  profileInfoState?.profileUserInfo?.socialUsernames?.find(
                    (social: any) => social.steam
                  )?.steam || "Connect with steam"
                }
                value={steam}
                onChange={(e) => setSteam(e.target.value)}
              />
            </div>
          </div>

          <div className="sm:w-[500px] md:w-[600px] lg:w-[800px]  justify-around items-center h-10">
            {/* Profile */}
            <div key={authState?.userID} className="flex flex-col gap-4 mx-4">
              <div className="h-10 w-full flex justify-around items-center">
                <div>
                  <div
                    className={`flex w-48 gap-2 my-6 items-center cursor-pointer ${
                      selectedSection === "videos"
                        ? "text-white"
                        : "text-gray-500"
                    }`}
                    onClick={() => setSelectedSection("videos")}
                  >
                    <Image
                      className={`${
                        selectedSection !== "videos"
                          ? "opacity-40"
                          : "opacity-100"
                      }`}
                      src={SVG.AccountMyVideos}
                      alt="My Videos"
                      width={24}
                      height={24}
                    />
                    <span className="text-white text-xs md:text-base">
                      My Videos
                    </span>
                  </div>
                  {selectedSection === "videos" && (
                    <div className="w-full h-1 bg-[#62C860] rounded-lg"></div>
                  )}
                </div>

                <div className="">
                  <div
                    className={`flex w-52 my-6 gap-2 items-center cursor-pointer ${
                      selectedSection === "bookmarked"
                        ? "text-white"
                        : "text-gray-500"
                    }`}
                    onClick={() => setSelectedSection("bookmarked")}
                  >
                    <Image
                      className={`${
                        selectedSection !== "bookmarked"
                          ? "opacity-40"
                          : "opacity-100"
                      }`}
                      src={SVG.AccountMyBookmarked}
                      alt="My Bookmarked"
                      width={22}
                      height={22}
                    />
                    <span className="text-white text-xs md:text-base">
                      My Bookmarked
                    </span>
                  </div>
                  {selectedSection === "bookmarked" && (
                    <div className="w-full h-1 bg-[#62C860] rounded-lg"></div>
                  )}
                </div>
              </div>
              <hr className="h-px border-0 bg-gray-700" />

              <div className="flex flex-col border border-dashed border-green-800 rounded-lg px-4 py-4 justify-center items-start gap-4">
                <span className="text-white font-bold text-sm md:text-lg">
                  Post Now
                </span>
                <div className="flex w-full ">
                  <div
                    className="bg-[#162423] rounded-lg flex w-full justify-center items-center h-24 gap-4 cursor-pointer hover:opacity-80"
                    onClick={() => {
                      handleModalToggle("isAddVideoOpen");
                    }}
                  >
                    <div>
                      <Image
                        className="cursor-pointer w-fit"
                        src={SVG.Video}
                        alt="Threedots"
                        width={24}
                        height={24}
                      />
                    </div>
                    <p className="text-white font-bold">
                      Post to your Gamefolio
                    </p>
                  </div>
                </div>
              </div>
              {/* green line */}

              {/* Content Section */}
              {selectedSection === "videos" ? (
                <MyVideosSection
                  authState={authState}
                  postState={postState}
                  handleVideoDetailOpen={handleVideoDetailOpen}
                />
              ) : (
                <MyBookmarkSection
                  data={postState.bookmarks}
                  handleVideoDetailOpen={handleVideoDetailOpen}
                />
              )}
            </div>
          </div>

          <div className="hidden w-2/5 md:flex flex-col  sm:w-72 md:w-72 lg:w-96 h-screen border-2 border-[#1C2C2E] rounded-lg p-1 overflow-hidden overflow-y-auto">
            <h1 className="text-white font-bold m-2">Current Badge</h1>
            <div className="flex flex-row mt-2 overflow-x-scroll no-scrollbar mx-2">
              {achievedBadges?.map((badge, index) => (
                <div key={index}>
                  <Image
                    src={badge.Image}
                    alt="Badges"
                    width="30"
                    height="30"
                    sizes="100vw"
                  />
                </div>
              ))}
            </div>

            <div className="rounded-lg p-2 gap-3 mt-2">
              <h1 className="text-white font-bold">Suggested Videos:</h1>

              <div className="">
                {postState?.trendingVideos?.slice(0, 3)?.map((item: any) => (
                  <div
                    key={item._id}
                    className="border-2 h-48 border-[#1C2C2E] rounded-lg p-2 gap-3 mt-2 flex-wrap"
                  >
                    <div className="flex justify-end items-center pb-1 rounded-md">
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
                    <div className="flex">
                      <video
                        src={item.video}
                        className="w-20 h-24 rounded-xl object-cover hover:opacity-80"
                        width={20}
                        height={20}
                        controls={false}
                        onClick={() => handleVideoDetailOpen(item._id, item)}
                      />

                      <div className="flex flex-col gap-2 ml-2">
                        <div className="flex items-center gap-2">
                          <Image
                            className="w-9 h-10 rounded-lg"
                            src={item?.userID?.profilePicture}
                            alt="Profile"
                            width={50}
                            height={50}
                            sizes="100vw"
                            quality={80}
                            loading="lazy"
                          />
                          <div className="flex flex-col">
                            <h1 className="w-[180px] sm:w-[220px] text-xs md:text-xs sm:text-xs font-semibold text-white hover:opacity-80">
                              {item?.userID?.name.substring(0, 11)}
                            </h1>
                            <p className="text-xs font-light text-gray-400">
                              {formatTimeAgo(item.date)}
                            </p>
                          </div>
                        </div>
                        <p className="w-40 text-[0.70rem] font-light text-gray-400">
                          {item?.userID?.bio}
                          <Link
                            href={`/account/${item?.userID?.username}`}
                            key={item._id}
                          >
                            <span className="text-[#37C535] underline">
                              See more
                            </span>
                          </Link>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center my-3 mx-2">
                      <div className="flex items-center p-2 mr-2 rounded-lg bg-[#162423]">
                        <Image
                          className="mr-2 cursor-pointer hover:opacity-80"
                          src={SVG.Like}
                          alt="Like"
                          width={30}
                          height={30}
                        />
                        <p className="text-white"></p>
                      </div>

                      <div className="flex items-center p-2 mr-2 rounded-lg bg-[#162423]">
                        <Image
                          className="mr-2 cursor-pointer hover:opacity-80"
                          src={SVG.Love}
                          alt="Love"
                          width={30}
                          height={30}
                        />
                        <p className="text-white"></p>
                      </div>

                      <div className="p-2 mr-2 rounded-lg bg-[#162423]">
                        <Image
                          className="cursor-pointer hover:opacity-80"
                          src={SVG.Chat}
                          alt="Comment"
                          width={30}
                          height={30}
                        />
                      </div>

                      <div className="p-2 mr-2 rounded-lg bg-[#162423]">
                        <Image
                          className="cursor-pointer hover:opacity-80"
                          src={SVG.Trending}
                          alt="Trending1"
                          width={30}
                          height={30}
                        />
                      </div>

                      <Image
                        className="cursor-pointer hover:opacity-80"
                        src={SVG.GGGCoin}
                        alt="Gcoin"
                        width={45}
                        height={45}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Modal
          isOpen={modalState.isShareModalOpen}
          handleClose={() => handleModalToggle("isShareModalOpen")}
        >
          <MoreOptions
            handleCloseModal={() => handleModalToggle("isShareModalOpen")}
            data={authState?.userID}
          />
        </Modal>

        <Modal
          isOpen={modalState.isFollowerModalOpen}
          handleClose={() => handleModalToggle("isFollowerModalOpen")}
        >
          <Followers
            handleCloseModal={() => handleModalToggle("isFollowerModalOpen")}
            followerData={authState?.follower}
          />
        </Modal>

        <Modal
          isOpen={modalState.isFollowingModalOpen}
          handleClose={() => handleModalToggle("isFollowingModalOpen")}
        >
          <Following
            handleCloseModal={() => handleModalToggle("isFollowingModalOpen")}
            followingData={authState?.following}
          />
        </Modal>

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

        <Modal
          isOpen={modalState.isAddClipsOpen}
          handleClose={() => handleModalToggle("isAddClipsOpen")}
        >
          <AddClips
            handleCloseModal={() => handleModalToggle("isAddClipsOpen")}
          />
        </Modal>

        <Modal
          isOpen={modalState.isAddVideoOpen}
          handleClose={() => handleModalToggle("isAddVideoOpen")}
        >
          <AddVideo
            handleCloseModal={() => handleModalToggle("isAddVideoOpen")}
          />
        </Modal>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </Layout>
  );
}

export default Account;
