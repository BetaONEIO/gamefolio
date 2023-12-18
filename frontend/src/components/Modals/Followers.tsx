"use client";
import { useState } from "react";
import { dispatch, useSelector } from "@/store";
import { SVG } from "@/assets/SVG";
import { IMAGES } from "@/assets/images";
import { leagueGothic } from "@/font/font";
import Image from "next/image";
import { toastError, toastSuccess } from "../Toast/Toast";
import { followUser, removeFollow } from "@/store/slices/userSlice";

interface FollowerProps {
  handleCloseModal: () => void;
  followerData: any;
}

function Followers({ handleCloseModal, followerData }: FollowerProps) {
  const authState = useSelector((state: any) => state.auth.userData) || [];
  const initialUsers = [
    { id: 1, name: "Mark Johnson", username: "john_smith", isFollowed: false },
    { id: 2, name: "Alice Smith", username: "alice", isFollowed: false },
    { id: 3, name: "Bob Williams", username: "bob", isFollowed: false },
    { id: 4, name: "Mark Johnson", username: "john_smith", isFollowed: false },
    { id: 5, name: "Alice Smith", username: "alice", isFollowed: false },
    { id: 6, name: "Bob Williams", username: "bob", isFollowed: false },
    { id: 7, name: "Mark Johnson", username: "john_smith", isFollowed: false },
    { id: 8, name: "Alice Smith", username: "alice", isFollowed: false },
    { id: 9, name: "Bob Williams", username: "bob", isFollowed: false },
    // Add more users as needed
  ];

  console.log("authstate", authState);
  console.log("followerData", followerData);

  const [users, setUsers] = useState(initialUsers);

  const handleUserButtonClick = (id: any) => {
    const updatedUsers = users.map((user) =>
      user.id === id ? { ...user, isFollowed: !user.isFollowed } : user
    );
    setUsers(updatedUsers);
  };

  const myBGStyleModal = {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    backdropFilter: "blur(8px)",
  };

  const handleRemoveFollow = async (followerID: any) => {
    const payload = {
      userId: authState._id,
      followerID: followerID,
    };

    console.log("authState._id:", authState._id);
    console.log("followerID:", followerID);

    const successCallback = (response: any) => {
      toastSuccess(response.message);
    };

    const errorCallback = (error: string) => {
      toastError(error);
    };

    const params = {
      payload,
      successCallback,
      errorCallback,
    };

    dispatch(removeFollow(params));
  };

  return (
    <>
      <div
        style={myBGStyleModal}
        className="fixed inset-0 flex items-center justify-center z-50"
      >
        <div className="modal-container sm:w-96 mx-auto lg:w-2/5 z-50 overflow-y-auto">
          {/* Modal content */}
          <div className="relative text-center  rounded-lg bg-[#091619] py-3 px-3 sm:py-4 sm:px-8 border border-[#586769]">
            <button
              type="button"
              className="text-white-400 absolute top-2.5 right-2.5 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-600 hover:text-white"
              onClick={handleCloseModal}
            >
              <Image src={SVG.Exit} alt="exit" width={30} height={30} />
              <span className="sr-only">Close modal</span>
            </button>

            <h1
              className={`${leagueGothic.className} text-center text-3xl mb-5  text-white`}
            >
              FOLLOWERS
            </h1>

            <div className="bg-[#1C2C2E] flex gap-2 px-4 items-center w-full sm:w-full rounded-lg overflow-hidden mb-2">
              <Image src={SVG.Search} alt="search" width={30} height={30} />
              <input
                className="w-full block p-2.5 outline-none bg-[#1C2C2E] "
                placeholder="Search"
              />
            </div>

            <div className="flex flex-col w-full sm:min-h-[350px] lg:min-h-[500px] max-h-[400px] sm:max-h-[350px] lg:max-h-[500px] overflow-y-auto no-scrollbar">
              {followerData?.map((user: any) => (
                <div key={user?.id}>
                  <div className="flex items-center my-3">
                    <Image
                      className="object-contain w-12 h-12 rounded-lg"
                      src={user?.userID?.profilePicture || IMAGES.Profile}
                      alt="Profile"
                      width={50}
                      height={50}
                    />
                    <div className="flex items-center justify-between w-full sm:w-full">
                      <div>
                        <span className="ml-2 sm:ml-4 text-sm sm:text-base">
                          {user?.userID?.name || 0}
                        </span>
                        <p className="ml-2 sm:ml-4 text-sm text-left">
                          {user?.userID?.username || 0}
                        </p>
                      </div>
                      <div>
                        <button
                          onClick={() => handleRemoveFollow(user?.userID?._id)}
                          className={`${
                            authState?.isFollowed
                              ? "w-[150px] h-[50] font-bold bg-[#37C535] text-white text-center py-[5px] px-[10px] rounded-tl-[20px] rounded-br-[20px] rounded-tr-[5px] rounded-bl-[5px] "
                              : "w-[150px] h-[50] font-bold bg-[#162423] text-white text-center py-[5px] px-[10px] rounded-tl-[20px] rounded-br-[20px] rounded-tr-[5px] rounded-bl-[5px] "
                          } rounded-lg p-2`}
                        >
                          {user?.isFollowed ? "Follow" : "Remove"}
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
    </>
  );
}

export default Followers;
