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
import Loading from "./loading";
import VideoDetails from "@/components/Modals/VideoDetails";
import { toastError, toastSuccess } from "@/components/Toast/Toast";

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
  authState: any; // Add authState as a prop
  postState: any; // Add postState as a prop
  handleVideoDetailOpen: (postID: any, detailedPost: any) => void;
}

const MyVideosSection: React.FC<MyVideosSectionProps> = ({
  authState,
  postState,
  handleVideoDetailOpen,
}) => {
  const userVideos = postState.videos.filter(
    (post: any) => post?.userID?._id === authState._id
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full p-4">
      {userVideos.map((item: any) => {
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

const MyBookmarkSection: React.FC<MyBookmarkSectionProps> = ({ data }) => {
  const authState = useSelector((state: any) => state.auth.userData) || [];
  const handleRemoveBookmark = async (postID: any) => {
    const payload = {
      authUserID: authState._id,
      userID: data[0]?.bookmarkInfo?.userID,
      postID: postID,
    };

    const successCallback = (response: any) => {
      // handlePageRefresh();
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

  function handleVideoDetailOpen(_id: any, post: any): void {
    throw new Error("Function not implemented.");
  }

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

function Page() {
  const authState = useSelector((state: any) => state.auth.userData) || [];
  const postState = useSelector((state: any) => state.post) || [];
  const [open, setOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState("videos");
  const [postID, setPostID] = useState("");
  const [detailedPost, setDetailedPost] = useState("");
  const [modalState, setModalState] = useState({
    isShareModalOpen: false,
    isFollowerModalOpen: false,
    isFollowingModalOpen: false,
    isBadgeModalOpen: false,
    isVideoDetailOpen: false,
  });

  const userVideos = postState.videos.filter(
    (post: any) => post?.userID?._id === authState._id
  );

  console.log("postStates:1: ", postState);

  const payload = {
    userToken: getFromLocal("@token") || getCookieValue("gfoliotoken"),
  };
  const params = {
    payload,
  };
  useEffect(() => {
    dispatch(userSession(params));
    dispatch(getUserBookmark(params));
    dispatch(getAllPostVideos());
  }, [postState.refresh]);

  console.log("postState", postState);

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

  return (
    <Layout>
      <Suspense fallback={<Loading />}>
        {/* Header */}
        <div className="flex items-center py-2 bg-[#091619]">
          <div className="flex justify-between items-center w-full mx-4">
            <div>
              <h1
                className={`${leagueGothic.className} text-2xl sm:text-4xl lg:text-4xl text-white`}
              >
                ACCOUNT
              </h1>
            </div>
            <div className="flex items-center my-3 mx-2">
              <Link href="/account/my-folio">
                <div className="flex items-center p-1 mr-2 rounded-full bg-[#162423]">
                  <Image
                    className="mr-2"
                    src={SVG.GGcoin}
                    alt="GGcoin"
                    width={30}
                    height={30}
                  />
                  <p className="font-semibold pr-2 text-white">GG COIN</p>
                </div>
              </Link>
              <Link href="/account/settings">
                <Image
                  className="cursor-pointer hover:opacity-60"
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
            key={authState?.userID}
            className="lg:w-8/12 md:w-10/12 w-full flex flex-col gap-4"
          >
            <div className="flex flex-col items-center lg:flex-row lg:justify-center  w-full gap-4 ">
              <div className="w-40 h-40">
                <Image
                  className="rounded-xl w-40 h-40 object-cover"
                  src={authState?.profilePicture}
                  width={10}
                  height={10}
                  sizes="100vw"
                  alt="Account Profile"
                />
              </div>
              <div className="flex flex-1 flex-col gap-2 flex-wrap justify-center text-center lg:justify-start lg:text-start p-2 ">
                <span className="text-white">{authState?.name}</span>
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
                <span className="text-gray-400">{authState?.bio}</span>

                <div className="flex h-8 items-center justify-center md:gap-8">
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
              </div>
            </div>

            <div
              className="bg-[#FFFFFF1F] py-4 w-full rounded-xl flex items-center hover:opacity-80 cursor-pointer"
              onClick={() => handleModalToggle("isBadgeModalOpen")}
            >
              <div className="flex justify-between flex-1  items-center px-4 text-white ">
                Current Badge
                <div className="flex items-center gap-2">
                  <Image
                    className="w-12 h-12"
                    src={IMAGES.AccountCurrentBadgeIcon}
                    alt="Current Badge"
                    width={12}
                    height={12}
                    sizes="100vw"
                  />
                  <Image
                    className="w-8 h-8 opacity-50"
                    src={IMAGES.AccountNextBadgeIcon}
                    alt="Next Badge"
                    width={8}
                    height={8}
                    sizes="100vw"
                  />
                  <Image
                    className="w-8 h-8"
                    src={SVG.ShowNext}
                    alt="Next"
                    width={8}
                    height={8}
                    sizes="100vw"
                  />
                </div>
              </div>
            </div>

            <CurrentUserStories />
            {/* Top Bar */}
            <div className="h-10 w-full flex justify-around items-center">
              <div>
                <div
                  className={`flex gap-2 my-6 items-center cursor-pointer ${
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
                  <span className="text-xs md:text-base">My Videos</span>
                </div>
                {selectedSection === "videos" && (
                  <div className="w-full h-1 bg-[#62C860] rounded-lg"></div>
                )}
              </div>

              <div className="">
                <div
                  className={`flex my-6 gap-2 items-center cursor-pointer ${
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
                  <span className="text-xs md:text-base">My Bookmarked</span>
                </div>
                {selectedSection === "bookmarked" && (
                  <div className="w-full h-1 bg-[#62C860] rounded-lg"></div>
                )}
              </div>
            </div>
            <hr className="h-px border-0 bg-gray-700" />

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
          isOpen={modalState.isBadgeModalOpen}
          handleClose={() => handleModalToggle("isBadgeModalOpen")}
        >
          <Badges
            handleCloseModal={() => handleModalToggle("isBadgeModalOpen")}
          />
        </Modal>

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

export default Page;
