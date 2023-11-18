"use client";
import { SVG } from "@/assets/SVG";
import { IMAGES } from "@/assets/images";
import Modal from "@/components/Modals/Modal";
import SharePost from "@/components/Modals/SharePost";
import VideoDetails from "@/components/Modals/VideoDetails";
import AllStories from "@/components/story/AllStories";
import Image from "next/image";
import { Suspense, useEffect, useState } from "react";
import Layout from "@/components/CustomLayout/layout";
import { dispatch } from "@/store";
import { userSession } from "@/store/slices/authSlice";
import Loading from "@/app/main/loading";
import { useSelector } from "react-redux";
import { getCookieValue, getFromLocal } from "@/utils/localStorage";
import { getAllPostVideos } from "@/store/slices/postSlice";

function Main() {
  const authState = useSelector((state: any) => state.auth.userData) || [];
  const postState = useSelector((state: any) => state.post.videos) || [];

  // Object.keys(authState).map((key) => {
  //   const value = authState[key];
  //   console.log(key, value);
  // });
  const payload = {
    userToken: getFromLocal("@token") || getCookieValue("gfoliotoken"),
  };
  const params = {
    payload,
  };
  useEffect(() => {
    dispatch(userSession(params));
    dispatch(getAllPostVideos());
  }, []);
  console.log("authState MAIN", authState);

  const [modalState, setModalState] = useState({
    isPostShareOpen: false,
    isVideoDetailOpen: false,
  });
  console.log("#####333333", authState);
  console.log("#####POSTSTATE: ", postState);

  const handleModalToggle = (modalName: keyof typeof modalState) => {
    setModalState((prevState) => ({
      ...prevState,
      [modalName]: !prevState[modalName],
    }));
  };

  const sectionStyle = {
    backgroundImage: `linear-gradient(to bottom, rgba(4, 50, 12, 1), rgba(4, 50, 12, 0) 10%)`,
  };

  const USERDATA = [
    {
      id: "1",
      name: "Hannery",
      profilePicture: IMAGES.Profile,
      post: IMAGES.Post2,
      date: "17 sep, 2022",
      description:
        "Lorem ipsum dolor sit amet consectetur. Ante duis tellus tincidunt nibh hi hahshhanjnjnijnijnihbibibib",
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
  ];

  return (
    <Layout>
      <AllStories />
      <Suspense fallback={<Loading />}>
        <div
          style={sectionStyle}
          className="flex bg-[#091619] h-full justify-center py-4 overflow-y-scroll no-scrollbar"
        >
          <div className="flex justify-center">
            <div className="w-11/12 sm:w-9/12 flex flex-col gap-8 rounded-lg">
              {postState.map((post: any) => (
                <div
                  key={post._id}
                  className="border border-[#1C2C2E] rounded-2xl bg-[#091619]"
                >
                  <div className="flex items-center justify-between m-3">
                    <div className="flex items-center gap-4">
                      <Image
                        className="w-12 h-12 rounded-lg"
                        src={post?.profilePicture}
                        alt="Profile"
                        width={50}
                        height={50}
                        sizes="100vw"
                      />
                      <div>
                        <h1 className="text-xs sm:text-lg font-bold text-gray-900 md:text-xl dark:text-white hover:opacity-80">
                          {post?.name}
                        </h1>
                        <p className="text-base font-light text-gray-600 dark:text-gray-400">
                          {post?.email}
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
                    <p className="text-neutral-300">{post?.description}</p>
                  </div>

                  <video
                    className="w-[800px] h-[300px] sm:h-[400px] my-2 sm:my-2"
                    src={post.video}
                    width={50}
                    height={50}
                    autoPlay
                    controls
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
                      <p>{post?.like}K</p>
                    </div>
                    <div className="flex items-center p-2 mr-2 rounded-lg bg-[#162423]">
                      <Image
                        className="mr-2 hover:opacity-80"
                        src={SVG.Love}
                        alt="Love"
                        width={30}
                        height={30}
                      />
                      <p>{post?.love}</p>
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
                      <p
                        className="hover:opacity-80"
                        onClick={() => handleModalToggle("isVideoDetailOpen")}
                      >
                        {post?.comment} Comments
                      </p>
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
      </Suspense>

      <Modal
        isOpen={modalState.isPostShareOpen}
        handleClose={() => handleModalToggle("isPostShareOpen")}
      >
        <SharePost
          handleCloseModal={() => handleModalToggle("isPostShareOpen")}
        />
      </Modal>

      <Modal
        isOpen={modalState.isVideoDetailOpen}
        handleClose={() => handleModalToggle("isVideoDetailOpen")}
      >
        <VideoDetails
          handleCloseModal={() => handleModalToggle("isVideoDetailOpen")}
        />
      </Modal>
    </Layout>
  );
}

export default Main;
