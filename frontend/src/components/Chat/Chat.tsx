"use client";
import { SVG } from "@/assets/SVG";
import { IMAGES } from "@/assets/images";
import { leagueGothic } from "@/font/font";
import { socket } from "@/services/api";
import { dispatch, useSelector } from "@/store";
import { setSelectedChat, updateSelectedChat } from "@/store/slices/chatSlice";
import { generateUniqueRoomId } from "@/utils/helpers";
import Image from "next/image";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import toast, { Toaster } from "react-hot-toast";

function Chat() {
  const authState = useSelector((state: any) => state.auth.userData) || [];
  const messageState = useSelector((state: any) => state.chat) || [];
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

  // let getUniqueRoomID = generateUniqueRoomId();

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
  }, [socket, messageState.chat]);

  console.log("WATCH: ", watch("message"));

  console.log("MESSAGE STATE: chat.tsx", messageState.chat);

  const handleSendMessage = (data: any) => {
    console.log("DATA: ", data);
    socket.emit("sendMessage", {
      roomID: messageState?.chat?.roomID,
      sender: authState._id,
      receiver: "6576c231c4a2e7e679b6a359",
      content: data.message,
    });
  };

  if (Object.keys(messageState?.chat).length === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p>No chat to show</p>
      </div>
    );
  }

  const isCurrentUser =
    messageState?.chat?.participants?.[0]?._id === authState?._id;

  console.log("IS CURRENT USER: ", { isCurrentUser, messageState });

  return (
    <>
      {/* {messageState?.chat?.map((chat: any) => ( */}
      <div className="hideScrollBar hidden  w-full flex-col bg-[#091619] gap-4 overflow-auto border-r  md:hidden lg:block">
        <div className="sticky top-0  flex items-center justify-between gap-2 border-b border-gray-800 bg-[#091619] p-5">
          <div>
            <div>
              <span className={`${leagueGothic.className} text-3xl`}>
                {isCurrentUser
                  ? messageState?.chat?.participants?.[1]?.name
                  : messageState?.chat?.participants?.[0]?.name}
              </span>
            </div>
          </div>
          <div>
            <img
              className="rounded-xl"
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
          </div>
        </div>

        {/* Message container  */}
        <div>
          <Toaster />
          {/* Messages */}
          <div className="flex h-screen flex-col gap-4 p-2 overflow-y-auto">
            {messageState?.chat?.messages?.map(
              (element: any, index: number) => {
                console.log("ELEMENT: ", element);
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
                            <span className="text-xs text-gray-100">
                              12:20 AM
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-end gap-2">
                          <div className="flex flex-col items-end gap-2">
                            <div className="bg-[#62C860]  rounded-full  px-4 py-2 text-white">
                              <span className="text-md">
                                {element?.content}
                              </span>
                            </div>
                            <span className="text-xs text-gray-100">
                              12:20 AM
                            </span>
                          </div>
                        </div>
                      )
                    ) : (
                      // Receiver Message

                      <div className="flex items-center justify-start">
                        <div className="ml-2 flex flex-col items-start gap-2  ">
                          <div className="bg-black border border-gray-900  p-2 rounded-full  px-4 py-2 text-white">
                            <span className="text-md">{element.content}</span>
                          </div>
                          <span className="text-xs text-white">12:22 AM</span>
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                );
              }
            )}
          </div>

          {/* Bottom Input container */}
          <div className="flex items-center  justify-around  absolute bottom-0 bg-[#162423] px-4 ">
            <label htmlFor="file_input">
              <Image
                className="hover:opacity-70"
                alt="Chat File"
                width={24}
                height={24}
                src={SVG.ChatFile}
              />
              <input type="file" id="file_input" className="hidden" />
            </label>
            <div className="flex-grow mx-3 my-2  flex items-center rounded-lg bg-[#162423] p-2">
              <input
                type="text"
                className="flex-grow px-1 py-1 bg-[#162423] focus:outline-none"
                placeholder="Write message"
                {...register("message")}
              />

              <span>😀</span>

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
      {/* ))} */}
    </>
  );
}

export default Chat;
