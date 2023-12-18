"use client";
import { SVG } from "@/assets/SVG";
import { IMAGES } from "@/assets/images";
import Layout from "@/components/CustomLayout/layout";
import Modal from "@/components/Modals/Modal";
import MoreOptions from "@/components/Modals/MoreOptions";
import { leagueGothic } from "@/font/font";
import { dispatch, useSelector } from "@/store";
import { userSession } from "@/store/slices/authSlice";
import { followUser, getProfileInfo } from "@/store/slices/userSlice";
import { getCookieValue, getFromLocal } from "@/utils/localStorage";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Loading from "../loading";
import { getAllPostVideos } from "@/store/slices/postSlice";
import { toastError, toastSuccess } from "@/components/Toast/Toast";
import { ToastContainer } from "react-toastify";
import { initChat } from "@/store/slices/chatSlice";
import { useRouter } from "next/navigation";
import { copyToClipboard, generateUniqueRoomId } from "@/utils/helpers";
import Followers from "@/components/Modals/Followers";
import Following from "@/components/Modals/Following";

const popular = [
  { id: 1, IMAGE: IMAGES.Popular },
  { id: 2, IMAGE: IMAGES.Popular1 },
  { id: 3, IMAGE: IMAGES.Popular1 },
  { id: 4, IMAGE: IMAGES.ExploreIMG1 },
  { id: 5, IMAGE: IMAGES.Popular1 },
  { id: 6, IMAGE: IMAGES.Popular1 },
  { id: 7, IMAGE: IMAGES.ExploreIMG1 },
  { id: 8, IMAGE: IMAGES.Popular1 },
  { id: 9, IMAGE: IMAGES.Popular1 },
  { id: 10, IMAGE: IMAGES.Popular1 },
];

interface MyVideosSectionProps {
  data: Array<any>;
  authState: any; // Add authState as a prop
  postState: any; // Add postState as a prop
}
interface VideoState {
  isMuted?: boolean;
}

const MyVideosSection: React.FC<MyVideosSectionProps> = ({
  authState,
  postState,
}) => {
  const [videoStates, setVideoStates] = useState<{ [key: string]: VideoState }>(
    {}
  );
  const userVideos = postState.videos.filter(
    (post: any) => post?.userID?._id === authState._id
  );

  const handleVideoClick = (
    event: React.MouseEvent<HTMLVideoElement, MouseEvent>
  ) => {
    const video = event.currentTarget;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };
  const handleToggleMute = (clipID: string) => {
    setVideoStates((prevStates) => ({
      ...prevStates,
      [clipID]: {
        ...prevStates[clipID],
        isMuted: !prevStates[clipID]?.isMuted,
      },
    }));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full p-4">
      {userVideos.map((item: any) => {
        const videoState = videoStates[item._id] || {
          isMuted: false,
        };
        return (
          <div key={item.id} className="relative">
            <video
              src={item.video}
              className="w-96 sm:w-96 h-52 md:h-40  rounded-xl object-cover hover:opacity-80"
              width={20}
              height={20}
              controls={false}
              onClick={handleVideoClick}
              muted={videoState.isMuted}
            />
            <div className="absolute bottom-1 right-2">
              <button
                className="cursor-pointer hover:opacity-80"
                onClick={() => handleToggleMute(item._id)}
              >
                {videoState.isMuted ? (
                  <Image src={SVG.Mute} alt="Mute" width={40} height={40} />
                ) : (
                  <Image src={SVG.UnMute} alt="Unmute" width={40} height={40} />
                )}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

interface ClipsProps {
  data: Array<any>; // You can replace 'any' with the actual type of data you expect.
}

const ClipsSection: React.FC<ClipsProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full p-4">
      {data.map((game) => (
        <div key={game.id} className="relative">
          <Image
            src={game.IMAGE}
            alt="Popular"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-52 md:h-40  rounded-xl object-cover hover:opacity-80"
          />
          <Image
            className="absolute bottom-2 right-2 hover:opacity-70"
            src={SVG.Mute}
            alt="Play"
            width={32}
            height={32}
            sizes="100vw"
          />
        </div>
      ))}
    </div>
  );
};

interface StoryProps {
  data: Array<any>; // You can replace 'any' with the actual type of data you expect.
}

const StorySection: React.FC<StoryProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full p-4">
      {data.map((game) => (
        <div key={game.id} className="relative">
          <Image
            src={game.IMAGE}
            alt="Popular"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-52 md:h-40  rounded-xl object-cover hover:opacity-80"
          />
          <Image
            className="absolute bottom-2 right-2 hover:opacity-70"
            src={SVG.Mute}
            alt="Play"
            width={32}
            height={32}
            sizes="100vw"
          />
        </div>
      ))}
    </div>
  );
};

interface MyBookmarkSectionProps {
  data: Array<any>; // You can replace 'any' with the actual type of data you expect.
}

const MyBookmarkSection: React.FC<MyBookmarkSectionProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full p-4">
      {data.map((game) => (
        <div key={game.id} className="relative">
          <Image
            src={game.IMAGE}
            alt="My Bookmarked"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-52 md:h-40  rounded-xl object-cover hover:opacity-80"
          />
          <Image
            className="absolute top-2 right-2 hover:opacity-70"
            src={SVG.Bookmark}
            alt="Play"
            width={24}
            height={24}
            sizes="100vw"
          />
        </div>
      ))}
    </div>
  );
};

function Page({ params }: any) {
  console.log("params", params);
  const authState = useSelector((state: any) => state.auth.userData) || [];
  const profileInfoState = useSelector((state: any) => state.user) || [];
  const postState = useSelector((state: any) => state.post) || [];
  const [open, setOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState("videos");
  const [modalState, setModalState] = useState({
    isShareModalOpen: false,
    isFollowerModalOpen: false,
    isFollowingModalOpen: false,
  });

  console.log("authState****", authState);

  const router = useRouter();

  const payload = {
    userToken: getFromLocal("@token") || getCookieValue("gfoliotoken"),
  };
  const myparams = {
    payload,
  };

  useEffect(() => {
    dispatch(userSession(myparams));
    dispatch(getProfileInfo({ payload: params }));
    dispatch(getAllPostVideos());
  }, [postState.refresh]);

  const handleModalToggle = (modalName: keyof typeof modalState) => {
    setModalState((prevState) => ({
      ...prevState,
      [modalName]: !prevState[modalName],
    }));
  };

  const handleMessage = async () => {
    const payload = {
      roomID: generateUniqueRoomId(),
      sender: authState._id,
      receiver: profileInfoState?.profileUserInfo?._id,
      content: "Hello",
      isSocket: false,
    };

    const successCallback = (response: any) => {
      toastSuccess(response);
      setTimeout(() => {
        router.push("/chat");
      }, 4000);
    };

    const errorCallback = (error: string) => {
      toastError(error);
    };

    const params = {
      payload,
      successCallback,
      errorCallback,
    };

    dispatch(initChat(params));
  };

  const handleFollowUser = async (userId: any) => {
    const payload = {
      userId: userId,
      followerID: authState._id,
    };

    const successCallback = (response: any) => {
      toastSuccess(response.message);
    };

    const errorCallback = (error: string) => {
      toastError(error);
    };

    const params = {
      payload,
      successCallback,
      errorCallback,
    };

    dispatch(followUser(params));
  };

  if (profileInfoState?.loading) return <Loading />;

  const handleBackButtonClick = () => {
    // Use the router's back method to navigate to the previous page
    router.back();
  };

  return (
    <Layout>
      {/* Header */}
      <div className="flex items-center py-2 bg-[#091619]">
        <div className="flex justify-between items-center w-full mx-4">
          <div
            className="flex gap-4 items-center"
            onClick={handleBackButtonClick}
          >
            <Image
              className="hover:opacity-80 cursor-pointer"
              src={SVG.Back}
              alt="Settings"
              width={32}
              height={32}
            />
            <h1 className={`${leagueGothic.className} text-4xl`}> Back</h1>
          </div>
          <div className="flex items-center my-3 mx-2">
            <div className="flex items-center mr-2 rounded-full bg-[#162423]">
              <Image src={IMAGES.Badges} alt="GGcoin" width={50} height={50} />
              <p className="font-semibold pr-2">Badges</p>
            </div>
            <Link href="/account/settings">
              <Image
                className="hover:opacity-60 cursor-pointer"
                src={SVG.Setting}
                alt="Setting"
                width={24}
                height={24}
              />
            </Link>
          </div>
        </div>
      </div>

      <hr className="border-t border-gray-600" />
      {/* Main  */}
      <div className="flex justify-center items-center pt-4">
        {/* Profile */}

        <div
          key={profileInfoState?.profileUserInfo?._id}
          className="lg:w-8/12 md:w-10/12 w-full flex flex-col gap-4"
        >
          <div className="flex justify-between lg:flex-row  w-full gap-4 mb-6">
            <div className="flex items-top">
              <Image
                className="w-40 h-40 rounded-xl  object-cover"
                src={
                  profileInfoState?.profileUserInfo?.profilePicture ||
                  IMAGES.AccountProfile
                }
                width={0}
                height={0}
                sizes="100vw"
                alt="Account Profile"
              />
            </div>

            <div className="flex flex-1 flex-col gap-2 flex-wrap justify-center text-center lg:justify-start lg:text-start p-2 ">
              <p className="font-bold">
                {profileInfoState?.profileUserInfo?.name}
              </p>
              <div className="flex items-center gap-2 justify-between lg:justify-between">
                <div
                  className="flex items-center"
                  onClick={() => copyToClipboard(authState?.username)}
                >
                  <p className="text-white">
                    ({profileInfoState?.profileUserInfo?.username})
                  </p>
                  <Image
                    className="cursor-pointer hover:opacity-80"
                    src={SVG.AccountCopyUsername}
                    width={16}
                    height={16}
                    alt="Copy Username"
                  />
                </div>
                <div
                  className="hover:opacity-80"
                  onClick={() => handleModalToggle("isShareModalOpen")}
                >
                  <Image src={SVG.Share} width={16} height={16} alt="Share" />
                </div>
              </div>
              <span className="text-gray-400">
                {profileInfoState?.profileUserInfo?.bio}
              </span>
              <div className="flex h-8 md:gap-8">
                <div className="flex items-center gap-2 ">
                  <span
                    className={`${leagueGothic.className} text-lg md:text-2xl font-normal`}
                  >
                    {postState?.videos?.length || 0}
                  </span>
                  <span className="md:text-lg text-gray-400">Posts</span>
                </div>

                {/* Vertical divider */}
                <div className="border-r border-gray-700 h-full  rounded-full mx-2"></div>
                <div
                  className="flex items-center gap-2 cursor-pointer hover:opacity-80"
                  onClick={() => handleModalToggle("isFollowerModalOpen")}
                >
                  <span
                    className={`${leagueGothic.className} text-lg md:text-2xl font-normal`}
                  >
                    {profileInfoState?.profileUserInfo?.follower?.length || 0}
                  </span>
                  <span className="md:text-lg text-gray-400">Followers</span>
                </div>
                {/* Vertical divider */}
                <div className="border-r border-gray-700 h-full  rounded-full mx-2"></div>

                <div
                  className="flex items-center gap-2 cursor-pointer hover:opacity-80"
                  onClick={() => handleModalToggle("isFollowingModalOpen")}
                >
                  <span
                    className={`${leagueGothic.className} text-lg md:text-2xl font-normal`}
                  >
                    {profileInfoState?.profileUserInfo?.following?.length || 0}
                  </span>
                  <span className="md:text-lg text-gray-400">Following</span>
                </div>
              </div>

              {/* followed by */}
              <div className="flex h-8 items-center  my-2 gap-6 sm:gap-6 -space-x-4">
                <div className="flex -space-x-4">
                  <Image
                    className="w-8 h-8 rounded-full  border-gray-800"
                    src={IMAGES.Ellipse1}
                    alt="Next"
                    width={0}
                    height={0}
                    sizes="100vw"
                  />
                  <Image
                    className="w-8 h-8 rounded-full  border-gray-800"
                    src={IMAGES.Ellipse2}
                    alt="Next"
                    width={0}
                    height={0}
                    sizes="100vw"
                  />
                  <Image
                    className="w-8 h-8 rounded-full border-gray-800"
                    src={IMAGES.Ellipse3}
                    alt="Next"
                    width={0}
                    height={0}
                    sizes="100vw"
                  />
                </div>
                <div>
                  <p className="font-bold">Followed by mark, Smith</p>
                </div>
              </div>

              {/* Socials */}
              {/* <div className="flex h-8 my-4 gap-8 sm:gap-8 -space-x-4">
                <div className="relative">
                  <Image
                    className="w-8 h-8 p-0.5 bg-[#FFF] rounded-lg"
                    src={SVG.Twitch}
                    alt="Next"
                    width={0}
                    height={0}
                    sizes="100vw"
                  />
                  <Image
                    className="absolute top-6 left-6"
                    src={SVG.Verified}
                    alt="Next"
                    width={16}
                    height={16}
                    sizes="100vw"
                  />
                </div>
                <div className="relative">
                  <Image
                    className="relative w-8 h-8 p-0.5 bg-[#FFF] rounded-lg"
                    src={SVG.PlayStation}
                    alt="Next"
                    width={0}
                    height={0}
                    sizes="100vw"
                  />
                  <Image
                    className="absolute top-6 left-6"
                    src={SVG.Verified}
                    alt="Next"
                    width={16}
                    height={16}
                    sizes="100vw"
                  />
                </div>
                <div className="relative">
                  <Image
                    className="relative w-8 h-8 p-0.5 bg-[#FFF] rounded-lg"
                    src={SVG.Xbox}
                    alt="Next"
                    width={0}
                    height={0}
                    sizes="100vw"
                  />
                  <Image
                    className="absolute top-6 left-6"
                    src={SVG.Verified}
                    alt="Next"
                    width={16}
                    height={16}
                    sizes="100vw"
                  />
                </div>
                <div className="relative">
                  <Image
                    className="relative w-8 h-8 p-0.5 bg-[#FFF] rounded-lg"
                    src={SVG.Steam}
                    alt="Next"
                    width={0}
                    height={0}
                    sizes="100vw"
                  />
                  <Image
                    className="absolute top-6 left-6"
                    src={SVG.Verified}
                    alt="Next"
                    width={16}
                    height={16}
                    sizes="100vw"
                  />
                </div>
              </div> */}

              {/* Buttons */}
              <div className="flex h-8 gap-6 sm:gap-6">
                <button
                  className="font-bold w-40 h-10 bg-[#37C535] text-white text-center py-[10px] px-[40px] rounded-tl-[20px] rounded-br-[20px] rounded-tr-[5px] rounded-bl-[5px] mb-3"
                  onClick={() =>
                    handleFollowUser(profileInfoState?.profileUserInfo?._id)
                  }
                >
                  Follow
                </button>
                <button
                  className="font-bold w-40 h-10 bg-[#37C535] text-white text-center py-[10px] px-[40px] rounded-tl-[20px] rounded-br-[20px] rounded-tr-[5px] rounded-bl-[5px] mb-3"
                  onClick={handleMessage}
                >
                  Message
                </button>
              </div>
            </div>
          </div>

          {/* Top Bar */}
          <div className="h-10 w-full flex justify-around items-center">
            <div>
              <div
                className={`flex justify-center gap-2 my-6 cursor-pointer ${
                  selectedSection === "videos" ? "text-white" : "text-gray-500"
                }`}
                onClick={() => setSelectedSection("videos")}
              >
                <Image
                  className={`${
                    selectedSection !== "videos" ? "opacity-40" : "opacity-100"
                  }`}
                  src={SVG.AccountMyVideos}
                  alt="My Videos"
                  width={24}
                  height={24}
                />
              </div>
              {selectedSection === "videos" && (
                <div className="w-16 h-1 bg-[#62C860] rounded-lg"></div>
              )}
            </div>

            <div>
              <div
                className={`flex justify-center gap-2 my-6 cursor-pointer ${
                  selectedSection === "clips" ? "text-white" : "text-gray-500"
                }`}
                onClick={() => setSelectedSection("clips")}
              >
                <Image
                  className={`${
                    selectedSection !== "clips" ? "opacity-40" : "opacity-100"
                  }`}
                  src={SVG.Clips}
                  alt="My clips"
                  width={24}
                  height={24}
                />
              </div>
              {selectedSection === "clips" && (
                <div className=" w-16 h-1 bg-[#62C860] rounded-lg"></div>
              )}
            </div>

            <div>
              <div
                className={`flex justify-center gap-2 my-6 cursor-pointer ${
                  selectedSection === "videos" ? "text-white" : "text-gray-500"
                }`}
                onClick={() => setSelectedSection("story")}
              >
                <Image
                  className={` ${
                    selectedSection !== "story" ? "opacity-40" : "opacity-100"
                  }`}
                  src={SVG.Story}
                  alt="My story"
                  width={24}
                  height={24}
                />
              </div>
              {selectedSection === "story" && (
                <div className="w-16 h-1 bg-[#62C860] rounded-lg"></div>
              )}
            </div>

            <div>
              <div
                className={`flex justify-center gap-2 my-6 cursor-pointer ${
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
                  alt="My bookmarked"
                  width={24}
                  height={24}
                />
              </div>
              {selectedSection === "bookmarked" && (
                <div className="w-16 h-1 bg-[#62C860] rounded-lg"></div>
              )}
            </div>
          </div>
          <hr className="h-px  border-0 bg-gray-700" />
          {/* green line */}

          {/* Content Section */}
          {selectedSection === "videos" ? (
            <MyVideosSection
              data={popular}
              authState={authState}
              postState={postState}
            />
          ) : selectedSection === "bookmarks" ? (
            <ClipsSection data={popular} />
          ) : selectedSection === "clips" ? (
            <StorySection data={popular} />
          ) : (
            <MyBookmarkSection data={popular} />
          )}
        </div>
      </div>

      <Modal
        isOpen={modalState.isShareModalOpen}
        handleClose={() => handleModalToggle("isShareModalOpen")}
      >
        <MoreOptions
          handleCloseModal={() => handleModalToggle("isShareModalOpen")}
        />
      </Modal>
      <Modal
        isOpen={modalState.isFollowerModalOpen}
        handleClose={() => handleModalToggle("isFollowerModalOpen")}
      >
        <Followers
          handleCloseModal={() => handleModalToggle("isFollowerModalOpen")}
          followerData={profileInfoState?.profileUserInfo?.follower}
        />
      </Modal>

      <Modal
        isOpen={modalState.isFollowingModalOpen}
        handleClose={() => handleModalToggle("isFollowingModalOpen")}
      >
        <Following
          handleCloseModal={() => handleModalToggle("isFollowingModalOpen")}
          followingData={profileInfoState?.profileUserInfo?.following}
        />
      </Modal>

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

export default Page;
