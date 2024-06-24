"use client";
import { SVG } from "@/assets/SVG";
import { leagueGothic } from "@/font/font";
import { dispatch, useSelector } from "@/store";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toastError, toastSuccess } from "../Toast/Toast";
import { generateUniqueRoomId } from "@/utils/helpers";
import { useRouter } from "next/navigation";
import { initChat } from "@/store/slices/chatSlice";

interface SharePostProps {
  postID: String;
  handleCloseModal: () => void; // Define handleCloseModal as a function
}

interface User {
  userID: {
    _id: string;
    name: string;
    username: string;
    profilePicture: string;
    // Add other properties if necessary
  };
}

function SharePost({ postID, handleCloseModal }: SharePostProps) {
  const initialUsers = [
    { id: 1, name: "Mark Johnson", username: "john_smith", isSend: true },
    { id: 2, name: "Alice Smith", username: "alice", isSend: false },
    { id: 3, name: "Bob Williams", username: "bob", isSend: false },
    { id: 4, name: "Mark Johnson", username: "john_smith", isSend: false },
    { id: 5, name: "Alice Smith", username: "alice", isSend: false },
    { id: 6, name: "Bob Williams", username: "bob", isSend: false },
    { id: 7, name: "Mark Johnson", username: "john_smith", isSend: false },
    { id: 8, name: "Alice Smith", username: "alice", isSend: false },
    { id: 9, name: "Bob Williams", username: "bob", isSend: false },
    { id: 10, name: "Mark Johnson", username: "john_smith", isSend: false },
    { id: 11, name: "Alice Smith", username: "alice", isSend: false },
    { id: 12, name: "Bob Williams", username: "bob", isSend: false },
    // Add more users as needed
  ];

  const authState = useSelector((state: any) => state.auth.userData) || [];
  const profileInfoState = useSelector((state: any) => state.user) || [];

  const [users, setUsers] = useState(initialUsers);
  const router = useRouter();

  console.log("postID: ", postID);

  const handleUserButtonClick = (id: any) => {
    const updatedUsers = users?.map((user) =>
      user.id === id ? { ...user, isSend: !user.isSend } : user
    );
    setUsers(updatedUsers);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const element = document.getElementById("updateProductButton");
      if (element) {
        element.addEventListener("click", handleCloseModal);
        return () => {
          element.removeEventListener("click", handleCloseModal);
        };
      }
    }
  }, []);

  const myBGStyleModal = {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    backdropFilter: "blur(8px)",
  };

  const handleMessage = async (receiverID: String) => {
    console.log("receiverID: ", receiverID);
    const payload = {
      roomID: generateUniqueRoomId(),
      type: "sharepost",
      postID: postID,
      sender: authState._id,
      receiver: receiverID,
      content: "kingoo",
      isSocket: false,
    };

    const successCallback = (response: any) => {
      toastSuccess(response);
      setTimeout(() => {
        router.push("/chat");
      }, 4000);
    };

    const errorCallback = (error: string) => {
      toastError(error);
    };

    const params = {
      payload,
      successCallback,
      errorCallback,
    };

    dispatch(initChat(params));
  };

  return (
    <div
      style={myBGStyleModal}
      className="fixed inset-0 flex items-center justify-center z-50"
    >
      <div className="flex justify-center m-5">
        <button
          id="updateProductButton"
          className="block text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-[#091619] hover:bg-primary-700 focus:ring-primary-800"
          type="button"
          onClick={handleCloseModal}
        >
          Update product
        </button>
      </div>

      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="modal-container sm:w-96 mx-auto lg:w-4/12 z-50 overflow-y-auto">
          {" "}
          {/* Modal content */}
          <div className="relative text-center  rounded-lg bg-[#091619] py-3 px-3 sm:py-4 sm:px-8 border border-[#586769]">
            <button
              type="button"
              className="text-white-400 absolute top-2.5 right-2.5 bg-transparent  rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-600 hover:text-white"
              onClick={handleCloseModal}
            >
              <Image src={SVG.Exit} alt="exit" width={30} height={30} />
              <span className="sr-only">Close modal</span>
            </button>

            <h1
              className={`${leagueGothic.className} text-center text-3xl mb-5  text-white`}
            >
              SHARE POST
            </h1>

            <div className="bg-[#1C2C2E] flex gap-2 px-4 items-center w-full sm:w-full rounded-lg overflow-hidden mb-2">
              <Image src={SVG.Search} alt="search" width={30} height={30} />
              <input
                className="w-full block p-2.5 outline-none bg-[#1C2C2E] "
                placeholder="Search"
                disabled={authState.follower?.length === 0}
              />
            </div>

            <div className="flex flex-col w-full sm:min-h-[350px] lg:min-h-[500px] max-h-[400px] sm:max-h-[350px] lg:max-h-[500px] overflow-y-auto no-scrollbar">
              {authState.follower?.length === 0 && (
                <div className="flex items-center my-3 justify-center">
                  No Followers
                </div>
              )}
              {authState.follower?.map((user: User) => (
                <div key={user.userID._id}>
                  <div className="flex items-center gap-2 my-3">
                    <Image
                      className="object-contain rounded-xl"
                      src={user.userID.profilePicture}
                      alt="Profile"
                      width={50}
                      height={50}
                    />
                    <div className="flex items-center justify-between w-full sm:w-full">
                      <div className="flex flex-col items-start ">
                        <span className="text-sm sm:text-base ">
                          {user.userID.name}
                        </span>
                        <span className=" text-sm">{user.userID.username}</span>
                      </div>
                      <div>
                        <button
                          // onClick={() => handleUserButtonClick(user.id)}
                          // onClick={() => handleUserButtonClick(user.id)}
                          className={`${"w-[100px] h-[50] font-bold bg-[#162423] text-white text-center py-[5px] px-[10px] rounded-tl-[20px] rounded-br-[20px] rounded-tr-[5px] rounded-bl-[5px] "}`}
                          // className={`${
                          //   user.isSend
                          //     ? "w-[100px] h-[50] font-bold bg-[#37C535] text-white text-center py-[5px] px-[10px] rounded-tl-[20px] rounded-br-[20px] rounded-tr-[5px] rounded-bl-[5px] "
                          //     : "w-[100px] h-[50] font-bold bg-[#162423] text-white text-center py-[5px] px-[10px] rounded-tl-[20px] rounded-br-[20px] rounded-tr-[5px] rounded-bl-[5px] "
                          // } rounded-lg p-2`}
                          onClick={() => handleMessage(user.userID._id)}
                        >
                          {/* {user.isSend ? "Send" : "Undo"} */}
                          {"Send"}
                        </button>
                      </div>
                    </div>
                  </div>
                  <hr className="border-t border-[#162423]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SharePost;
