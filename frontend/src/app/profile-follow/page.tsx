"use client";
import { SVG } from "@/assets/SVG";
import { IMAGES } from "@/assets/images";
import Layout from "@/components/CustomLayout/layout";
import Modal from "@/components/Modals/Modal";
import MoreOptions from "@/components/Modals/MoreOptions";
import { leagueGothic } from "@/font/font";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

interface MyVideosSectionProps {
  data: Array<any>; // You can replace 'any' with the actual type of data you expect.
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

function Page() {
  const [selectedSection, setSelectedSection] = useState("videos");
  const [modalState, setModalState] = useState({
    isShareModalOpen: false,
  });
  const USERDATA = [
    {
      userID: "123",
      name: "Hannery",
      profilePicture: IMAGES.AccountProfile,
      username: "rocks_hanne",
      bio: "Lorem ipsum dolor sit amet consect. Ante duis tellus tincidunt nibh hi hahshhanjnjnijnijnihbibibib",
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
          <div className="flex gap-4 items-center">
            <Image
              className="hover:opacity-80 cursor-pointer"
              src={SVG.Back}
              alt="Settings"
              width={32}
              height={32}
            />
            <h1 className={`${leagueGothic.className} text-4xl`}>Back</h1>
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
        {USERDATA.map((user) => (
          <div
            key={user.userID}
            className="lg:w-8/12 md:w-10/12 w-full flex flex-col gap-4"
          >
            <div className="flex justify-between lg:flex-row  w-full gap-4 mb-6">
              <div className="flex items-top">
                <Image
                  className="w-40 h-40 rounded-xl  object-cover"
                  src={user.profilePicture}
                  width={0}
                  height={0}
                  sizes="100vw"
                  alt="Account Profile"
                />
              </div>

              <div className="flex flex-1 flex-col gap-2 flex-wrap justify-center text-center lg:justify-start lg:text-start p-2 ">
                <p className="font-bold">{user.name}</p>
                <div className="flex items-center gap-2 justify-between lg:justify-between">
                  <div className="flex items-center">
                    <p className="text-white">({user.username})</p>
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
                <div className="flex h-8 md:gap-8">
                  <div className="flex items-center gap-2 ">
                    <span
                      className={`${leagueGothic.className} text-lg md:text-2xl font-normal`}
                    >
                      {user.posts}
                    </span>
                    <span className="md:text-lg text-gray-400">Posts</span>
                  </div>

                  {/* Vertical divider */}
                  <div className="border-r border-gray-700 h-full  rounded-full mx-2"></div>
                  <div className="flex items-center gap-2 ">
                    <span
                      className={`${leagueGothic.className} text-lg md:text-2xl font-normal`}
                    >
                      {user.followers}
                    </span>
                    <span className="md:text-lg text-gray-400">Followers</span>
                  </div>
                  {/* Vertical divider */}
                  <div className="border-r border-gray-700 h-full  rounded-full mx-2"></div>

                  <div className="flex items-center gap-2 ">
                    <span
                      className={`${leagueGothic.className} text-lg md:text-2xl font-normal`}
                    >
                      {user.following}
                    </span>
                    <span className="md:text-lg text-gray-400">Following</span>
                  </div>
                </div>

                {/* followed by */}
                <div className="flex h-8 items-center  my-2 gap-6 sm:gap-6 -space-x-4">
                  <div className="flex -space-x-4">
                    <Image
                      className="w-8 h-8 rounded-full border-gray-800"
                      src={IMAGES.Ellipse1}
                      alt="Next"
                      width={0}
                      height={0}
                      sizes="100vw"
                    />
                    <Image
                      className="w-8 h-8 rounded-full border-gray-800"
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
                <div className="flex h-8 my-4 gap-8 sm:gap-8 -space-x-4">
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
                </div>

                {/* Buttons */}
                <div className="flex h-8 gap-6 sm:gap-6">
                  <button className="font-bold w-40 h-10 bg-[#37C535] text-white text-center py-[10px] px-[40px] rounded-tl-[20px] rounded-br-[20px] rounded-tr-[5px] rounded-bl-[5px] mb-3">
                    Unfolow
                  </button>
                  <button className="font-bold w-40 h-10 bg-[#37C535] text-white text-center py-[10px] px-[40px] rounded-tl-[20px] rounded-br-[20px] rounded-tr-[5px] rounded-bl-[5px] mb-3">
                    Message
                  </button>
                </div>
              </div>
            </div>

            {/* Top Bar */}
            <div className="h-10 w-full flex justify-around items-center">
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
              </div>

              <div
                className={`flex gap-2 items-center cursor-pointer ${
                  selectedSection === "clips" ? "text-white" : "text-gray-500"
                }`}
                onClick={() => setSelectedSection("clips")}
              >
                <Image
                  className={`${
                    selectedSection !== "clips" ? "opacity-40" : "opacity-100"
                  }`}
                  src={SVG.Clip2}
                  alt="clips"
                  width={100}
                  height={32}
                />
              </div>

              <div
                className={`flex gap-2 items-center cursor-pointer ${
                  selectedSection === "story" ? "text-white" : "text-gray-500"
                }`}
                onClick={() => setSelectedSection("story")}
              >
                <Image
                  className={`${
                    selectedSection !== "story" ? "opacity-40" : "opacity-100"
                  }`}
                  src={SVG.Story}
                  alt="story"
                  width={100}
                  height={10}
                />
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
              </div>
            </div>

            {/* green line */}
            <div>
              <div
                className={`flex w-full ${
                  selectedSection === "videos"
                    ? "justify-start"
                    : selectedSection === "clips"
                    ? "justify-center"
                    : selectedSection === "story"
                    ? "justify-evenly"
                    : selectedSection === "bookmarks"
                    ? "justify-center"
                    : "justify-end"
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
              <hr className="h-px  border-0 bg-gray-700" />
            </div>

            {/* Content Section */}
            {selectedSection === "videos" ? (
              <MyVideosSection data={popular} />
            ) : selectedSection === "bookmarks" ? (
              <ClipsSection data={popular} />
            ) : selectedSection === "clips" ? (
              <StorySection data={popular} />
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
    </Layout>
  );
}

export default Page;
