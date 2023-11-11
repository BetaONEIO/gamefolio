"use client";
import React, { useState } from "react";
import { SVG } from "@/assets/SVG";
import { IMAGES } from "@/assets/images";
import Layout from "@/components/CustomLayout/layout";
import Modal from "@/components/Modals/Modal";
import SharePost from "@/components/Modals/SharePost";
import { leagueGothic } from "@/font/font";
import Image from "next/image";

function Trending() {
  const [modalState, setModalState] = useState({
    isPostShareOpen: false,
  });

  const sectionStyle = {
    backgroundImage: `linear-gradient(to bottom, rgba(4, 50, 12, 1), rgba(4, 50, 12, 0) 10%)`,
  };
  const headerStyle = {
    backgroundImage: `linear-gradient(180deg, #46A541 0%, #B5D759 100%)`,
  };

  const handleModalToggle = (modalName: keyof typeof modalState) => {
    setModalState((prevState) => ({
      ...prevState,
      [modalName]: !prevState[modalName],
    }));
  };

  const USERDATA = [
    {
      id: "1",
      name: "Hannery",
      profilePicture: IMAGES.Profile,
      post: IMAGES.Post,
      date: "17 sep, 2022",
      description:
        "Lorem ipsum dolor sit amet consect. Ante duis tellus tincidunt nibh hi hahshhanjnjnijnijnihbibibib",
      like: 5.4,
      love: 120,
      comment: 165,
    },

    {
      id: "2",
      name: "Hannery",
      profilePicture: IMAGES.Profile,
      post: IMAGES.Post,
      date: "17 sep, 2022",
      description:
        "Lorem ipsum dolor sit amet consect. Ante duis tellus tincidunt nibh hi hahshhanjnjnijnijnihbibibib",
      like: 5.4,
      love: 120,
      comment: 165,
    },
    {
      id: "3",
      name: "Hannery",
      profilePicture: IMAGES.Profile,
      post: IMAGES.Post,
      date: "17 sep, 2022",
      description:
        "Lorem ipsum dolor sit amet consect. Ante duis tellus tincidunt nibh hi hahshhanjnjnijnijnihbibibib",
      like: 5.4,
      love: 120,
      comment: 165,
    },
    {
      id: "4",
      name: "Hannery",
      profilePicture: IMAGES.Profile,
      post: IMAGES.Post,
      date: "17 sep, 2022",
      description:
        "Lorem ipsum dolor sit amet consect. Ante duis tellus tincidunt nibh hi hahshhanjnjnijnijnihbibibib",
      like: 5.4,
      love: 120,
      comment: 165,
    },
    {
      id: "5",
      name: "Hannery",
      profilePicture: IMAGES.Profile,
      post: IMAGES.Post,
      date: "17 sep, 2022",
      description:
        "Lorem ipsum dolor sit amet consect. Ante duis tellus tincidunt nibh hi hahshhanjnjnijnijnihbibibib",
      like: 5.4,
      love: 120,
      comment: 165,
    },
  ];

  return (
    <Layout>
      <div style={headerStyle} className="py-4 bg-[#46A541] ">
        <div className="mx-4">
          <h1 className={`${leagueGothic.className} text-4xl`}>TRENDING</h1>
        </div>
      </div>

      <div
        style={sectionStyle}
        className="flex bg-[#091619] justify-center py-4 overflow-y-scroll no-scrollbar"
      >
        <div className="flex justify-center">
          <div className="w-11/12 sm:w-9/12 flex flex-col gap-8 rounded-lg">
            {USERDATA.map((user) => (
              <div
                key={user.id}
                className="border border-[#1C2C2E] rounded-2xl bg-[#091619]"
                // onClick={() => handleModalToggle("isVideoDetailOpen")}
              >
                <div className="flex items-center justify-between m-3">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Image
                        className="w-12 h-12 rounded-lg"
                        src={user.profilePicture}
                        alt="Profile"
                        width={50}
                        height={50}
                        sizes="100vh"
                      />
                      <Image
                        className="absolute top-9 -right-1.5"
                        src={SVG.King}
                        priority={true}
                        alt="trending"
                        width={20}
                        height={20}
                      />
                    </div>
                    <div>
                      <h1 className="text-lg font-bold text-gray-900 md:text-xl dark:text-white hover:opacity-80">
                        {user.name}
                      </h1>
                      <p className="text-base font-light text-gray-600 dark:text-gray-400">
                        {user.date}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center m-3">
                    <Image
                      className="ml-3 hover:opacity-80"
                      src={SVG.Bookmark}
                      alt="Bookmark"
                      width={20}
                      height={20}
                    />
                    <Image
                      className="ml-3 hover:opacity-80"
                      src={SVG.Threedots}
                      alt="Threedots"
                      width={5}
                      height={5}
                    />
                  </div>
                </div>

                <div className="m-3">
                  <p className="text-neutral-300">{user.description}</p>
                </div>

                <Image
                  className="w-full my-2 sm:my-2"
                  src={IMAGES.Post}
                  alt="Post"
                  width={100}
                  height={100}
                  sizes="100vw"
                />

                <div className="flex items-center my-3 mx-2">
                  <div className="flex items-center p-2 mr-2 rounded-lg bg-[#162423]">
                    <Image
                      className="mr-2 hover:opacity-80"
                      src={SVG.Like}
                      alt="Like"
                      width={30}
                      height={30}
                    />
                    <p>{user.like}K</p>
                  </div>
                  <div className="flex items-center p-2 mr-2 rounded-lg bg-[#162423]">
                    <Image
                      className="mr-2 hover:opacity-80"
                      src={SVG.Love}
                      alt="Love"
                      width={30}
                      height={30}
                    />
                    <p>{user.love}</p>
                  </div>

                  <div className="p-2 mr-2 rounded-lg bg-[#162423]">
                    <Image
                      className="hover:opacity-80"
                      src={SVG.Chat}
                      alt="Comment"
                      width={30}
                      height={30}
                    />
                  </div>

                  <div className="p-2 mr-2 rounded-lg bg-[#162423]">
                    <Image
                      className="hover:opacity-80"
                      src={SVG.Trending}
                      alt="Trending1"
                      width={30}
                      height={30}
                    />
                  </div>

                  <Image
                    className="hover:opacity-80"
                    src={SVG.Gcoin}
                    alt="Gcoin"
                    width={45}
                    height={45}
                  />
                </div>

                <div className="flex items-center justify-between w-full p-4">
                  <div>
                    <p className="hover:opacity-80">{user.comment} Comments</p>
                  </div>
                  <div>
                    <div onClick={() => handleModalToggle("isPostShareOpen")}>
                      <Image
                        className="hover:opacity-80 cursor-pointer"
                        src={SVG.Share}
                        alt="share"
                        width={25}
                        height={25}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalState.isPostShareOpen}
        handleClose={() => handleModalToggle("isPostShareOpen")}
      >
        <SharePost
          handleCloseModal={() => handleModalToggle("isPostShareOpen")}
        />
      </Modal>
    </Layout>
  );
}

export default Trending;
