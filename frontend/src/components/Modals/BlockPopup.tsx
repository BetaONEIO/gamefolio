"use client";
import { leagueGothic } from "@/font/font";
import { toastError, toastSuccess } from "../Toast/Toast";
import { blockUser } from "@/store/slices/userSlice";
import { dispatch, useSelector } from "@/store";

interface BlockPopupProps {
  handleCloseModal: () => void;
  data: any;
}

function BlockPopup({ handleCloseModal, data }: BlockPopupProps) {
  const authState = useSelector((state: any) => state.auth.userData) || [];
  const myBGStyleModal = {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    backdropFilter: "blur(8px)",
  };

  const handleBlockUser = async (blockedUserId: any) => {
    const payload = {
      userId: authState._id,
      blockedUserId: blockedUserId,
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

    dispatch(blockUser(params));
  };

  return (
    <>
      <div
        style={myBGStyleModal}
        className="fixed inset-0 flex items-center justify-center z-50"
      >
        <div className="modal-container w-[410px] mx-auto lg-rounded z-50">
          {/* Modal content */}

          <div className="relative text-center justify-center  rounded-lg  bg-[#091619] p-5 sm:p-5 border border-[#586769]">
            <h1
              className={`${leagueGothic.className} text-3xl mb-7  text-white`}
            >
              UNBLOCK USER
            </h1>

            <div className="w-full mb-4 sm:mb-5">
              <p className="text-md">
                Are you sure you want to block this user?
              </p>
            </div>

            <div className="flex flex-col items-center mb-2 sm:mb-2 ">
              <button
                onClick={() => handleBlockUser(data)}
                className="w-1/2 h-[50] font-bold bg-[#162423] text-white text-center py-[10px] px-[30px] rounded-tl-[20px] rounded-br-[20px] rounded-tr-[5px] rounded-bl-[5px] mb-3"
              >
                Yes
              </button>
              <button
                className="w-1/2 h-[50] font-bold bg-[#37C535] text-white text-center py-[10px] px-[30px] rounded-tl-[20px] rounded-br-[20px] rounded-tr-[5px] rounded-bl-[5px]"
                onClick={handleCloseModal}
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BlockPopup;
