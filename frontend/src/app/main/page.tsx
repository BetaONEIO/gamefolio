"use client";
import Loading from "@/app/main/loading";
import { SVG } from "@/assets/SVG";
import { IMAGES } from "@/assets/images";
import CustomHeader from "@/components/CustomHeader/CustomHeader";
import Layout from "@/components/CustomLayout/layout";
import MoreLoader from "@/components/CustomLoader/MoreLoader";
import AddClips from "@/components/Modals/AddClips";
import AddVideo from "@/components/Modals/AddVideo";
import DeletePost from "@/components/Modals/DeletePost";
import Modal from "@/components/Modals/Modal";
import Report from "@/components/Modals/Report";
import SharePost from "@/components/Modals/SharePost";
import VideoDetails from "@/components/Modals/VideoDetails";
import handleCreateNotification from "@/components/Notification/Notification";
import { toastError, toastSuccess } from "@/components/Toast/Toast";
import FollowingStories from "@/components/story/FollowingStories";
import { dispatch, useSelector } from "@/store";
import { userSession } from "@/store/slices/authSlice";
import {
  createBookmark,
  createVideoReaction,
  deleteVideoReaction,
  getFollowingPostOnly,
  refreshPage,
} from "@/store/slices/postSlice";
import { getCookieValue, getFromLocal } from "@/utils/localStorage";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";

function Main() {
  const authState = useSelector((state: any) => state.auth.userData) || [];
  const postState = useSelector((state: any) => state.post) || [];
  const [postID, setPostID] = useState("");
  const [detailedPost, setDetailedPost] = useState("");
  const [modalState, setModalState] = useState({
    isPostShareOpen: false,
    isVideoDetailOpen: false,
    isPostDeleteOpen: false,
    isReportModalOpen: false,
    isAddClipsOpen: false,
    isAddVideoOpen: false,
  });

  const { loading } = postState;

  const [page, setPage] = useState(1);

  const payload = {
    userToken: getFromLocal("@token") || getCookieValue("gfoliotoken"),
    limit: 2,
    page: page,
  };

  const params = {
    payload,
  };

  useEffect(() => {
    dispatch(userSession(params));
    dispatch(getFollowingPostOnly(params));
  }, [page, postState.refresh]);

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  }, []);

  const handleInfiniteScroll = async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        // setLoading(true);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getNotificationMessage = (notificationType: any) => {
    console.log("Notification Type:", notificationType);
    switch (notificationType) {
      case "like_post":
        return "Liked your post.";
      case "comment_post":
        return "Commented on your post.";
      case "story":
        return "Liked your story.";
      case "clip":
        return "Liked your clip.";
      case "friendRequest":
        return "sent you a friend request.";

      default:
        return "Unknown notification type";
    }
  };

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

  const sectionStyle = {
    backgroundImage: `linear-gradient(to bottom, rgba(4, 50, 12, 1), rgba(4, 50, 12, 0) 10%)`,
  };

  const handleCreateBookmark = async (postID: any) => {
    const payload = {
      userID: authState._id,
      postID: postID,
    };

    const successCallback = (response: any) => {
      handlePageRefresh();
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

    dispatch(createBookmark(params));
  };

  const handleCreateReaction = async (
    postID: any,
    reactionType: any,
    postUserID: any
  ) => {
    const payload = {
      userID: authState._id,
      postID: postID,
      reactionType: reactionType,
    };

    const successCallback = (response: any) => {
      handleCreateNotification(authState._id, postID, postUserID, "like_post");
      handlePageRefresh();
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

    const successCallback = (response: any) => {
      handlePageRefresh();
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
      <CustomHeader>GAMEFOLIO FEED</CustomHeader>
      {/* <FollowingStories /> */}
      <Suspense fallback={<Loading />}>
        <div
          style={sectionStyle}
          className="flex bg-[#091619] h-full justify-center py-4 overflow-y-scroll no-scrollbar"
        >
          <div className="flex w-full justify-center md:justify-between gap-4 px-4">
            {/* Trending */}
            <div className="hidden w-2/5 h-fit md:flex flex-col gap-8 rounded-lg bg-[#091619] border border-[#1C2C2E] px-4 py-6 ">
              <div className="flex justify-between items-center">
                <span className="font-bold">Trendings</span>
                <Link href={"/trending"}>
                  <span className="text-xs text-[#43DD4E] cursor-pointer">
                    See More
                  </span>
                </Link>
              </div>
              <div className="flex flex-col gap-6">
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <Image
                      width={12}
                      height={12}
                      className="w-16 h-16"
                      src={IMAGES.callofduty}
                      alt="UploadStory"
                    />
                    <div className="flex flex-col ">
                      <span className="text-xs font-bold text-[#43DD4E]">
                        Trending Now
                      </span>
                      <span className="text-lg text-white ">Call of duty</span>
                      <span className="text-xs text-gray-500 ">
                        New addition Arrived
                      </span>
                    </div>
                  </div>

                  <div>
                    <Image
                      className="cursor-pointer hover:opacity-80"
                      src={SVG.Threedots}
                      alt="Threedots"
                      width={5}
                      height={5}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Story , Posts */}
            <div className="w-11/12 sm:w-10/12 flex  flex-col gap-3 rounded-lg ">
              <div>
                <FollowingStories />
              </div>
              <div className="bg-[#091619] border border-dashed border-green-800 rounded-lg flex flex-col px-4 py-6 justify-center items-start gap-4">
                <span className="font-bold text-sm md:text-lg">Add New</span>
                <div className="flex justify-between gap-2 w-full ">
                  <div
                    className="bg-[#162423] rounded-lg flex justify-center items-center w-6/12 h-24 gap-4 cursor-pointer hover:opacity-80"
                    onClick={() => handleModalToggle("isAddClipsOpen")}
                  >
                    <div>
                      <Image
                        className="cursor-pointer w-fit"
                        src={SVG.Clip}
                        alt="Threedots"
                        width={24}
                        height={24}
                      />
                    </div>
                    <p className="font-bold">Post Clips</p>
                  </div>

                  <div
                    className="bg-[#162423] rounded-lg flex justify-center items-center w-6/12 h-24 gap-4 cursor-pointer hover:opacity-80"
                    onClick={() => {
                      handleModalToggle("isAddVideoOpen");
                    }}
                  >
                    <div>
                      <Image
                        className="cursor-pointer w-fit"
                        src={SVG.Video}
                        alt="Threedots"
                        width={24}
                        height={24}
                      />
                    </div>
                    <p className="font-bold">Post Videos</p>
                  </div>
                </div>
              </div>
              {postState?.followingVideos?.map((post: any) => {
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

                const postUserID = post.userID._id;

                return (
                  <div
                    key={post._id}
                    className="border border-[#1C2C2E] rounded-2xl bg-[#091619] min-w-fit md:min-w-min px-2"
                  >
                    <div className="flex items-center justify-between m-3">
                      <div className="flex items-center sm:gap-4 gap-2">
                        <Image
                          className="w-12 h-12 rounded-xl"
                          src={post?.userID?.profilePicture}
                          alt="Profile"
                          width={50}
                          height={50}
                          sizes="100vw"
                          quality={80}
                          loading="lazy"
                        />
                        <div>
                          <Link
                            href={`/account/${post?.userID?.username}`}
                            key={post._id}
                          >
                            <h1 className="w-[230px] sm:w-[350px] text-lg font-bold text-white hover:opacity-80">
                              {post?.userID?.name}
                            </h1>
                          </Link>
                          <p className="text-sm md:text-sm sm:text-base font-light text-gray-400">
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

                      <div className="flex items-center gap-3 w-10">
                        <div onClick={() => handleCreateBookmark(post._id)}>
                          <Image
                            className="cursor-pointer hover:opacity-80"
                            src={SVG.Bookmark}
                            alt="Bookmark"
                            width={20}
                            height={20}
                          />
                        </div>
                        <div>
                          <Image
                            className="cursor-pointer hover:opacity-80"
                            src={SVG.Threedots}
                            alt="Threedots"
                            width={5}
                            height={5}
                            onClick={() =>
                              handleModalToggle("isReportModalOpen", post._id)
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mx-3">
                      <p className="text-neutral-300">{post?.description}</p>
                    </div>
                    {/* 
                    <ReactPlayer
                      className="w-[710px] h-[185px] sm:h-[300px] my-2 sm:my-2"
                      url={"post.video"} // Change 'src' to 'url'
                      width="100%" // Adjust width and height as needed
                      height="55%"
                      controls={true} // Use 'true' instead of 'controls'
                      controlsList="nodownload noremoteplayback noplaybackrate foobar"
                      disablePictureInPicture
                    /> */}

                    <video
                      className="w-[710px] h-[185px] sm:h-[300px] my-2 sm:my-2"
                      src={`${post.video}#t=0.1`}
                      style={{ aspectRatio: "16:9" }}
                      width={50}
                      height={50}
                      controls
                      controlsList="nodownload noremoteplayback noplaybackrate"
                      disablePictureInPicture
                      autoPlay={false}
                      playsInline
                      preload="metadata"
                    />

                    <div className="flex items-center my-3 mx-2">
                      <div
                        className="flex items-center p-2 mr-2 rounded-lg bg-[#162423]"
                        onClick={
                          hasLikeReacted
                            ? () =>
                                handleDeleteReaction(post._id, reactionID._id)
                            : () =>
                                handleCreateReaction(
                                  post._id,
                                  "like",
                                  postUserID
                                )
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
                            : () =>
                                handleCreateReaction(
                                  post._id,
                                  "love",
                                  postUserID
                                )
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
                        src={SVG.GGGCoin}
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
              {loading && <MoreLoader />}
            </div>

            {/* Notification */}
            <div
              className="hidden w-6/12 h-96 md:flex flex-col gap-6 rounded-lg bg-[#091619] border border-[#1C2C2E] px-2 py-6 overflow-hidden overflow-y-auto"
              style={styles.scroller}
            >
              <div className="flex justify-between items-center">
                <span className="font-bold">Notification</span>
                <div className="flex gap-2">
                  <span className="text-xs text-gray-500 cursor-pointer">
                    Unread
                  </span>
                  <span className="text-xs text-[#43DD4E] cursor-pointer">
                    Read
                  </span>
                </div>
              </div>

              {authState?.notification?.map((notification: any) => (
                <div key={notification._id} className="flex items-center gap-1">
                  <Image
                    className="w-10 h-10 rounded-lg"
                    src={notification.oppositionID.profilePicture}
                    alt="picture"
                    width={12}
                    height={12}
                    sizes="100vw"
                  />
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 mx-2">
                      <p className="w-28 text-xs text-white font-semibold">
                        {notification.oppositionID.name.length > 12
                          ? `${notification.oppositionID.name.substring(0, 10)}`
                          : notification.oppositionID.name}
                      </p>
                      <p className="w-32 text-[0.60rem] text-gray-400">
                        {new Date(notification.date).toLocaleString("en-US", {
                          hour: "numeric",
                          minute: "numeric",
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <span className="text-xs text-white mx-2">
                      {getNotificationMessage(notification.notificationType)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Suspense>

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

      <Modal
        isOpen={modalState.isReportModalOpen}
        handleClose={() => handleModalToggle("isReportModalOpen")}
      >
        <Report
          handleCloseModal={() => handleModalToggle("isReportModalOpen")}
        />
      </Modal>

      <Modal
        isOpen={modalState.isAddClipsOpen}
        handleClose={() => handleModalToggle("isAddClipsOpen")}
      >
        <AddClips
          handleCloseModal={() => handleModalToggle("isAddClipsOpen")}
        />
      </Modal>
      <Modal
        isOpen={modalState.isPostShareOpen}
        handleClose={() => handleModalToggle("isPostShareOpen")}
      >
        <SharePost
          handleCloseModal={() => handleModalToggle("isPostShareOpen")}
        />
      </Modal>

      <Modal
        isOpen={modalState.isAddVideoOpen}
        handleClose={() => handleModalToggle("isAddVideoOpen")}
      >
        <AddVideo
          handleCloseModal={() => handleModalToggle("isAddVideoOpen")}
        />
      </Modal>
    </Layout>
  );
}

const styles = {
  scroller: {
    scrollbarColor: "#43DD4E #FFFFFF",
  },
};
export default Main;
