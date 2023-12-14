"use client";
import { Suspense, useEffect, useState } from "react";
import { SVG } from "@/assets/SVG";
import { IMAGES } from "@/assets/images";
import Layout from "@/components/CustomLayout/layout";
import Badges from "@/components/Modals/Badges";
import Followers from "@/components/Modals/Followers";
import Following from "@/components/Modals/Following";
import Modal from "@/components/Modals/Modal";
import MoreOptions from "@/components/Modals/MoreOptions";
import AllStories from "@/components/story/AllStories";
import Image from "next/image";
import Link from "next/link";
import Loading from "./loading";
import { leagueGothic } from "@/font/font";
import { dispatch, useSelector } from "@/store";
import { userSession } from "@/store/slices/authSlice";
import { getAllPostVideos } from "@/store/slices/postSlice";
import { getCookieValue, getFromLocal } from "@/utils/localStorage";
import { copyToClipboard } from "@/utils/helpers";
import { ToastContainer } from "react-toastify";

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
interface MyBookmarkSectionProps {
  data: Array<any>;
}

const MyBookmarkSection: React.FC<MyBookmarkSectionProps> = ({
  data = [{ id: 1, IMAGE: "test" }],
}) => {
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
            className="w-96 sm:w-96 h-52 md:h-40  rounded-xl object-cover hover:opacity-80"
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

function Page() {
  const authState = useSelector((state: any) => state.auth.userData) || [];
  const postState = useSelector((state: any) => state.post) || [];
  const [open, setOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState("videos");
  const [modalState, setModalState] = useState({
    isShareModalOpen: false,
    isFollowerModalOpen: false,
    isFollowingModalOpen: false,
    isBadgeModalOpen: false,
  });

  console.log("authState", authState);

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

  console.log("postState", postState);

  const handleModalToggle = (modalName: keyof typeof modalState) => {
    setModalState((prevState) => ({
      ...prevState,
      [modalName]: !prevState[modalName],
    }));
  };

  return (
    <Layout>
      <Suspense fallback={<Loading />}>
        {/* Header */}
        <div className="flex items-center py-2 bg-[#091619]">
          <div className="flex justify-between items-center w-full mx-4">
            <div>
              <h1 className={`${leagueGothic.className} text-4xl`}>ACCOUNT</h1>
            </div>
            <div className="flex items-center my-3 mx-2">
              <div className="flex items-center p-2 mr-2 rounded-full bg-[#162423]">
                <Image
                  className="mr-2"
                  src={SVG.GGcoin}
                  alt="GGcoin"
                  width={30}
                  height={30}
                />
                <p className="font-semibold pr-2">GG COIN</p>
              </div>
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
                <span>{authState?.name}</span>
                <div className="flex items-center gap-6 justify-center lg:justify-between">
                  <div
                    className="flex items-center"
                    onClick={() => copyToClipboard(authState?.username)}
                  >
                    <p>({authState?.username || "no_username"})</p>
                    <Image
                      className="cursor-pointer hover:opacity-80"
                      src={SVG.AccountCopyUsername}
                      width={16}
                      height={16}
                      alt="Copy Username"
                    />
                  </div>
                  <div
                    className="cursor-pointer hover:opacity-80"
                    onClick={() => handleModalToggle("isShareModalOpen")}
                  >
                    <Image src={SVG.Share} width={16} height={16} alt="Share" />
                  </div>
                </div>
                <span className="text-gray-400">{authState?.bio}</span>
                <div className="flex h-8 items-center justify-center md:gap-8">
                  <div className="flex items-center gap-2 ">
                    <span
                      className={`${leagueGothic.className} text-lg md:text-2xl font-normal`}
                    >
                      {postState?.videos?.length || 0}
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
                      className={`${leagueGothic.className} text-lg md:text-2xl font-normal`}
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
                      className={`${leagueGothic.className} text-lg md:text-2xl font-normal`}
                    >
                      {authState?.following?.length || 0}
                    </span>
                    <span className="md:text-lg text-gray-400">Following</span>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="bg-gray-800 py-4 w-full rounded-xl flex items-center hover:opacity-80 cursor-pointer"
              onClick={() => handleModalToggle("isBadgeModalOpen")}
            >
              <div className="flex justify-between flex-1  items-center px-4 ">
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

            <AllStories />
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
            <hr className="h-px bg-gray-50 border-0 dark:bg-gray-700" />

            {/* Content Section */}
            {selectedSection === "videos" ? (
              <MyVideosSection
                data={popular}
                authState={authState}
                postState={postState}
              />
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
          />
        </Modal>

        <Modal
          isOpen={modalState.isFollowingModalOpen}
          handleClose={() => handleModalToggle("isFollowingModalOpen")}
        >
          <Following
            handleCloseModal={() => handleModalToggle("isFollowingModalOpen")}
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
