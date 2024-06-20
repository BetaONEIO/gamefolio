"use client";
import Loading from "@/app/main/loading";
import { SVG } from "@/assets/SVG";
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
import {
  handleCreateNotification,
  handleUpdateNotification,
} from "@/components/Notification/Notification";
import { toastError, toastSuccess } from "@/components/Toast/Toast";
import FollowingStories from "@/components/story/FollowingStories";
import { fetchGameList } from "@/services/api";
import { dispatch, useSelector } from "@/store";
import { userSession } from "@/store/slices/authSlice";
import {
  createBookmark,
  createVideoReaction,
  deleteVideoReaction,
  getFollowingPostOnly,
  refreshPage,
  updateDetailedPost,
} from "@/store/slices/postSlice";
import { getCookieValue, getFromLocal } from "@/utils/localStorage";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";

const SkeletonLoader = () => (
  <div className="flex flex-col gap-6">
    <div className="flex justify-between items-center">
      <div className="flex gap-2">
        <div className="w-14 h-14 bg-gray-700 rounded-xl animate-pulse"></div>
        <div className="flex flex-col gap-1">
          <div className="w-20 h-4 bg-gray-700 rounded animate-pulse"></div>
          <div className="w-32 h-6 bg-gray-700 rounded animate-pulse"></div>
          <div className="w-24 h-4 bg-gray-700 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  </div>
);

const PostLoader = () => {
  return (
    <div className="border border-[#1C2C2E] rounded-2xl bg-[#091619] min-w-fit md:min-w-min animate-pulse">
      <div className="flex items-center justify-between m-3">
        <div className="flex items-center sm:gap-4 gap-2">
          <div className="w-12 h-12 rounded-xl bg-gray-700"></div>
          <div>
            <div className="w-[230px] sm:w-[350px] h-6 bg-gray-700 mb-2"></div>
            <div className="w-40 h-4 bg-gray-700"></div>
          </div>
        </div>
        <div className="flex items-center gap-3 w-10">
          <div className="w-5 h-5 bg-gray-700"></div>
          <div className="w-5 h-5 bg-gray-700"></div>
        </div>
      </div>
      <div className="mx-3">
        <div className="w-full h-4 bg-gray-700 mb-2"></div>
        <div className="w-full h-4 bg-gray-700"></div>
      </div>
      <div className="w-[0px] h-[185px] sm:h-[300px] my-2 sm:my-2 bg-gray-700"></div>
      <div className="flex items-center my-3 mx-2">
        <div className="flex items-center p-2 mr-2 rounded-lg bg-gray-700 w-16 h-10"></div>
        <div className="flex items-center p-2 mr-2 rounded-lg bg-gray-700 w-16 h-10"></div>
        <div className="p-2 mr-2 rounded-lg bg-gray-700 w-10 h-10"></div>
        <div className="p-2 mr-2 rounded-lg bg-gray-700 w-10 h-10"></div>
        <div className="w-12 h-12 bg-gray-700"></div>
      </div>
      <div className="flex items-center justify-between w-full p-4">
        <div className="w-24 h-4 bg-gray-700"></div>
        <div className="w-6 h-6 bg-gray-700"></div>
      </div>
    </div>
  );
};

const NotificationSkeletonLoader = () => {
  return (
    <div className="flex items-center gap-1 animate-pulse">
      <div className="w-10 h-10 rounded-lg bg-gray-700"></div>
      <div className="flex flex-col">
        <div className="flex items-center gap-2 mx-2">
          <div className="w-28 h-4 bg-gray-700"></div>
          <div className="w-32 h-4 bg-gray-700"></div>
        </div>
        <div className="w-56 h-4 bg-gray-700 mx-2"></div>
      </div>
    </div>
  );
};

function Main() {
  const authState = useSelector((state: any) => state.auth.userData) || [];
  const postState = useSelector((state: any) => state.post) || [];
  const [postID, setPostID] = useState("");
  const [optionsForGame, setOptionsForGame] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState(optionsForGame);
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

  useEffect(() => {
    const payload = {
      userToken: getFromLocal("@token") || getCookieValue("gfoliotoken"),
      limit: 2,
      page: page,
    };

    const params = {
      payload,
    };
    dispatch(userSession(params));
    dispatch(getFollowingPostOnly(params));
    handleGameList();
  }, [page, postState.refresh]);

  useEffect(() => {
    setFilteredOptions(optionsForGame);
  }, [optionsForGame]);

  const handleGameList = async () => {
    const gettingGameList = await fetchGameList();
    setOptionsForGame(gettingGameList);
  };

  const isView = authState?.notification?.every((item: any) => item.isView);

  const getNotificationMessage = (notificationType: any) => {
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
    dispatch(updateDetailedPost(detailedPost));
    setModalState((prevState) => ({
      ...prevState,
      [modalName]: !prevState[modalName],
    }));
  };

  const sectionStyle = {
    backgroundImage: `linear-gradient(to bottom, rgba(4, 50, 12, 1), rgba(4, 50, 12, 0) 10%)`,
  };

  console.log("helll", authState.notification);

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

  const convertDateFormat = (dateString: any) => {
    const date = new Date(dateString);

    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12;

    const formattedTime = `${hours}:${minutes
      .toString()
      .padStart(2, "0")} ${ampm}`;

    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear().toString().slice(-2);

    const formattedDate = `${month}/${day}/${year}`;

    return `${formattedTime}-${formattedDate}`;
  };

  const removeGame = (gameNameToRemove: any) => {
    // Filter out the game named "Just Chatting"
    const filteredGames = filteredOptions.filter(
      (item: any) => item.name !== gameNameToRemove
    );
    return filteredGames;
  };

  // Assuming you have the name of the game as "Just Chatting"
  const gameToRemove = "Just Chatting";

  // Call removeGame function to filter out the game
  const filteredGames = removeGame(gameToRemove);

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
            <div
              className="hidden w-[30.9rem] h-1/2 md:flex flex-col gap-6 rounded-lg bg-[#091619] border border-[#1C2C2E] px-4 py-6 overflow-y-auto"
              style={styles.scroller}
            >
              <div className="flex justify-between items-center">
                <span className="text-white font-bold">Trendings</span>
                <Link href={"/trending"}>
                  <span className="text-xs text-[#43DD4E] cursor-pointer">
                    See More
                  </span>
                </Link>
              </div>
              {filteredGames.length === 0 ? (
                <>
                  {[...Array(4)].map((_, index) => (
                    <SkeletonLoader key={index} />
                  ))}
                </>
              ) : (
                filteredGames.slice(0, 10).map((item: any, index: number) => (
                  <div className="flex flex-col gap-6" key={index}>
                    <div className="flex justify-between items-center">
                      <div className="flex gap-2">
                        <Image
                          width={56}
                          height={64}
                          className="w-14 h-14 rounded-xl"
                          src={item.box_art_url.replace(
                            "{width}x{height}",
                            "64x64"
                          )}
                          alt={item.name}
                        />

                        <div className="flex flex-col ">
                          <span className="text-xs font-bold text-[#43DD4E]">
                            Trending Now
                          </span>
                          <span className="text-md font-semibold text-white">
                            {item.name}
                          </span>
                          <span className="text-xs text-gray-500 ">
                            New addition Arrived
                          </span>
                        </div>
                      </div>

                      {/* <div>
                      <Image
                        className="cursor-pointer hover:opacity-80"
                        src={SVG.Threedots}
                        alt="Threedots"
                        width={5}
                        height={5}
                      />
                    </div> */}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Story , Posts */}
            <div className="w-11/12 sm:w-10/12 flex  flex-col gap-3 rounded-lg ">
              <div>
                <FollowingStories />
              </div>
              <div className="bg-[#091619] border border-dashed border-green-800 rounded-lg flex flex-col px-4 py-6 justify-center items-start gap-4">
                <span className="text-white font-bold text-sm md:text-lg">
                  Add New
                </span>
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
                    <p className="text-white font-bold">Post Clips</p>
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
                    <p className="text-white font-bold">Post Videos</p>
                  </div>
                </div>
              </div>
              {postState?.followingVideos?.length === 0 ? (
                <>
                  {[...Array(1)].map((_, index) => (
                    <PostLoader key={index} />
                  ))}
                </>
              ) : (
                postState?.followingVideos?.map((post: any) => {
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
                            onClick={() =>
                              handleModalToggle("isPostShareOpen", post._id)
                            }
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
                })
              )}
              {loading && <MoreLoader />}
            </div>

            {/* Notification */}
            <div
              className="hidden w-[32.3rem] h-2/3 md:flex flex-col gap-4 rounded-lg bg-[#091619] border border-[#1C2C2E] px-2 py-6 overflow-hidden overflow-y-auto"
              style={styles.scroller}
            >
              <div className="flex justify-between items-center">
                <span className="text-white font-bold">Notification</span>
                <div className="flex gap-2">
                  <span
                    className={`text-xs cursor-pointer ${
                      isView ? "text-gray-500" : "text-[#43DD4E]"
                    }`}
                  >
                    Unread
                  </span>
                  <span
                    className={`text-xs cursor-pointer ${
                      isView ? "text-[#43DD4E]" : "text-gray-500"
                    }`}
                  >
                    Read
                  </span>
                </div>
              </div>
              {authState?.notification?.length == 0 ? (
                <>
                  {[...Array(5)].map((_, index) => (
                    <PostLoader key={index} />
                  ))}
                </>
              ) : (
                authState?.notification?.map((notification: any) => (
                  <div
                    key={notification._id}
                    className={`flex items-center gap-0.2 cursor-pointer hover:opacity-80 hover:bg-[#162423] p-2 ${
                      notification.isView === false
                        ? "bg-[#162423]"
                        : "bg-[#091619]"
                    }`}
                    onClick={() =>
                      handleUpdateNotification(authState._id, notification._id)
                    }
                  >
                    <Image
                      className="w-10 h-10 rounded-lg"
                      src={notification.oppositionID.profilePicture}
                      alt="picture"
                      width={12}
                      height={12}
                      sizes="100vw"
                    />
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 mx-2">
                        <p
                          className={`w-28 text-xs text-white ${
                            notification.isView === false
                              ? "font-bold"
                              : "font-semibold"
                          }`}
                        >
                          {notification.oppositionID.name.length > 12
                            ? `${notification.oppositionID.name.substring(
                                0,
                                10
                              )}`
                            : notification.oppositionID.name}
                        </p>
                        <p
                          className={`w-32 text-[0.60rem] text-gray-400 ${
                            notification.isView === false
                              ? "font-bold"
                              : "font-semibold"
                          }`}
                        >
                          {convertDateFormat(notification.date)}
                        </p>
                      </div>
                      <span
                        className={`text-xs text-white mx-2 ${
                          notification.isView === false
                            ? "font-bold"
                            : "font-normal"
                        }`}
                      >
                        {getNotificationMessage(notification.notificationType)}
                      </span>
                    </div>
                  </div>
                ))
              )}
              {loading && <NotificationSkeletonLoader />}
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
          postID={postID}
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
