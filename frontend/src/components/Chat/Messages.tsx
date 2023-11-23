import { IMAGES } from "@/assets/images";

interface MessageCardProps {
  message: any; // Use 'any' type for messags
}

const MessageCard: React.FC<MessageCardProps> = ({ message }) => {
  return (
    <a href={message._id}>
      <div className="flex gap-2 border-b border-gray-800 p-4  hover:bg-[#1C2C2E]">
        <div>
          <img
            alt="person"
            src={message.profileImage}
            width={48}
            height={48}
            className="rounded-2xl"
          />
        </div>
        <div className="flex flex-1 flex-col justify-center">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold">{message.name}</span>
            <span className="text-xs text-gray-500">{message.time}</span>
          </div>
          <div>
            <span className="text-xs font-normal text-white">
              {message.lastMessage}
            </span>
          </div>
        </div>
        <div className="1">
          <span className="text-xs font-semibold text-gray-500"></span>
        </div>
      </div>
    </a>
  );
};

function Messages() {
  const messagesInfo = [
    {
      id: 1,
      name: "Mark Johnson",
      lastMessage: "Lorem ipsum dolor sit amet,",
      time: "1 min ago",
      profileImage: IMAGES.Profile,
    },
    {
      id: 2,
      name: "John Smith",
      lastMessage: "How are you",
      time: "Just Now",
      profileImage: IMAGES.Profile,
    },
    {
      id: 3,
      name: "Robin Wood",
      lastMessage: "Are you like my post 👍",
      time: "1 min ago",
      profileImage: IMAGES.Profile,
    },
    {
      id: 4,
      name: "Julia Smith",
      lastMessage: "Ok 👍",
      time: "5 min ago",
      profileImage: IMAGES.Profile,
    },
  ];

  return (
    <div className=" flex w-full flex-col gap-4 bg-[#091619] border-r border-gray-800  md:w-4/5 lg:w-2/5">
      <div className="hideScrollBar flex flex-col  gap-4  overflow-y-auto">
        {messagesInfo.map((message) => (
          <MessageCard key={message.id} message={message} />
        ))}
      </div>
    </div>
  );
}

export default Messages;
