"use client";
import { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import { SVG } from "@/assets/SVG";
import { IMAGES } from "@/assets/images";
import Followers from "@/components/Modals/Followers";
import Following from "@/components/Modals/Following";
import Modal from "@/components/Modals/Modal";
import MoreOptions from "@/components/Modals/MoreOptions";
import VideoDetails from "@/components/Modals/VideoDetails";
import { dispatch, useSelector } from "@/store";
import { userSession } from "@/store/slices/authSlice";
import { getAllPostVideos } from "@/store/slices/postSlice";
import { getAllUsers, getProfileInfo } from "@/store/slices/userSlice";
import { copyToClipboard } from "@/utils/helpers";
import { getCookieValue, getFromLocal } from "@/utils/localStorage";
import Layout from "@/components/CustomLayout/layout";
import Loading from "./loading";

function MyGamefolio() {
  const authState = useSelector((state: any) => state.auth.userData) || [];
  const postState = useSelector((state: any) => state.post) || [];
  const [postID, setPostID] = useState("");
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
    dispatch(getAllPostVideos());
    dispatch(getAllUsers());
  }, [postState.refresh]);

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

  return (
    <Layout>
      <Suspense fallback={<Loading />}>
        <div
          className="flex"
          style={{
            background: `linear-gradient(to bottom, transparent 25%, rgba(0, 0, 0, 0.9) 40%), ${backgroundImage}`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Top Bar */}
          <div className="flex justify-end mx-3 w-full">
            <div className="w-72 h-11/12 border-2 border-[#1C2C2E] rounded-lg p-2 pt-6 bg-[#091619] mt-24">
              <div className="flex justify-center">
                <Image
                  className="rounded-xl w-32 h-32 object-cover border-2 border-[#43DD4E]"
                  src={authState?.profilePicture}
                  width={10}
                  height={10}
                  sizes="100vw"
                  alt="Account Profile"
                />
              </div>
              <span className="flex justify-center font-semibold text-white">
                {authState?.name}
              </span>
              <div className="flex items-center gap-6 justify-center">
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

              <div className="flex h-8 gap-2 my-6">
                <button className="font-bold w-40 h-10 bg-[#292D32] text-white text-center py-[10px] px-[10px] rounded-tl-[20px] rounded-br-[20px] rounded-tr-[5px] rounded-bl-[5px]">
                  follow
                </button>
                <button className="font-bold w-40 h-10 bg-[#37C535] text-white text-center py-[10px] px-[10px] rounded-tl-[20px] rounded-br-[20px] rounded-tr-[5px] rounded-bl-[5px]">
                  Message
                </button>
              </div>
              <div className="flex items-center justify-between">
                <p>Posts</p>
                <p>{userVideos.length || 0}</p>
              </div>
              <hr className="h-px border-0 bg-[#586769] my-2 " />
              <div className="flex items-center justify-between">
                <p>Followers</p>
                <p>{authState?.follower?.length || 0}</p>
              </div>
              <hr className="h-px border-0 bg-[#586769] my-2 " />
              <div className="flex items-center justify-between">
                <p>Following</p>
                <p>{authState?.following?.length || 0}</p>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-[#162423] p-2 mt-2">
                <Image
                  className="rounded-xl w-10 h-10 object-cover"
                  src={SVG.PlayStation}
                  width={10}
                  height={10}
                  sizes="100vw"
                  alt="Account Profile"
                />
                <p className="font-light text-xs ">Connect with Playstation</p>
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
                <p className="font-normal text-xs ">Connect with Twitch</p>
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
                <p className="font-normal text-xs ">Connect with Xbox</p>
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
                <p className="font-normal text-xs ">Connect with Steam</p>
              </div>

              <h1 className="font-bold my-2">About Me:</h1>
              <p className="font-light text-xs text-[#7C7F80]">
                {authState.bio}
              </p>
            </div>

            <div className="w-8/12 justify-between items-center h-10  mt-56">
              {/* header */}
              <div className="flex items-center">
                <div className="flex justify-between items-center w-full sm:mx-2 lg:mx-4 relative">
                  <div>
                    <p className="font-semibold text-base sm:text-lg lg:text-lg text-white">
                      Portfolio
                    </p>
                  </div>

                  <div className="flex items-center bg-[#1C2C2E] flex gap-2 p-1 items-center rounded-lg overflow-hidden absolute right-10">
                    <Image
                      src={SVG.Search}
                      alt="Search"
                      width={20}
                      height={20}
                      className="absolute left-2"
                    />
                    <input
                      className="bg-[#1C2C2E] outline-none text-white flex-grow pl-8 text-sm sm:text-base"
                      placeholder="Search"
                    />
                  </div>
                  <Image
                    src={SVG.Filter}
                    alt="Filter"
                    width={25}
                    height={25}
                    className="absolute right-2"
                  />
                </div>
              </div>

              {/* line */}
              <hr className="h-px border-0 bg-[#586769] my-2 mx-4" />
              {/* Profile */}
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
                          <Image
                            src={SVG.Mute}
                            alt="Mute"
                            width={40}
                            height={40}
                          />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* </div> */}
            </div>
          </div>
        </div>
      </Suspense>

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
          detailedPost={detailedPost}
          handleCloseModal={() => handleModalToggle("isVideoDetailOpen")}
          handlePageRefresh={() => handlePageRefresh()}
        />
      </Modal>
    </Layout>
  );
}

export default MyGamefolio;
