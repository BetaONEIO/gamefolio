"use client";
import { SVG } from "@/assets/SVG";
import { IMAGES } from "@/assets/images";
import { leagueGothic } from "@/font/font";
import { dispatch, useSelector } from "@/store";
import Image from "next/image";
import { toastError, toastSuccess } from "../Toast/Toast";
import { unBlockUser } from "@/store/slices/userSlice";
import Link from "next/link";

interface BlockUserProps {
  handleCloseModal: () => void; // Define handleCloseModal as a function
}

function BlockUser({ handleCloseModal }: BlockUserProps) {
  const authState = useSelector((state: any) => state.auth.userData) || [];

  const myBGStyleModal = {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    backdropFilter: "blur(8px)",
  };

  const handleRemoveFollow = async (unblockedUserId: any) => {
    const payload = {
      userId: authState._id,
      unblockedUserId: unblockedUserId,
    };

    console.log("authState._id:", authState._id);
    console.log("followerID:", unblockedUserId);

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

    dispatch(unBlockUser(params));
  };

  return (
    <>
      <div
        style={myBGStyleModal}
        className="fixed inset-0 flex items-center justify-center z-50"
      >
        <div className="modal-container w-80 sm:w-1/3 lg-rounded z-50 ">
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
              BLOCK USER
            </h1>

            <div className="flex flex-col w-full sm:min-h-[350px] lg:min-h-[500px] max-h-[400px] sm:max-h-[350px] lg:max-h-[500px] overflow-y-auto no-scrollbar">
              {authState?.block?.map((user: any) => (
                <div key={user._id}>
                  <div className="flex items-center my-3">
                    <Image
                      className="w-12 h-12 object-contain rounded-lg"
                      src={user?.userID?.profilePicture || IMAGES.Profile}
                      alt="Profile"
                      width={30}
                      height={30}
                    />
                    <div className="flex items-center justify-between w-full sm:w-full">
                      <Link
                        href={`/account/${user?.userID?.username}`}
                        key={user._id}
                      >
                        <div>
                          <span className="ml-2 sm:ml-4 font-bold sm:text-sm">
                            {user?.userID?.name}
                          </span>
                          <p className="ml-2 sm:ml-4 text-xs text-left">
                            {user?.userID?.username}
                          </p>
                        </div>
                      </Link>
                      <div>
                        <button
                          onClick={() => handleRemoveFollow(user?.userID?._id)}
                          className={`${
                            user.isBlocked
                              ? "w-[100px] h-[50] font-bold bg-[#37C535] text-white text-center py-[5px] px-[10px] rounded-tl-[20px] rounded-br-[20px] rounded-tr-[5px] rounded-bl-[5px] "
                              : "w-[100px] h-[50] font-bold bg-[#162423] text-white text-center py-[5px] px-[10px] rounded-tl-[20px] rounded-br-[20px] rounded-tr-[5px] rounded-bl-[5px] "
                          } rounded-lg p-2`}
                        >
                          {"Unblock"}
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

export default BlockUser;
