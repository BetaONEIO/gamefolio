interface MessageCardProps {
  message: any; // Use 'any' type for message
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
      profileImage:
        "https://s3-alpha-sig.figma.com/img/1ada/6763/c9a55b7abc19cd1dc9a9e27deaae7039?Expires=1698624000&Signature=cotVmpQWFAjD4YLJfz1vesY4wldPb3G9wCXaWiBQFF98MFIWWVcFapaLPXVTNq4IJ0OUIJ0icNzDemgwdmf6~nS4XHcEdesAtCwlBvYghm0ZiyCKsyaPwTR8mCuZ3pD6rLXOGGAfFsNdkHyC1FO7Dbc3N2HvyXifGZcpkfFEX4UNBdTRnu134fLpYh9z4pHiaREXz0wNnRun5785iiFL-5jM66PDtKxx0sss77jOA64V86gG1GZjICy9Lsf6Ny06t5-RTpLQcCwU4hK-axXOD-7gK4E0IfoWwuPFVg8JKZktMYHJ0IBjB2m5j22eALW4FOD4HjdkPNmNHghT~J6pBw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    },
    {
      id: 2,
      name: "John Smith",
      lastMessage: "How are you",
      time: "Just Now",
      profileImage:
        "https://s3-alpha-sig.figma.com/img/6528/9ad5/a61c4e6fc5fc98b9927f9393d461df57?Expires=1698624000&Signature=Sin1bmeQVCvmZEFoXHTBLZSzZTDEMeDtIgkVDbNHQk0~8FZOx618n6UO-3~266LlPHiIpnk~WbtuQQ2NLd-DPvnXyxS-78V16AHzVudorqZDQGsZZco8iO8SsXoxkJ1hN5A6jJeuN7hBE4HF8brAJ~diCWxPhcWq2EVz6EFAYHMSnRCEiiaUbC~kH5Vj8zXZBpghIBcaZ6eZBnWd-p~~VANJvqypuKr4KauUEpTIMdM2RexpYtWm4d9-zcji0nS~XhU4wF1pk68Nc7svhVOR3-aLL8iV9phe8Uh61WZbsSHStk-0OdLQJfeWe8O54ngGWSo9RJt6w97tglJXzBovFA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    },
    {
      id: 3,
      name: "Robin Wood",
      lastMessage: "Are you like my post 👍",
      time: "1 min ago",
      profileImage:
        "https://s3-alpha-sig.figma.com/img/5bfb/c2ec/51883861e56ccc91661ba0bcca52f055?Expires=1698624000&Signature=Te7PtxiNv~VBHZyrJrX9f7IdU7Lec6ASGoEa78vRCdi8YzPw6a-JqOqPRycUSqWWbI1sQMz5DNbiTHsA4khxpxDx-bmDg0PqW0HMRrjtTWgi2F~v~4O-JGag4JxicC4aRyjlu8uRYhE9sdjqXi3U3ssc1iWvtdl-RRqevjlzvYLGLz3hJxvw25T8ZTqoBm4ThyzaqswQkgd4MHfo1lmQnIwGmC05KgJdPwR3r7CTjNPrvikF7bf692rA10yb06lEr~NvEVNw7fb5LS4alo0tVSCS7IqiyiGcqdaZU3OIR-yGcS7eHmmzYO2Do2uoFmDP60u~RY3dvcHafNydTIlkww__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    },
    {
      id: 4,
      name: "Julia Smith",
      lastMessage: "Ok 👍",
      time: "5 min ago",
      profileImage:
        "https://s3-alpha-sig.figma.com/img/973c/253c/ba5a4d359fd80fbc36b3904b6b4cd843?Expires=1698624000&Signature=W80usTVQiRAxH8KWHugisz1gcqPeQezE5~hIVJAs6ZeqyiXWgnD0l4zOfdYdXOg2Sl4LbtqBwi3IXsQYLWziFGez5wE7Ue4~WGnHoQX~VdtdmpXQG8qV3Dx-Cki8cJPUq0QTzm7wFAKG0XEU7NDjIuYXDRblnHxguTOBC9EcFYCNnVR427hmgY-IR3DhdxygJ76NTnMQLH-gilDveMmTp3Bd6NzWEprvMDcVzE1zgX8VJxR4AV~bFdphpMD5IqarRqjGkq-r85IC67v6Tg89HVdSCrbCEzRrqAkrDU7aFSNragPN1~N7EdOtosHjGtz~Cz2rT6dOxotx2SQQ69HVlA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
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
