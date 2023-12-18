"use client";
import Loading from "@/app/main/loading";
import { SVG } from "@/assets/SVG";
import Layout from "@/components/CustomLayout/layout";
import DeletePost from "@/components/Modals/DeletePost";
import Modal from "@/components/Modals/Modal";
import SharePost from "@/components/Modals/SharePost";
import VideoDetails from "@/components/Modals/VideoDetails";
import { toastError, toastSuccess } from "@/components/Toast/Toast";
import AllStories from "@/components/story/AllStories";
import { dispatch, useSelector } from "@/store";
import { userSession } from "@/store/slices/authSlice";
import {
  createVideoReaction,
  deleteVideoReaction,
  getAllPostVideos,
  refreshPage,
} from "@/store/slices/postSlice";
import { getCookieValue, getFromLocal } from "@/utils/localStorage";
import Image from "next/image";
import { Suspense, VideoHTMLAttributes, useEffect, useState } from "react";

function Main() {
  const authState = useSelector((state: any) => state.auth.userData) || [];
  const postState = useSelector((state: any) => state.post) || [];
  const [postID, setPostID] = useState("");
  const [detailedPost, setDetailedPost] = useState("");

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

  console.log("secondtime");

  console.log("postState", postState);

  const [modalState, setModalState] = useState({
    isPostShareOpen: false,
    isVideoDetailOpen: false,
    isPostDeleteOpen: false,
  });

  const handleModalToggle = (
    modalName: keyof typeof modalState,
    postID?: any,
    detailedPost?: any
  ) => {
    setPostID(postID);
    setDetailedPost(detailedPost);
    setModalState((prevState) => ({
      ...prevState,
      [modalName]: !prevState[modalName],
    }));
  };

  console.log("POSTID ****: ", postID);

  const sectionStyle = {
    backgroundImage: `linear-gradient(to bottom, rgba(4, 50, 12, 1), rgba(4, 50, 12, 0) 10%)`,
  };

  const videoLoading: "auto" | "eager" | "lazy" | undefined = "lazy";

  const handleCreateReaction = async (postID: any, reactionType: any) => {
    const payload = {
      userID: authState._id,
      postID: postID,
      reactionType: reactionType,
    };

    console.log("My Payload CREATE Reaction: >><> ", payload);

    const successCallback = (response: any) => {
      // console.log("RESPONSE ADDVIDEO: ", response);
      handlePageRefresh();
      // toastSuccess(response);
    };

    const errorCallback = (error: string) => {
      toastError(error);
    };

    const params = {
      payload,
      successCallback,
      errorCallback,
    };

    dispatch(createVideoReaction(params));
  };

  const handleDeleteReaction = async (postID: any, reactionID: any) => {
    const payload = {
      userID: authState._id,
      postID: postID,
      reactionID: reactionID,
    };

    console.log("My Payload Reaction: >><> ", payload);

    const successCallback = (response: any) => {
      console.log("RESPONSE ADDVIDEO: ", response);
      handlePageRefresh();
      // toastSuccess(response);
    };

    const errorCallback = (error: string) => {
      toastError(error);
    };

    const params = {
      payload,
      successCallback,
      errorCallback,
    };

    dispatch(deleteVideoReaction(params));
  };

  const handlePageRefresh = () => {
    dispatch(refreshPage());
  };

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
              {postState.videos.map((post: any) => {
                // Check if the current user has reacted with "like" or "love"
                const hasLikeReacted = post.reactions.some(
                  (reaction: any) =>
                    reaction.userID === authState._id &&
                    reaction.reactionType === "like"
                );

                const hasLoveReacted = post.reactions.some(
                  (reaction: any) =>
                    reaction.userID === authState._id &&
                    reaction.reactionType === "love"
                );

                // Find the reaction ID for the current user
                const reactionID = post.reactions.find(
                  (reaction: any) => reaction.userID === authState._id
                );

                return (
                  <div
                    key={post._id}
                    className="border border-[#1C2C2E] rounded-2xl bg-[#091619]"
                  >
                    <div className="flex items-center justify-between m-3">
                      <div className="flex items-center sm:gap-4 gap-2">
                        <Image
                          className="w-12 h-12 rounded-lg"
                          src={post?.userID?.profilePicture}
                          alt="Profile"
                          width={50}
                          height={50}
                          sizes="100vw"
                        />
                        <div>
                          <h1 className="w-[230px] sm:w-[350px] text-sm md:text-lg sm:text-md font-bold text-white hover:opacity-80">
                            {post?.userID?.name}
                          </h1>
                          <p className="md:text-md sm:text-md text-base font-light text-gray-400">
                            {post?.date &&
                              new Date(post.date).toLocaleString("en-US", {
                                hour: "numeric",
                                minute: "numeric",
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center m-3">
                        <Image
                          className="ml-3 cursor-pointer hover:opacity-80"
                          src={SVG.Bookmark}
                          alt="Bookmark"
                          width={20}
                          height={20}
                        />
                        <Image
                          className="ml-3 cursor-pointer hover:opacity-80"
                          src={SVG.Threedots}
                          alt="Threedots"
                          width={5}
                          height={5}
                          onClick={() =>
                            handleModalToggle("isPostDeleteOpen", post._id)
                          }
                        />
                      </div>
                    </div>

                    <div className="mx-3">
                      <p className="text-neutral-300">{post?.description}</p>
                    </div>

                    <video
                      className="w-[710px] h-[185px] sm:h-[300px] my-2 sm:my-2"
                      src={post.video}
                      style={{ aspectRatio: "16:9" }}
                      width={50}
                      height={50}
                      controls
                      controlsList=" nodownload  noremoteplayback noplaybackrate"
                      disablePictureInPicture
                      autoPlay={false}
                      preload="metadata"
                      // loading="lazy"
                    />

                    <div className="flex items-center my-3 mx-2">
                      <div
                        className="flex items-center p-2 mr-2 rounded-lg bg-[#162423]"
                        onClick={
                          hasLikeReacted
                            ? () =>
                                handleDeleteReaction(post._id, reactionID._id)
                            : () => handleCreateReaction(post._id, "like")
                        }
                      >
                        <Image
                          className="mr-2 cursor-pointer hover:opacity-80"
                          src={SVG.Like}
                          alt="Like"
                          width={30}
                          height={30}
                        />
                        <p className="text-white">
                          {
                            post.reactions.filter(
                              (reaction: any) =>
                                reaction.reactionType === "like"
                            ).length
                          }
                        </p>
                      </div>

                      <div
                        className="flex items-center p-2 mr-2 rounded-lg bg-[#162423]"
                        onClick={
                          hasLoveReacted
                            ? () =>
                                handleDeleteReaction(post._id, reactionID._id)
                            : () => handleCreateReaction(post._id, "love")
                        }
                      >
                        <Image
                          className="mr-2 cursor-pointer hover:opacity-80"
                          src={SVG.Love}
                          alt="Love"
                          width={30}
                          height={30}
                        />
                        <p className="text-white">
                          {
                            post.reactions.filter(
                              (reaction: any) =>
                                reaction.reactionType === "love"
                            ).length
                          }
                        </p>
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
                        src={SVG.Gcoin}
                        alt="Gcoin"
                        width={45}
                        height={45}
                      />
                    </div>

                    <div className="flex items-center justify-between w-full p-4">
                      <div>
                        <p
                          className="cursor-pointer hover:opacity-80 text-white"
                          onClick={() =>
                            handleModalToggle(
                              "isVideoDetailOpen",
                              post._id,
                              post
                            )
                          }
                        >
                          {post?.comment} Comments
                        </p>
                      </div>
                      <div>
                        <div
                          onClick={() => handleModalToggle("isPostShareOpen")}
                        >
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
                );
              })}
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
          postID={postID}
          detailedPost={detailedPost}
          handleCloseModal={() => handleModalToggle("isVideoDetailOpen")}
          handlePageRefresh={() => handlePageRefresh()}
        />
      </Modal>

      <Modal
        isOpen={modalState.isPostDeleteOpen}
        handleClose={() => handleModalToggle("isPostDeleteOpen")}
      >
        <DeletePost
          postID={postID}
          handleCloseModal={() => handleModalToggle("isPostDeleteOpen")}
          handlePageRefresh={() => handlePageRefresh()}
        />
      </Modal>
    </Layout>
  );
}

export default Main;
