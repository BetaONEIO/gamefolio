"use client";
import { SVG } from "@/assets/SVG";
import { dispatch, useSelector } from "@/store";
import { createComment, refreshPage } from "@/store/slices/postSlice";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { toastError, toastSuccess } from "../Toast/Toast";
import DeletePost from "./DeletePost";
import Modal from "./Modal";
import Report from "./Report";
import handleCreateNotification from "../Notification/Notification";

interface VideoDetailProps {
  handleCloseModal: () => void;
  postID: any;
  detailedPost: any;
  handlePageRefresh: () => void;
}

function VideoDetails({
  handleCloseModal,
  postID,
  detailedPost,
}: VideoDetailProps) {
  const authState = useSelector((state: any) => state.auth.userData) || [];
  const [comments, setComments] = useState("");
  const [emoji, setEmoji] = useState(false);
  const [modalState, setModalState] = useState({
    isPostDeleteOpen: false,
    isReportModalOpen: false,
  });

  console.log("detailedPost: ", detailedPost);

  const handleCreateComment = async (postID: any, comment: any) => {
    const payload = {
      userID: authState._id,
      postID: postID,
      commentText: comment,
    };

    const successCallback = (response: any) => {
      handleCreateNotification(
        authState._id,
        postID,
        detailedPost?.userID?._id,
        "comment_post"
      );
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
    dispatch(createComment(params));
  };

  const handleChange = (e: any) => {
    setComments(e.target.value);
  };

  const handlePageRefresh = () => {
    dispatch(refreshPage());
  };

  function formatRelativeDate(commentDate: any): string {
    const currentDate = new Date();
    const commentDateTime = new Date(commentDate);

    const timeDifference: number =
      currentDate.getTime() - commentDateTime.getTime();
    const seconds: number = Math.floor(timeDifference / 1000);
    const minutes: number = Math.floor(seconds / 60);
    const hours: number = Math.floor(minutes / 60);
    const days: number = Math.floor(hours / 24);

    if (days > 0) {
      return `${days}d`;
    } else if (hours > 0) {
      return `${hours}h`;
    } else if (minutes > 0) {
      return `${minutes}m`;
    } else {
      return `${seconds}s`;
    }
  }

  const handleModalToggle = (
    modalName: keyof typeof modalState,
    postID?: any,
    detailedPost?: any
  ) => {
    setModalState((prevState) => ({
      ...prevState,
      [modalName]: !prevState[modalName],
    }));
  };

  const handleThreedotsClick = (postId: any) => {
    if (authState._id == detailedPost?.userID?._id) {
      handleModalToggle("isPostDeleteOpen", postId);
    } else {
      handleModalToggle("isReportModalOpen", postId);
    }
  };

  const myBGStyleModal = {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    backdropFilter: "blur(8px)",
  };

  // toggle emoji
  const toggleEmoji = () => {
    setEmoji(!emoji);
  };

  // handle emoji
  const handleEmojiSelect = (selectedEmoji: any) => {
    // Append the selected emoji to the current comment value
    const updatedMessage = comments + selectedEmoji;

    // Set the updated comment value to the input field using setComments
    setComments(updatedMessage);
  };

  return (
    <>
      <div
        style={myBGStyleModal}
        className="fixed inset-0 flex items-center justify-center z-50"
      >
        <div className="modal-container justify-center w-11/12 sm:w-11/12 lg:w-8/12 h-[40rem] lg:h-[calc(100vh - 2rem)] z-50 bg-[#091619] rounded-lg">
          {/* Modal content */}
          <div className="relative rounded-lg bg-[#091619] py-5 sm:py-4 border border-[#586769]">
            <button
              type="button"
              className="text-white-400 absolute top-2.5 right-2.5 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex  hover:bg-gray-600 hover:text-white"
              data-modal-toggle="deleteAlertModal"
              onClick={handleCloseModal}
            >
              <Image
                className="w-7 h-7"
                src={SVG.Exit}
                alt="exit"
                width={10}
                height={10}
              />
              <span className="sr-only">Close modal</span>
            </button>

            <div className="flex flex-col sm:flex-row sm:justify-between lg:h-[33.9rem] md:h-[33.9rem] h-[35rem] justify-center border-2 border-[#1C2C2E] rounded-lg my-5 sm:my-8 mx-4 no-scrollbar">
              {/* Left Column - Story Block */}
              <div className="flex justify-center w-full sm:w-1/2 border-r-2 border-[#1C2C2E]">
                {/* Add your story block content here */}
                <div className="w-full md:w-[22rem] lg:w-full flex flex-col sm:justify-center justify-center items-center bg-[#091619] rounded-lg border-[#1C2C2E]">
                  <div className="mb-4">
                    <div className="flex justify-center items-center w-full">
                      <video
                        className="w-[710px] h-[185px] sm:h-[300px] my-2 sm:my-2"
                        src={detailedPost.video}
                        width={50}
                        height={50}
                        controls
                        controlsList="nodownload noremoteplayback noplaybackrate foobar"
                        disablePictureInPicture
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Form */}
              <div className="w-full md:w-full lg:w-6/12 lg:h-[33.9rem] md:h-[33.9rem] h-[23rem]">
                <div className="w-full md:w-full lg:w-full">
                  <div className="flex items-center my-0 sm:my-3 mx-3">
                    <Image
                      className="w-12 h-12 rounded-lg mr-2 sm:mr-4"
                      src={detailedPost?.userID?.profilePicture}
                      alt="Profile avatar"
                      width={50}
                      height={50}
                    />
                    <div className="flex items-center justify-between w-full">
                      <div>
                        <Link
                          href={`/account/${detailedPost?.userID?.username}`}
                          key={detailedPost._id}
                        >
                          <h3 className="sm:text-lg sm:font-bold md:text-xl text-white text-base font-semibold">
                            {detailedPost?.userID?.name}
                          </h3>
                        </Link>
                        <p className="sm:text-base text-sm font-light text-gray-400">
                          {detailedPost?.date &&
                            new Date(detailedPost.date).toLocaleString(
                              "en-US",
                              {
                                hour: "numeric",
                                minute: "numeric",
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                        </p>
                      </div>
                      <div>
                        <Image
                          className="cursor-pointer hover:opacity-80"
                          src={SVG.Threedots}
                          alt="Threedots"
                          width={5}
                          height={5}
                          onClick={() => handleThreedotsClick(detailedPost._id)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mx-4 my-2">
                    <p className="text-base font-light text-gray-200">
                      {detailedPost?.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mx-3">
                    <div className="flex flex-1 gap-4">
                      <div className="flex items-center gap-1">
                        <Image
                          className="cursor-pointer hover:opacity-80 p-2 w-10 h-10 rounded-xl bg-[#162423]"
                          src={SVG.Like}
                          alt="Like"
                          width={50}
                          height={50}
                        />
                        <p>{detailedPost?.reactions.length}</p>
                      </div>

                      <Image
                        className="cursor-pointer hover:opacity-80 w-10 h-10 rounded-xl bg-[#162423]"
                        src={SVG.Comment}
                        alt="Comment"
                        width={50}
                        height={50}
                      />

                      <Image
                        className="w-10 h-10 rounded-xl bg-[#162423]"
                        src={SVG.Trending1}
                        alt="Trending1"
                        width={50}
                        height={50}
                      />

                      <Image
                        className="p-2 w-10 h-10 rounded-xl bg-[#162423]"
                        src={SVG.Gcoin}
                        alt="Gcoin"
                        width={50}
                        height={50}
                      />
                    </div>
                  </div>
                </div>

                <div className="border border-[#586769] mt-3"></div>

                <div className="h-[9rem] sm:h-[20rem] mx-4 overflow-scroll overscroll-y-auto no-scrollbar">
                  {detailedPost?.comments.map((comment: any) => (
                    <div key={comment._id} className="flex flex-row gap-2 mt-3">
                      <Image
                        className="w-12 h-12 rounded-lg"
                        src={comment?.userID?.profilePicture}
                        alt="Profile avatar"
                        width={40}
                        height={40}
                      />
                      <div>
                        <div className="flex flex-row items-center mb-1">
                          <Link
                            href={`/account/${comment?.userID?.name}`}
                            key={comment?._id}
                          >
                            <p className="sm:text-lg sm:font-bold md:text-xl text-white text-base font-semibold">
                              {comment?.userID?.name}
                            </p>
                          </Link>
                          <p className="ml-2 font-light md:text-md text-gray-200">
                            {comment?.commentText}
                          </p>
                        </div>
                        <div className="flex items-center text-base font-light sm:text-sm text-gray-50 gap-2">
                          <p className="cursor-pointer sm:text-sm text-xs">
                            {formatRelativeDate(comment?.date)}
                          </p>
                          <p className="cursor-pointer sm:text-sm text-xs">
                            {comment?.like} like
                          </p>
                          <p className="cursor-pointer sm:text-sm text-xs">
                            Reply
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex w-5/12 absolute bg-[#091619] bottom-12 sm:bottom-14 mx-2">
                  <div
                    onClick={toggleEmoji}
                    className="absolute inset-y-0 left-0 flex items-center"
                  >
                    <Image
                      src={SVG.Emoji}
                      alt="Profile avatar"
                      width={40}
                      height={40}
                    />
                    {emoji && (
                      <div className="absolute bottom-10 right-0">
                        <Picker
                          data={data}
                          onEmojiSelect={(data: any) =>
                            handleEmojiSelect(data.native)
                          }
                          previewPosition="none"
                        />
                      </div>
                    )}
                  </div>
                  <input
                    type="Post"
                    id="default-search"
                    className="w-[16rem] lg:w-[28rem] block p-4 ml-10 text-sm bg-[#091619] outline-none sm:text-sm text-white overflow-hidden"
                    placeholder="Add a comment..."
                    onChange={handleChange}
                    value={comments}
                    required
                  />
                  <button
                    onClick={() => handleCreateComment(postID, comments)}
                    type="submit"
                    className="text-[#43DD4E] absolute -right-36 sm:-right-12 bottom-2 bg-primary-700 font-medium text-sm px-4 py-2 bg-primary-600"
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
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
    </>
  );
}

export default VideoDetails;
