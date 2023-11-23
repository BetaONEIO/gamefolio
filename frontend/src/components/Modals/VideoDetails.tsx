"use client";
import { IMAGES } from "@/assets/images";
import { SVG } from "@/assets/SVG";
import Image from "next/image";
import { toastError, toastSuccess } from "../Toast/Toast";
import { createComment } from "@/store/slices/postSlice";
import { dispatch, useSelector } from "@/store";
import { useState } from "react";

interface VideoDetailProps {
  handleCloseModal: () => void;
  postID: any;
  postState: any;
}

function VideoDetails({
  handleCloseModal,
  postID,
  postState,
}: VideoDetailProps) {
  const authState = useSelector((state: any) => state.auth.userData) || [];
  const [comments, setComments] = useState("");

  console.log("POST statewww####: ", postState);

  const handleCreateComment = async (postID: any, comment: any) => {
    const payload = {
      userID: authState._id,
      postID: postID,
      commentText: comment,
    };

    console.log("Comment ", payload);

    const successCallback = (response: any) => {
      console.log("RESPONSE COMMENT: ", response);
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

  const myBGStyleModal = {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    backdropFilter: "blur(8px)",
  };
  return (
    <>
      <div
        style={myBGStyleModal}
        className="fixed inset-0 flex items-center justify-center z-50"
      >
        <div className="modal-container w-11/12 sm:w-11/12 lg:w-9/12 h-[40rem] lg:h-[calc(100vh - 2rem)] z-50 overflow-y-auto dark:bg-[#091619] rounded-lg no-scrollbar">
          {/* Modal content */}
          <div className="relative bg-white rounded-lg dark:bg-[#091619] py-5 sm:py-4 border dark:border-[#586769]">
            <button
              type="button"
              className="text-white-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex  dark:hover:bg-gray-600 dark:hover:text-white"
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

            {/* Map function inside the JSX */}
            {postState.videos.map((post: any) => {
              return (
                <div
                  key={post._id}
                  className="flex flex-col sm:flex-row sm:justify-between lg:h-[33.9rem] md:h-[33.9rem] h-[8rem] justify-center border-2 border-[#1C2C2E] rounded-lg my-8 mx-4 no-scrollbar"
                >
                  {/* Left Column - Story Block */}
                  <div className="w-full sm:w-1/2 sm:mr-2 sm:ml-6 border-r-2 border-[#1C2C2E] flex justify-center items-center">
                    {/* Add your story block content here */}
                    <div className="w-full md:w-[22rem] lg:w-full flex flex-col sm:justify-center justify-center items-center rounded-lg dark:bg-[#091619] bg-gray-100 rounded-lg dark:bg-[#091619] border-[#1C2C2E]">
                      <div className="mb-4">
                        <div className="flex justify-center items-center w-full">
                          <video
                            className="w-[710px] h-[185px] sm:h-[300px] my-2 sm:my-2"
                            src={post.video}
                            width={50}
                            height={50}
                            controls
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Form */}
                  <div className="w-full md:w-full lg:w-6/12 lg:h-[33.9rem] md:h-[33.9rem] h-[8rem]">
                    {/* Game Selection */}
                    <div className="w-full md:w-full lg:w-full">
                      <div className="flex items-center my-3">
                        <Image
                          className="w-12 h-12 mr-2 sm:mr-4"
                          src={post?.userID?.profilePicture}
                          alt="Profile avatar"
                          width={50}
                          height={50}
                        />
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 md:text-xl dark:text-white">
                            {post?.userID?.name}
                          </h3>
                          <p className="text-base font-light text-gray-600 dark:text-gray-400">
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
                      <div className="mb-3 mr-4">
                        <p className="text-base font-light text-gray-200 dark:text-gray-200">
                          {post?.description}
                        </p>
                      </div>

                      <div className="flex items-center w-full">
                        <div className="flex flex-1 gap-4">
                          <Image
                            className="cursor-pointer hover:opacity-80 p-2 w-10 h-10 rounded-xl bg-[#162423]"
                            src={SVG.Like}
                            alt="Like"
                            width={50}
                            height={50}
                          />

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

                        <div className="flex flex-end mr-2">
                          <Image
                            className="cursor-pointer hover:opacity-80"
                            src={SVG.Share}
                            alt="Share"
                            width={25}
                            height={25}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="border dark:border-[#586769] mt-3"></div>

                    <div className="h-72 mx-4 overflow-y-scroll no-scrollbar">
                      <div className="flex flex-row gap-2 mt-3">
                        <Image
                          className="w-12 h-12"
                          src={post?.userID?.profilePicture}
                          alt="Profile avatar"
                          width={40}
                          height={40}
                        />
                        <div>
                          <div className="flex flex-row mb-1">
                            <p className="text-lg font-bold md:text-lg dark:text-white">
                              {post?.userID?.name}
                            </p>
                            <p className="ml-2 font-light md:text-md dark:text-gray-200">
                              {post?.userID?.comments}
                            </p>
                          </div>
                          <div className="flex items-center text-base font-light sm:text-sm text-gray-50 dark:text-gray-50 gap-2">
                            <p>1d</p>
                            <p className="cursor-pointer">{post?.like} likes</p>
                            <p className="cursor-pointer">Reply</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex w-full mx-2">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center  pointer-events-none">
                          <Image
                            src={SVG.Emoji}
                            alt="Profile avatar"
                            width={40}
                            height={40}
                          />
                        </div>
                        <input
                          type="Post"
                          id="default-search"
                          className="w-[16rem] lg:w-[28rem] block p-4 ml-10 text-sm bg-[#091619] outline-none sm:text-sm dark:text-white"
                          placeholder="Add a comment..."
                          onChange={handleChange}
                          value={comments}
                          required
                        />
                        <button
                          onClick={() => handleCreateComment(postID, comments)}
                          type="submit"
                          className="text-[#43DD4E] absolute right-0 bottom-0 top-0 bg-primary-700 font-medium text-sm px-4 py-2 dark:bg-primary-600 "
                        >
                          Post
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default VideoDetails;
