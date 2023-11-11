"use client";
import { SVG } from "@/assets/SVG";
import { IMAGES } from "@/assets/images";
import Layout from "@/components/CustomLayout/layout";
import Badges from "@/components/Modals/Badges";
import Followers from "@/components/Modals/Followers";
import Following from "@/components/Modals/Following";
import Modal from "@/components/Modals/Modal";
import MoreOptions from "@/components/Modals/MoreOptions";
import AllStories from "@/components/story/AllStories";
import { leagueGothic } from "@/font/font";
import { useSelector } from "@/store";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface MyVideosSectionProps {
  data: Array<any>;
}

const MyVideosSection: React.FC<MyVideosSectionProps> = ({ data }) => {
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
            className="w-96 sm:w-96 h-52 md:h-40  rounded-xl object-cover hover:opacity-80"
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
  data: Array<any>;
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
            className="w-96 sm:w-96 h-52 md:h-52  rounded-xl object-cover hover:opacity-80"
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
  const [open, setOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState("videos");
  const [modalState, setModalState] = useState({
    isShareModalOpen: false,
    isFollowerModalOpen: false,
    isFollowingModalOpen: false,
    isBadgeModalOpen: false,
  });

  console.log("authState", authState);

  const USERDATA = [
    {
      userID: "123",
      name: "Hannery",
      profilePicture: IMAGES.AccountProfile,
      username: "rocks_hanne",
      bio: "Lorem ipsum dolor sit amet consect. Ante duis tellus tincidunt nibh hi hahshha",
      posts: 200,
      followers: 2356,
      following: 2356,
    },
  ];
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

  const handleModalToggle = (modalName: keyof typeof modalState) => {
    setModalState((prevState) => ({
      ...prevState,
      [modalName]: !prevState[modalName],
    }));
  };

  return (
    <Layout>
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
        {USERDATA.map((user) => (
          <div
            key={user.userID}
            className="lg:w-8/12 md:w-10/12 w-full flex flex-col gap-4"
          >
            <div className="flex flex-col items-center lg:flex-row lg:justify-center  w-full gap-4 ">
              <div className="w-40 h-40">
                <Image
                  className="rounded-xl w-40 h-40 object-cover"
                  src={user.profilePicture}
                  width={10}
                  height={10}
                  sizes="100vw"
                  alt="Account Profile"
                />
              </div>
              <div className="flex flex-1 flex-col gap-2 flex-wrap justify-center text-center lg:justify-start lg:text-start p-2 ">
                <span>{user.name}</span>
                <div className="flex items-center gap-6 justify-center lg:justify-between">
                  <div className="flex items-center">
                    <p>({user.username})</p>
                    <Image
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
                <span className="text-gray-400">{user.bio}</span>
                <div className="flex h-8 items-center justify-center md:gap-8">
                  <div className="flex items-center gap-2 ">
                    <span
                      className={`${leagueGothic.className} text-lg md:text-2xl font-normal`}
                    >
                      {user.posts}
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
                      {user.followers}
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
                      {user.following}
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
                    width={0}
                    height={0}
                    sizes="100vw"
                  />
                  <Image
                    className="w-8 h-8 opacity-50"
                    src={IMAGES.AccountNextBadgeIcon}
                    alt="Next Badge"
                    width={0}
                    height={0}
                    sizes="100vw"
                  />
                  <Image
                    className="w-8 h-8"
                    src={SVG.ShowNext}
                    alt="Next"
                    width={0}
                    height={0}
                    sizes="100vw"
                  />
                </div>
              </div>
            </div>

            <AllStories />
            {/* Top Bar */}
            <div className=" h-10 w-full flex justify-around items-center">
              <div
                className={`flex gap-2 items-center cursor-pointer ${
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
                <span className="text-xs md:text-base">My Videos</span>
              </div>

              <div
                className={`flex gap-2 items-center cursor-pointer ${
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
            </div>

            <div>
              <div
                className={`flex ${
                  selectedSection === "videos" ? "justify-start" : "justify-end"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="169"
                  height="2"
                  viewBox="0 0 169 2"
                  fill="none"
                >
                  <path
                    d="M1 1H168"
                    stroke="url(#paint0_linear_133_5406)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_133_5406"
                      x1="84.5"
                      y1="1"
                      x2="84.5"
                      y2="2"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#62C860" />
                      <stop offset="1" stopColor="#37C535" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <hr className="h-px  bg-gray-200 border-0 dark:bg-gray-700" />
            </div>

            {/* Content Section */}
            {selectedSection === "videos" ? (
              <MyVideosSection data={popular} />
            ) : (
              <MyBookmarkSection data={popular} />
            )}
          </div>
        ))}
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
    </Layout>
  );
}

export default Page;
