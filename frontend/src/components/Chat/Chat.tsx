"use client";
import { SVG } from "@/assets/SVG";
import { IMAGES } from "@/assets/images";
import { leagueGothic } from "@/font/font";
import { socket } from "@/services/api";
import { dispatch, useSelector } from "@/store";
import { setSelectedChat } from "@/store/slices/chatSlice";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Toaster } from "react-hot-toast";
import AttachmentView from "../Modals/AttachmentView";
import Gallery from "../Modals/Gallery";
import Modal from "../Modals/Modal";
import { toastError } from "../Toast/Toast";
import GalleryVideoMessage from "./Messages/GalleryVideoMessage";
import SharePostMessage from "./Messages/SharePostMessage";

function Chat() {
  const authState = useSelector((state: any) => state.auth.userData) || [];
  const messageState = useSelector((state: any) => state.chat) || [];
  const [galleryVideo, setGalleryVideo] = useState<string>("");
  const [emoji, setEmoji] = useState(false);
  const [modalState, setModalState] = useState({
    isAttachmentViewOpen: false,
    isGalleryOpen: false,
  });
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      message: "",
    },
  });

  useEffect(() => {
    socket.emit("joinRoom", messageState.chat.roomID);

    // Listening to the incoming message from recipient
    socket.on("newMessage", (data) => {
      console.log("Data receiving from server ..: ", data);
      // Dispatching chat data to our chatSlice to maintain state
      dispatch(setSelectedChat(data));
    });

    return () => {
      socket.off("disconnect");
    };
  }, [messageState.chat]);

  console.log("MESSAGE STATE: chat.tsx", messageState.chat);

  const handleSendMessage = (data: any) => {
    socket.emit("sendMessage", {
      roomID: messageState?.chat?.roomID,
      sender: authState._id,
      receiver: NotCurrentUser(),
      content: data.message,
    });
    toggleEmoji(false);

    setValue("message", "");
  };

  if (Object.keys(messageState?.chat)?.length === 0) {
    return (
      <div className="hideScrollBar hidden relative z-20  flex-col bg-[#091619] gap-4  border-r  md:hidden lg:flex  h-full w-full items-center justify-center">
        <p className="text-white">No chat to show</p>
      </div>
    );
  }

  const isCurrentUser =
    messageState?.chat?.participants?.[0]?._id === authState?._id;
  console.log("IS CURRENT USER: ", { isCurrentUser, messageState });

  const NotCurrentUser = () => {
    return messageState?.chat?.participants?.[0]?._id !== authState?._id
      ? messageState?.chat?.participants?.[0]?._id
      : messageState?.chat?.participants?.[1]?._id;
  };
  const formatTime = (timestamp: any) => {
    const date = new Date(timestamp);
    const formattedTime = date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    return formattedTime;
  };

  // toggle emoji
  const toggleEmoji = (closed?: boolean) => {
    setEmoji(closed === undefined ? !emoji : false);
  };

  const handleModalToggle = (
    modalName: keyof typeof modalState,
    videoData?: string,
    error?: string
  ) => {
    if (error) {
      toastError(error);
    }
    setGalleryVideo(videoData ?? "");
    setModalState((prevState) => ({
      ...prevState,
      [modalName]: !prevState[modalName],
    }));
  };

  // handle emoji
  const handleEmojiSelect = (selectedEmoji: any) => {
    // Get the current value of the message input field
    const currentMessage = watch("message");

    // Append the selected emoji to the current message value
    const updatedMessage = currentMessage + selectedEmoji;

    // Set the updated message value to the input field using setValue
    setValue("message", updatedMessage);
  };

  const handleEnterKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      handleSubmit(handleSendMessage)();
    }
  };

  const handleBackBtn = () => {
    dispatch(setSelectedChat({}));
  };

  return (
    <>
      <div className="hideScrollBar  relative z-20  w-full flex-col bg-[#091619] gap-4  border-r   lg:block ">
        <div className="sticky top-0 z-40  flex justify-between items-center  gap-2 border-b border-gray-800 bg-[#091619] p-5">
          <div className="flex items-center gap-2">
            <Image
              className="block md:hidden"
              src={SVG.Back}
              alt="Back"
              width={25}
              height={25}
              onClick={handleBackBtn}
            />
            <img
              className="h-10 w-10 rounded-xl"
              alt="person"
              src={
                isCurrentUser
                  ? messageState?.chat?.participants?.[1]?.profilePicture ||
                    IMAGES.Profile
                  : messageState?.chat?.participants?.[0]?.profilePicture ||
                    IMAGES.Profile
              }
              width={38}
              height={38}
            />

            <div>
              <span className={`${leagueGothic.className} text-3xl text-white`}>
                {isCurrentUser
                  ? messageState?.chat?.participants?.[1]?.name.toUpperCase()
                  : messageState?.chat?.participants?.[0]?.name.toUpperCase()}
              </span>
            </div>
          </div>

          <div>
            <img
              className="h-5 w-5 rounded-xl"
              alt="three-dot"
              src={SVG.Threedots}
              width={4}
              height={4}
            />
          </div>
        </div>

        {/* Message container  */}
        <div className="relative h-4/5 max-h-4/5 ">
          <Toaster />
          {/* Messages */}
          <div
            id="chatContainer"
            className="flex hideScrollBar  flex-col gap-4 p-2 h-full mb-80 overflow-scroll"
          >
            {messageState?.chat?.messages?.map(
              (element: any, index: number) => {
                // console.log("ELEMENT: ", element);
                return (
                  <React.Fragment key={index}>
                    {element?.sender?._id === authState._id ? (
                      // Sender Message
                      index === 0 ? (
                        <div className="flex items-center justify-end gap-2">
                          <div className="flex flex-col items-end gap-2">
                            <div className="bg-[#62C860]  rounded-full  px-4 py-2 text-white">
                              <span className="text-md">
                                {element?.content}
                              </span>
                            </div>
                            {element.type === "sharepost" && (
                              <SharePostMessage postData={element.postID} />
                            )}

                            <span className="text-xs text-gray-100">
                              {formatTime(element?.timestamp)}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-end gap-2">
                          <div className="flex flex-col items-end gap-2">
                            {element?.content?.trim("").length >= 0 && (
                              <div className="bg-[#62C860]  rounded-full  px-4 py-2 text-white">
                                <span className="text-md">
                                  {element?.content}
                                </span>
                              </div>
                            )}
                            {element.type === "sharepost" && (
                              <SharePostMessage postData={element.postID} />
                            )}
                            {element.type === "galleryvideo" && (
                              <GalleryVideoMessage videoData={element.video} />
                            )}
                            <span className="text-xs text-gray-100">
                              {formatTime(element?.timestamp)}
                            </span>
                          </div>
                        </div>
                      )
                    ) : (
                      // Receiver Message

                      <div className="flex items-center justify-start">
                        <div className="ml-2 flex flex-col items-start gap-2  ">
                          {element?.content?.trim("").length >= 0 && (
                            <div className="bg-black border border-gray-900  p-2 rounded-full  px-4 py-2 text-white">
                              <span className="text-md">{element.content}</span>
                            </div>
                          )}

                          {element.type === "sharepost" && (
                            <SharePostMessage postData={element.postID} />
                          )}
                          {element.type === "galleryvideo" && (
                            <GalleryVideoMessage videoData={element.video} />
                          )}
                          <span className="text-xs text-white">
                            {" "}
                            {formatTime(element?.timestamp)}
                          </span>
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                );
              }
            )}
          </div>
        </div>

        {/* Bottom Input container */}
        <div className="sticky bottom-0 z-40  flex justify-between items-center  gap-2 border-b border-gray-800 bg-[#162423] px-4 ">
          {/* Modals */}
          <Modal
            isOpen={modalState.isAttachmentViewOpen}
            handleClose={() => handleModalToggle("isAttachmentViewOpen")}
          >
            <AttachmentView
              handleCloseModal={() => handleModalToggle("isAttachmentViewOpen")}
              handleGalleryModal={(videoData: string) =>
                handleModalToggle("isGalleryOpen", videoData)
              }
            />
          </Modal>
          <div
            className="cursor-pointer"
            onClick={() => handleModalToggle("isAttachmentViewOpen")}
          >
            <Image
              className="hover:opacity-70"
              alt="Chat File"
              width={24}
              height={24}
              src={SVG.ChatFile}
            />
          </div>
          <div className="flex-grow  mx-3 my-2 relative flex items-center rounded-lg bg-[#162423] p-2 px-6 ">
            <input
              type="text"
              className="flex-grow px-1 py-1 bg-[#162423] focus:outline-none"
              placeholder="Write message"
              onKeyDown={handleEnterKeyPress}
              {...register("message")}
            />

            <div className="flex gap-1">
              <button onClick={() => toggleEmoji()}>😀</button>
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

              <Image
                className="hover:opacity-70"
                alt="Message sent"
                width={24}
                height={24}
                src={SVG.ChatMessageSent}
                onClick={handleSubmit(handleSendMessage)}
              />
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalState.isGalleryOpen}
        handleClose={() => handleModalToggle("isGalleryOpen")}
      >
        <Gallery
          receiverID={NotCurrentUser()}
          galleryVideo={galleryVideo}
          handleCloseModal={() => handleModalToggle("isGalleryOpen")}
        />
      </Modal>
    </>
  );
}

export default Chat;
