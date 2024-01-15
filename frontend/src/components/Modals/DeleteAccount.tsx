import { leagueGothic } from "@/font/font";
import { toastError, toastSuccess } from "../Toast/Toast";
import { dispatch, useSelector } from "@/store";
import { ToastContainer } from "react-toastify";
import { deactivateAccount } from "@/store/slices/userSlice";
import { removeCookie, removeFromLocal } from "@/utils/localStorage";
import { ROUTES } from "@/labels/routes";
import { useRouter } from "next/navigation";

interface DeleteAccountProps {
  handleCloseModal: () => void;
}

function DeleteAccount({ handleCloseModal }: DeleteAccountProps) {
  const router = useRouter();
  const authState = useSelector((state: any) => state.auth.userData) || [];
  const myBGStyleModal = {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    backdropFilter: "blur(8px)",
  };

  // handle logout
  const handleLogout = () => {
    removeCookie("connect.sid");
    removeCookie("gfoliotoken");
    removeFromLocal("@token");
    removeFromLocal("@userData");
    router.replace(ROUTES.login);
  };

  // handleDeactivateAccount
  const handleDeactivateAccount = (data: any) => {
    const payload = {
      userID: authState._id,
    };

    const successCallback = (response: any) => {
      toastSuccess(response);
      handleLogout();
    };

    const errorCallback = (error: string) => {
      toastError(error);
    };

    const params = {
      payload,
      successCallback,
      errorCallback,
    };
    dispatch(deactivateAccount(params));
  };

  return (
    <>
      <div
        style={myBGStyleModal}
        className="fixed inset-0 flex items-center justify-center z-50"
      >
        <div className="modal-container w-[410px] mx-auto lg-rounded z-50 ">
          {/* Modal content */}

          <div className="relative text-center justify-center  rounded-lg bg-[#091619] p-5 sm:p-5 border border-[#586769]">
            <h1
              className={`${leagueGothic.className} text-3xl mb-7  text-white`}
            >
              DEACTIVE ACCOUNT
            </h1>

            <div className="w-full mb-4 sm:mb-5">
              <p className="text-md">
                After 30 days of account deactivation, the system will delete
                all the data of the account. You can login into your account
                during the time and account will be reactivated.
              </p>
            </div>

            <div className="flex flex-col items-center mb-2 sm:mb-2 ">
              <button
                className="w-1/2 h-[50] font-bold bg-[#162423] text-white text-center py-[10px] px-[30px] rounded-tl-[20px] rounded-br-[20px] rounded-tr-[5px] rounded-bl-[5px] mb-3 hover:opacity-80 cursor-pointer"
                onClick={handleDeactivateAccount}
              >
                Confirm
              </button>
              <button
                onClick={() => handleCloseModal()}
                className="w-1/2 h-[50] font-bold bg-[#37C535] text-white text-center py-[10px] px-[30px] rounded-tl-[20px] rounded-br-[20px] rounded-tr-[5px] rounded-bl-[5px] hover:opacity-80 cursor-pointer"
              >
                Cancel
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

export default DeleteAccount;
