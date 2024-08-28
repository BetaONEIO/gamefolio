"use client";
import { leagueGothic } from "@/font/font";
import { dispatch, useSelector } from "@/store";
import { toastError, toastSuccess } from "../Toast/Toast";
import { deleteVideo } from "@/store/slices/postSlice";
import { ToastContainer } from "react-toastify";

interface DeletePostProps {
  handleCloseModal: () => void;
  handlePageRefresh: () => void;
  postID?: any;
}

function DeletePost({
  handleCloseModal,
  postID,
  handlePageRefresh,
}: DeletePostProps) {
  const authState = useSelector((state: any) => state.auth.userData) || [];

  const myBGStyleModal = {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    backdropFilter: "blur(8px)",
  };

  const handleDeletePost = async (postID: any) => {
    const payload = {
      userID: authState._id,
      postID: postID,
    };

    const successCallback = (response: any) => {
      handlePageRefresh();
      toastSuccess(response);
      handleCloseModal();
    };

    const errorCallback = (error: string) => {
      toastError(error);
    };

    const params = {
      payload,
      successCallback,
      errorCallback,
    };

    dispatch(deleteVideo(params));
  };

  return (
    <>
      <div
        style={myBGStyleModal}
        className="fixed inset-0 flex items-center justify-center z-50"
      >
        <div className="modal-container w-[410px] mx-auto lg-rounded z-50">
          {/* Modal content */}

          <div className="relative text-center justify-center rounded-lg bg-[#091619] p-5 sm:p-5 border border-[#586769]">
            <h1
              className={`${leagueGothic.className} text-3xl mb-7 text-white`}
            >
              DELETE POST
            </h1>

            <div className="w-full mb-4 sm:mb-5">
              <p className="text-md text-white">
                Are you sure you want to Delete Post?
              </p>
            </div>

            <div className="flex flex-col items-center mb-2 sm:mb-2">
              <button
                className="w-1/2 h-[50] font-bold bg-[#162423] text-white text-center py-[10px] px-[30px] rounded-tl-[20px] rounded-br-[20px] rounded-tr-[5px] rounded-bl-[5px] mb-3"
                onClick={() => handleDeletePost(postID)}
              >
                Yes
              </button>
              <button
                onClick={handleCloseModal}
                className="w-1/2 h-[50] font-bold bg-gradient-to-b from-[#62C860] to-[#37C535] text-white text-center py-[10px] px-[30px] rounded-tl-[20px] rounded-br-[20px] rounded-tr-[5px] rounded-bl-[5px]"
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default DeletePost;
