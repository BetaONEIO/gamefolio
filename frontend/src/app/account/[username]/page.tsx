"use client";
import { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SVG } from "@/assets/SVG";
import { IMAGES } from "@/assets/images";
import { leagueGothic } from "@/font/font";
import { dispatch, useSelector } from "@/store";
import { userSession } from "@/store/slices/authSlice";
import {
  getAllPostVideos,
  getUserBookmark,
  removeUserBookmark,
} from "@/store/slices/postSlice";
import { getCookieValue, getFromLocal } from "@/utils/localStorage";
import { copyToClipboard } from "@/utils/helpers";
import { ToastContainer } from "react-toastify";
import Layout from "@/components/CustomLayout/layout";
import Badges from "@/components/Modals/Badges";
import Followers from "@/components/Modals/Followers";
import Following from "@/components/Modals/Following";
import Modal from "@/components/Modals/Modal";
import MoreOptions from "@/components/Modals/MoreOptions";
import CurrentUserStories from "@/components/story/CurrentUserStories";
import VideoDetails from "@/components/Modals/VideoDetails";
import { toastError, toastSuccess } from "@/components/Toast/Toast";
import CustomHeader from "@/components/CustomHeader/CustomHeader";
import Loading from "./loading";
import {
  followUser,
  getAllUsers,
  getProfileInfo,
} from "@/store/slices/userSlice";
import { getAllClipVideos } from "@/store/slices/clipSlice";
import { getCurrentUserStories } from "@/store/slices/storySlice";

interface MyVideosSectionProps {
  authState: any; // Add authState as a prop
  postState: any; // Add postState as a prop
  profileInfoState: any; // Add profileInfoState as a prop
  handleVideoDetailOpen: (postID: any, detailedPost: any) => void;
}
interface VideoState {
  isMuted?: boolean;
}

const MyVideosSection: React.FC<MyVideosSectionProps> = ({
  authState,
  postState,
  profileInfoState,
  handleVideoDetailOpen,
}) => {
  const userVideos = postState.videos.filter(
    (post: any) =>
      post?.userID?.username === profileInfoState.profileUserInfo.username
  );

  return (
    <Suspense fallback={<Loading />}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full p-4">
        {userVideos.map((item: any) => {
          return (
            <div key={item.id} className="relative">
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
    </Suspense>
  );
};

interface ClipsProps {
  authState: any; // Add authState as a prop
  clipState: any; // Add postState as a prop
  profileInfoState: any; // Add profileInfoState as a prop
  handleVideoDetailOpen: (postID: any, detailedPost: any) => void;
}

const ClipsSection: React.FC<ClipsProps> = ({
  authState,
  clipState,
  profileInfoState,
  handleVideoDetailOpen,
}) => {
  const userVideos = clipState.videos.filter(
    (post: any) =>
      post?.userID?.username === profileInfoState.profileUserInfo.username
  );

  return (
    <Suspense fallback={<Loading />}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full p-4">
        {userVideos.map((clip: any) => (
          <div
            key={clip.id}
            className="relative"
            onClick={() => handleVideoDetailOpen(clip._id, clip)}
          >
            <video
              src={clip.video}
              width={0}
              height={0}
              className="w-full h-52 md:h-40 rounded-xl object-cover hover:opacity-80"
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
    </Suspense>
  );
};

interface StoryProps {
  data: Array<any>;
  // isStoryModalOpen: () => void;
}

const StorySection: React.FC<StoryProps> = ({ data }) => {
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);

  return (
    <Suspense fallback={<Loading />}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full p-4">
        {data?.map((item: any) => (
          <div key={item.id} className="relative">
            <video
              src={item.video}
              width={0}
              height={0}
              className="w-full h-52 md:h-40  rounded-xl object-cover hover:opacity-80"
              onClick={() => {
                setIsStoryModalOpen(true);
              }}
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
    </Suspense>
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
  return (
    <Suspense fallback={<Loading />}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full p-4">
        {data?.map((bookmarkPost) => (
          <div key={bookmarkPost.post._id} className="relative">
            <video
              src={bookmarkPost.post.video}
              className="w-96 sm:w-96 h-52 md:h-40 rounded-xl object-cover hover:opacity-80"
              width={0}
              height={0}
              controls={false}
              onClick={() =>
                handleVideoDetailOpen(bookmarkPost.post._id, bookmarkPost.post)
              }
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
    </Suspense>
  );
};

function Profile() {
  const authState = useSelector((state: any) => state.auth.userData) || [];
  const postState = useSelector((state: any) => state.post) || [];
  const profileInfoState = useSelector((state: any) => state.user) || [];
  const clipState = useSelector((state: any) => state.clip) || [];
  const storyState = useSelector((state: any) => state.story) || [];
  const [open, setOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState("videos");
  const [isPrivateAccount, setIsPrivateAccount] = useState(false);
  const [postID, setPostID] = useState("");
  const [storyUserID, setStoryUserID] = useState("");
  const [detailedPost, setDetailedPost] = useState("");
  const [modalState, setModalState] = useState({
    isShareModalOpen: false,
    isFollowerModalOpen: false,
    isFollowingModalOpen: false,
    isVideoDetailOpen: false,
    isStoryModalOpen: false,
  });

  const userVideos = postState.videos.filter(
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
    dispatch(getProfileInfo({ payload: params }));
    dispatch(getUserBookmark(params));
    dispatch(getAllPostVideos());
    dispatch(getAllClipVideos());
    dispatch(getAllUsers());
    dispatch(getCurrentUserStories(params));
  }, [postState.refresh]);

  useEffect(() => {
    setIsPrivateAccount(
      profileInfoState?.profileUserInfo?.accountType === "private"
    );
  }, [profileInfoState]);

  console.log("userState###", profileInfoState);

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

  const handleModalToggle = (modalName: keyof typeof modalState) => {
    setModalState((prevState) => ({
      ...prevState,
      [modalName]: !prevState[modalName],
    }));
  };

  const handleVideoDetailOpen = (postID: string, detailedPost: any) => {
    setPostID(postID);
    setDetailedPost(detailedPost);
    setModalState((prevState) => ({
      ...prevState,
      isVideoDetailOpen: true,
    }));
  };

  function handlePageRefresh(): void {
    throw new Error("Function not implemented.");
  }

  const backgroundImage = `url(${IMAGES.bgImage})`;

  const sectionStyle = {
    backgroundImage: `linear-gradient(to bottom, rgba(4, 50, 12, 1), rgba(4, 50, 12, 0) 10%)`,
  };

  return (
    <Layout>
      <Suspense>
        {/* Header */}
        <CustomHeader>PROFILE</CustomHeader>

        <div style={sectionStyle} className="pt-4">
          <div
            className="flex flex-col items-center lg:flex-row lg:justify-center gap-4 h-60 pl-8 mx-4 my-4"
            style={{
              background: `linear-gradient(to bottom, transparent 40%, rgba(0, 0, 0, 0.9) 60%), ${backgroundImage}`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            key={profileInfoState?.profileUserInfo?._id}
          >
            <div className="w-32 h-32">
              <Image
                className="rounded-xl w-32 h-32 object-cover border-2 border-[#43DD4E]"
                src={
                  profileInfoState?.profileUserInfo?.profilePicture ||
                  IMAGES.AccountProfile
                }
                width={10}
                height={10}
                sizes="100vw"
                alt="Account Profile"
              />
            </div>
            <div className="flex justify-between">
              <div className="flex flex-1 flex-col gap-2 flex-wrap justify-center text-center lg:justify-start lg:text-start p-2 pt-4">
                <span className="font-semibold text-white">
                  {profileInfoState?.profileUserInfo?.name}
                </span>
                <div className="flex items-center gap-6 justify-center lg:justify-between">
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
                </div>
                <span className="text-gray-400">
                  {profileInfoState?.profileUserInfo?.bio}
                </span>

                <div className="flex h-8 items-center justify-start md:gap-8">
                  <div className="flex items-center gap-2 ">
                    <span
                      className={`${leagueGothic.className} text-lg md:text-2xl font-normal text-white`}
                    >
                      {userVideos.length || 0}
                    </span>
                    <span className="md:text-lg text-gray-400"> Posts</span>
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
                      {profileInfoState?.profileUserInfo?.follower?.length || 0}
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
                      {profileInfoState?.profileUserInfo?.following?.length ||
                        0}
                    </span>
                    <span className="md:text-lg text-gray-400">Following</span>
                  </div>
                </div>
              </div>

              <div className="flex h-8 sm:gap-6 mt-3">
                <button
                  className="font-bold w-40 h-10 bg-[#292D32] text-white text-center py-[10px] px-[40px] rounded-tl-[20px] rounded-br-[20px] rounded-tr-[5px] rounded-bl-[5px]"
                  onClick={() =>
                    handleFollowUser(profileInfoState?.profileUserInfo?._id)
                  }
                >
                  {authState?.following?.some(
                    (user: any) =>
                      user?.userID?._id ===
                      profileInfoState?.profileUserInfo?._id
                  )
                    ? "Unfollow"
                    : "Follow"}
                </button>
                <button
                  className="font-bold w-40 h-10 bg-[#37C535] text-white text-center py-[10px] px-[40px] rounded-tl-[20px] rounded-br-[20px] rounded-tr-[5px] rounded-bl-[5px]"
                  // onClick={handleMessage}
                >
                  Message
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-between w-10/12 my-4 mx-4">
            <div>
              <p className="font-bold">Current Badge:</p>
              <div className="flex justify-center items-center gap-8 mt-2">
                <Image
                  src={IMAGES.AccountCurrentBadgeIcon}
                  alt="Badge"
                  width={40}
                  height={40}
                />
                <Image
                  src={IMAGES.Badges2}
                  alt="Badge"
                  width={40}
                  height={40}
                />
                <Image
                  src={IMAGES.Badges3}
                  alt="Badge"
                  width={40}
                  height={40}
                />
                <Image
                  src={IMAGES.Badges4}
                  alt="Badge"
                  width={40}
                  height={40}
                />
                <Image
                  src={IMAGES.Badges5}
                  alt="Badge"
                  width={40}
                  height={40}
                />
              </div>
            </div>
            <div>
              <p className="font-bold">Share via:</p>
              <div className="flex justify-center items-center gap-8 mt-2">
                <Image
                  src={SVG.Facebook1}
                  alt="Facebook"
                  width={40}
                  height={40}
                />
                <Image
                  src={SVG.Instagram}
                  alt="Instagram"
                  width={40}
                  height={40}
                />
                <Image src={SVG.X} alt="X" width={40} height={40} />
                <Image
                  src={SVG.GamefolioCoin}
                  alt="GamefolioCoin"
                  width={40}
                  height={40}
                />
              </div>
            </div>
          </div>

          {/* Top Bar */}

          <div className="flex mx-3">
            <div className="w-80 border-2 border-[#1C2C2E] rounded-lg p-2">
              <h1 className="font-bold my-2">About Me:</h1>
              <p className="font-light text-xs text-[#7C7F80]">
                Lorem ipsum dolor sit amet constetur. Ante duis tellus tincidunt
                nibh Lorem ipsum dolor sit amet consectetur. Ante duis tellus um
                dolor sit amet constetur. Ante duis tellus um dolor sit amet
                constetur.
              </p>
              <h1 className="font-bold my-2">Connect</h1>
              <div className="flex items-center gap-4 rounded-lg bg-[#162423] p-2 mt-2">
                <Image
                  className="rounded-xl w-10 h-10 object-cover"
                  src={SVG.PlayStation}
                  width={10}
                  height={10}
                  sizes="100vw"
                  alt="Account Profile"
                />
                <p className="font-normal">Connected Succesfully</p>
              </div>

              <div className="flex items-center gap-4 rounded-lg bg-[#162423] p-2 mt-2">
                <Image
                  className="rounded-xl w-10 h-10 object-cover"
                  src={SVG.Twitch}
                  width={10}
                  height={10}
                  sizes="100vw"
                  alt="Account Profile"
                />
                <p className="font-normal">Conneted Succesfully</p>
              </div>

              <div className="flex items-center gap-4 rounded-lg bg-[#162423] p-2 mt-2">
                <Image
                  className="rounded-xl w-10 h-10 object-cover"
                  src={SVG.Xbox}
                  width={10}
                  height={10}
                  sizes="100vw"
                  alt="Account Profile"
                />
                <p className="font-normal">Conneted Succesfully</p>
              </div>

              <div className="flex items-center gap-4 rounded-lg bg-[#162423] p-2 mt-2">
                <Image
                  className="rounded-xl w-10 h-10 object-cover"
                  src={SVG.Steam}
                  width={10}
                  height={10}
                  sizes="100vw"
                  alt="Account Profile"
                />
                <p className="font-normal">Conneted Succesfully</p>
              </div>
            </div>

            <div className="w-4/6 justify-around items-center h-10">
              {/* <div className="flex justify-center items-center pt-4"> */}
              {/* Profile */}
              <div key={authState?.userID} className="flex flex-col gap-4 mx-8">
                <div className="h-10 w-full flex justify-around items-center">
                  <div>
                    <div
                      className={`flex justify-center w-16 gap-2 my-6 cursor-pointer ${
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
                    </div>
                    {selectedSection === "videos" && (
                      <div className="w-16 h-1 bg-[#62C860] rounded-lg"></div>
                    )}
                  </div>

                  <div>
                    <div
                      className={`flex justify-center w-16 gap-2 my-6 cursor-pointer ${
                        selectedSection === "clips"
                          ? "text-white"
                          : "text-gray-500"
                      }`}
                      onClick={() => setSelectedSection("clips")}
                    >
                      <Image
                        className={`${
                          selectedSection !== "clips"
                            ? "opacity-40"
                            : "opacity-100"
                        }`}
                        src={SVG.Clips}
                        alt="My clips"
                        width={24}
                        height={24}
                      />
                    </div>
                    {selectedSection === "clips" && (
                      <div className="w-16 h-1 bg-[#62C860] rounded-lg"></div>
                    )}
                  </div>

                  <div>
                    <div
                      className={`flex justify-center w-16 gap-2 my-6 cursor-pointer ${
                        selectedSection === "videos"
                          ? "text-white"
                          : "text-gray-500"
                      }`}
                      onClick={() => setSelectedSection("story")}
                    >
                      <Image
                        className={` ${
                          selectedSection !== "story"
                            ? "opacity-40"
                            : "opacity-100"
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
                      className={`flex justify-center w-16 gap-2 my-6 cursor-pointer ${
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
                <hr className="h-px border-0 bg-gray-700" />
                {/* green line */}

                {/* Content Section */}
                {authState?.following?.some(
                  (user: any) =>
                    user?.userID?._id ===
                      profileInfoState?.profileUserInfo?._id ||
                    !isPrivateAccount
                ) ? (
                  // User is following, show videos
                  <div>
                    {selectedSection === "videos" ? (
                      <MyVideosSection
                        authState={authState}
                        postState={postState}
                        profileInfoState={profileInfoState}
                        handleVideoDetailOpen={handleVideoDetailOpen}
                      />
                    ) : selectedSection === "bookmarked" ? (
                      <MyBookmarkSection
                        data={postState.bookmarks}
                        handleVideoDetailOpen={handleVideoDetailOpen}
                      />
                    ) : selectedSection === "clips" ? (
                      <ClipsSection
                        authState={authState}
                        clipState={clipState}
                        profileInfoState={profileInfoState}
                        handleVideoDetailOpen={handleVideoDetailOpen}
                      />
                    ) : (
                      <StorySection data={storyState.currentUserStories} />
                    )}
                  </div>
                ) : (
                  // User is not following, show private account message
                  <div className="flex justify-center">
                    <p>This is a private account.</p>
                  </div>
                )}
              </div>
              {/* </div> */}
            </div>

            {/* <div className="w-1/5 border-2 border-gray-500"></div> */}
          </div>
          {/* </div> */}

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

          {/* <Modal
          isOpen={modalState.isBadgeModalOpen}
          handleClose={() => handleModalToggle("isBadgeModalOpen")}
        >
          <Badges
            handleCloseModal={() => handleModalToggle("isBadgeModalOpen")}
          />
        </Modal> */}

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
      </Suspense>
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

export default Profile;
