"use client";
import Loading from "@/app/chat/loading";
import { IMAGES } from "@/assets/images";
import { dispatch, useSelector } from "@/store";
import { getUserMessages, setSelectedChat } from "@/store/slices/chatSlice";
import { useEffect } from "react";

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
              ? message?.participants[1]?.lastMessage || "No messages yet"
              : message?.participants[0]?.lastMessage || "No messages yet"}
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
  console.log("messageState: messages.tsx ", messageState.messages);

  const payload = {
    userID: authState._id,
  };
  const params = {
    payload,
  };
  useEffect(() => {
    dispatch(getUserMessages(params));
  }, [authState._id]);

  // const messagesInfo = [
  //   {
  //     id: 1,
  //     name: "Mark Johnson",
  //     lastMessage: "Lorem ipsum dolor sit amet,",
  //     time: "1 min ago",
  //     profileImage: IMAGES.Profile,
  //   },
  //   {
  //     id: 2,
  //     name: "John Smith",
  //     lastMessage: "How are you",
  //     time: "Just Now",
  //     profileImage: IMAGES.Profile,
  //   },
  //   {
  //     id: 3,
  //     name: "John Smith",
  //     profileImage: IMAGES.Profile,
  //   },
  // ];
  // if (messageState?.loading) return <div>Loading...</div>;
  console.log("length: ", messageState?.messages);
  if (messageState?.loading)
    return (
      <div className=" flex w-full flex-col gap-4 bg-[#091619] border-r border-gray-800  md:w-4/5 lg:w-2/5">
        <div className="hideScrollBar flex flex-col  gap-4  overflow-y-auto">
          <Loading />
        </div>
      </div>
    );
  return (
    <div className=" flex w-full flex-col gap-4 bg-[#091619] border-r border-gray-800  md:w-4/5 lg:w-2/5">
      <div className="hideScrollBar flex flex-col  gap-4  overflow-y-auto">
        {messageState?.messages.length > 0 ? (
          messageState?.messages?.map((message: any) => (
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
