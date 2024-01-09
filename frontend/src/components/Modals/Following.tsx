"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { SVG } from "@/assets/SVG";
import { IMAGES } from "@/assets/images";
import { leagueGothic } from "@/font/font";
import { dispatch, useSelector } from "@/store";
import { toastError, toastSuccess } from "../Toast/Toast";
import { removeFollowing } from "@/store/slices/userSlice";

interface FollowingProps {
  handleCloseModal: () => void;
  followingData: any;
}
function Following({ handleCloseModal, followingData }: FollowingProps) {
  const authState = useSelector((state: any) => state.auth.userData) || [];
  const [searchQuery, setSearchQuery] = useState<string>("");
  // console.log("authstate", authState);

  const myBGStyleModal = {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    backdropFilter: "blur(8px)",
  };

  const handleRemoveFollowing = async (followingID: any) => {
    const payload = {
      userId: authState._id,
      followingID: followingID,
    };

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

    dispatch(removeFollowing(params));
  };

  const filteredFollowerData = followingData.filter((user: any) => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const userName = user?.userID?.name.toLowerCase();
    const userUsername = user?.userID?.username.toLowerCase();

    return (
      userName.includes(lowerCaseQuery) || userUsername.includes(lowerCaseQuery)
    );
  });

  return (
    <>
      <div
        style={myBGStyleModal}
        className="fixed inset-0 flex items-center justify-center z-50"
      >
        <div className="modal-container sm:w-96 mx-auto lg:w-2/5 z-50 overflow-y-auto">
          {/* Modal content */}
          <div className="relative text-center rounded-lg bg-[#091619] py-3 px-3 sm:py-6 sm:px-8 border border-[#586769]">
            <button
              type="button"
              className="text-white-400 absolute top-2.5 right-2.5 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-600 hover:text-white"
              onClick={handleCloseModal}
            >
              <Image src={SVG.Exit} alt="exit" width={30} height={30} />
              <span className="sr-only">Close modal</span>
            </button>

            <h1
              className={`${leagueGothic.className} text-center text-3xl mb-5 text-white`}
            >
              FOLLOWING
            </h1>

            <div className="bg-[#1C2C2E] flex gap-2 px-4 items-center w-full sm:w-full rounded-lg overflow-hidden mb-2">
              <Image src={SVG.Search} alt="search" width={30} height={30} />
              <input
                className="w-full block p-2.5 outline-none bg-[#1C2C2E]"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex flex-col w-full sm:min-h-[350px] lg:min-h-[500px] max-h-[400px] sm:max-h-[350px] lg:max-h-[500px] overflow-y-auto no-scrollbar">
              {filteredFollowerData?.map((user: any) => (
                <div key={user?._id}>
                  <div className="flex items-center my-3">
                    <Image
                      className="w-12 h-12 rounded-lg"
                      src={user?.userID?.profilePicture || IMAGES.Profile}
                      alt="Profile"
                      width={50}
                      height={50}
                    />
                    <div className="flex items-center justify-between w-full sm:w-full">
                      <Link
                        href={`/account/${user?.userID?.username}`}
                        key={user?._id}
                      >
                        <div>
                          <span className="ml-2 sm:ml-4 text-sm sm:text-base">
                            {user?.userID?.name}
                          </span>
                          <p className="ml-2 sm:ml-4 text-sm text-left">
                            {user?.userID?.username}
                          </p>
                        </div>
                      </Link>
                      <div>
                        <button
                          onClick={() =>
                            handleRemoveFollowing(user?.userID?._id)
                          }
                          className={
                            "w-[150px] h-[50] font-bold bg-[#37C535] text-white text-center py-[5px] px-[10px] rounded-tl-[20px] rounded-br-[20px] rounded-tr-[5px] rounded-bl-[5px]"
                          }
                        >
                          {"Following"}
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

export default Following;
