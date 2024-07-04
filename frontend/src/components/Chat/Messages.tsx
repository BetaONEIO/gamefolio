"use client";
import Loading from "@/app/chat/loading";
import { SVG } from "@/assets/SVG";
import { IMAGES } from "@/assets/images";
import { useClientMediaQuery } from "@/hooks/useClientMediaQuery";
import { dispatch, useSelector } from "@/store";
import { getUserMessages, setSelectedChat } from "@/store/slices/chatSlice";
import { useEffect, useState } from "react";

interface MessageCardProps {
  currentUser: any; // Use 'any' type for messags
  message: any; // Use 'any' type for messages
}

const MessageCard: React.FC<MessageCardProps> = ({ currentUser, message }) => {
  console.log("message: msgcard: ", message);
  const isCurrentUser = message?.participants[0]?._id === currentUser._id;
  return (
    <div
      className="flex gap-2 border-b border-gray-800 p-4 cursor-pointer  hover:bg-[#1C2C2E]"
      onClick={() => dispatch(setSelectedChat(message))}
    >
      <div>
        <img
          alt="person"
          src={
            isCurrentUser
              ? message?.participants[1]?.profilePicture || IMAGES.Profile
              : message?.participants[0]?.profilePicture || IMAGES.Profile
          }
          width={48}
          height={48}
          className="rounded-2xl"
        />
      </div>
      <div className="flex flex-1 flex-col justify-center">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-white">
            {isCurrentUser
              ? message?.participants[1]?.name
              : message?.participants[0]?.name}
          </span>
          <span className="text-xs text-gray-500">
            {message?.participants[0]?.time}
          </span>
        </div>
        <div>
          <span className="text-xs font-normal text-white">
            {isCurrentUser
              ? message?.messages[message?.messages?.length - 1]?.content ||
                "No messages yet"
              : message?.messages[message?.messages?.length - 1]?.content ||
                "No messages yet"}
          </span>
        </div>
      </div>
      <div className="1">
        <span className="text-xs font-semibold text-gray-500"></span>
      </div>
    </div>
  );
};

function Messages() {
  const authState = useSelector((state: any) => state.auth.userData) || [];
  const messageState = useSelector((state: any) => state.chat) || [];
  const [searchText, setSearchText] = useState("");
  const [filteredChat, setFilteredChat] = useState(messageState?.messages);
  console.log(
    "messageState: messages.tsx ",
    messageState.messages,
    filteredChat
  );

  const payload = {
    userID: authState._id,
  };
  const params = {
    payload,
  };
  useEffect(() => {
    dispatch(getUserMessages(params));
  }, [authState._id, messageState.chat]);

  console.log("length: ", messageState?.messages);
  const isMobile = useClientMediaQuery("(max-width: 600px)");

  if (messageState.messages?.length > 0 && filteredChat?.length === 0) {
    console.log("msgChaat");
    setFilteredChat(messageState?.messages);
  }

  // Debounce function for delaying search
  const debounce = (func: any, delay: any) => {
    let timeoutId: any;
    return function (...args: any) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  console.log("filteredChat: ", filteredChat);

  const delayedSearch = debounce((inputValue: any) => {
    const filtered = messageState?.messages?.filter((message: any) => {
      const isCurrentUser = message?.participants[0]?._id === authState._id;
      console.log(
        "Xx: ",
        message?.messages[message?.messages?.length - 1]?.content
          .toLowerCase()
          .includes(inputValue)
      );
      if (isCurrentUser) {
        return message?.messages[message?.messages?.length - 1]?.content
          .toLowerCase()
          .includes(inputValue);
      }
    });
    setFilteredChat(filtered);
  }, 1000);

  const handleSearch = (e: any) => {
    const inputValue = e.target.value.toLowerCase();
    setSearchText(inputValue);
    delayedSearch(inputValue);
  };
  console.trace({ isMobile });
  console.trace(messageState.chat);

  if (messageState?.loading)
    return (
      <div className=" flex w-full flex-col gap-4 bg-[#091619] border-r border-gray-800  md:w-4/5 lg:w-2/5">
        <div className="hideScrollBar flex flex-col  gap-4  overflow-y-auto">
          <Loading />
        </div>
      </div>
    );

  return (
    <div
      className={
        isMobile && Object.keys(messageState.chat).length >= 0
          ? ` hidden`
          : `flex w-full flex-col gap-4 bg-[#091619] border-r border-gray-800  md:w-4/5 lg:w-2/5`
      }
    >
      <div className="hideScrollBar flex flex-col    overflow-y-auto">
        <div className="flex items-center gap-2 border-b border-gray-800 p-4 cursor-pointer hover:bg-[#1C2C2E]">
          <div>
            <img
              alt="person"
              src={SVG.Search}
              width={30}
              height={30}
              className="rounded-2xl"
            />
          </div>
          <div className="flex flex-1 flex-col justify-center">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-white"></span>
              <span className="text-xs text-gray-500"></span>
            </div>
            <div>
              <input
                className="bg-transparent sm:text-sm outline-none rounded-lg block w-full p-2.5 text-[#586769]"
                placeholder=" Search chat here..."
                value={searchText}
                onChange={handleSearch}
              />
            </div>
          </div>
          <div className="1">
            <span className="text-xs font-semibold text-gray-500"></span>
          </div>
        </div>
        {/* {messageState?.messages?.length > 0 ? (
          messageState?.messages?.map((message: any) => ( */}
        {filteredChat?.length > 0 ? (
          filteredChat?.map((message: any) => (
            <MessageCard
              currentUser={authState}
              key={message._id}
              message={message}
            />
          ))
        ) : (
          <div className="flex gap-2   p-4 cursor-pointer  hover:bg-[#1C2C2E]">
            No chats
          </div>
        )}
      </div>
    </div>
  );
}

export default Messages;
