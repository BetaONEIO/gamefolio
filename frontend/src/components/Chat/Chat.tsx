"use client";
import { SVG } from "@/assets/SVG";
import { IMAGES } from "@/assets/images";
import { leagueGothic } from "@/font/font";
import Image from "next/image";
import React from "react";

import toast, { Toaster } from "react-hot-toast";

const ChatMessages = [
  {
    _id: "649c1ce0ce2157108f0fd53a",
    participants: ["649c1ca1ce2157108f0fd533"],
    ticket: "649c1ca1ce2157108f0fd533",
    messages: [
      {
        _id: "649da8db7f9f3917422f17c3",
        sender: "649c1ca1ce2157108f0fd533",
        content: {
          message: "Okay",
          files: "test.jpg",
          __v: 0,
        },

        timestamp: "2023-06-28T11:43:28.882+00:00",
      },
      {
        _id: "649da8db7f9f3917422f17c3",
        sender: "649c1ca1ce2157108f0fd534",
        content: {
          message: "Nice 👍👍",
          files: "test.jpg",
          __v: 0,
        },

        timestamp: "2023-06-28T11:43:28.882+00:00",
      },
      {
        _id: "649da8db7f9f3917422f17c3",
        sender: "649c1ca1ce2157108f0fd533",
        content: {
          message: "Thank you",
          files: "test.jpg",
          __v: 0,
        },

        timestamp: "2023-06-28T11:43:28.882+00:00",
      },
    ],
  },
];

function Chat() {
  return (
    <>
      <div className="hideScrollBar hidden  w-full flex-col bg-[#091619] gap-4 overflow-auto border-r  md:hidden lg:block">
        <div className="sticky top-0  flex items-center justify-between gap-2 border-b border-gray-800 bg-[#091619] p-5">
          <div>
            <div>
              <span className={`${leagueGothic.className} text-3xl`}>
                MARK JOHNSON
              </span>
            </div>
          </div>
          <div>
            <img
              className="rounded-xl"
              alt="person"
              src={IMAGES.Profile}
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
            {ChatMessages[0].messages?.map((element, index) => {
              console.log("ELEMENT: ", element);
              return (
                <React.Fragment key={index}>
                  {element.sender === "649c1ca1ce2157108f0fd533" ? (
                    // Sender Message
                    index === 0 ? (
                      <div className="flex items-center justify-end gap-2">
                        <div className="flex flex-col items-end gap-2">
                          <div className="bg-[#62C860]  rounded-full  px-4 py-2 text-white">
                            <span className="text-md">
                              {element.content.message}
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
                              {element.content.message}
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
                          <span className="text-md">
                            {element.content.message}
                          </span>
                        </div>
                        <span className="text-xs text-white">12:22 AM</span>
                      </div>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Bottom Input container */}
          <div className="flex items-center justify-around absolute bottom-0 bg-[#162423] px-4 ">
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
              />

              <span>😀</span>

              <Image
                className="hover:opacity-70"
                alt="Message sent"
                width={24}
                height={24}
                src={SVG.ChatMessageSent}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chat;
