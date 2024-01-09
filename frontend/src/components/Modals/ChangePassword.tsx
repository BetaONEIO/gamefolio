"use client";
import Image from "next/image";
import { SVG } from "@/assets/SVG";
import { leagueGothic } from "@/font/font";
import { dispatch } from "@/store";
import { updatePassword } from "@/store/slices/authSlice";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { toastError, toastSuccess } from "../Toast/Toast";

interface ChangePasswordProps {
  handleCloseModal: (error?: string) => void;
}

interface FormData {
  password: string;
  newPassword: string;
  confirmNewPassword: string;
}

function ChangePassword({ handleCloseModal }: ChangePasswordProps) {
  const authState = useSelector((state: any) => state.auth.userData) || [];
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      password: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const myBGStyleModal = {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    backdropFilter: "blur(8px)",
  };

  const handleChangePassword = (data: any) => {
    if (data.newPassword !== data.confirmNewPassword) {
      toastError("New Password does not match");
      return;
    }

    const payload = {
      userID: authState._id,
      ...data,
    };

    const successCallback = (response: any) => {
      toastSuccess(response);
    };

    const errorCallback = (error: string) => {
      toastError(error);
    };

    const params = {
      payload,
      successCallback,
      errorCallback,
    };
    dispatch(updatePassword(params));
  };

  if (
    authState?.signupMethod === "google" ||
    authState?.signupMethod === "twitter" ||
    authState?.signupMethod === "facebook"
  ) {
    const method = authState.signupMethod; // Get the signup method
    handleCloseModal(
      `You are logged in with ${method} Account. Can't change password`
    );
    return;
  }

  return (
    <>
      <div
        style={myBGStyleModal}
        className="fixed inset-0 flex items-center justify-center z-50"
      >
        <div className="modal-container w-full sm:w-2/3 md:w-1/2 lg:w-1/4 mx-auto lg-rounded z-50 overflow-y-auto">
          {/* Modal content */}

          <div className="relative p-4 rounded-lg bg-[#091619] sm:p-5 border border-[#586769]">
            <button
              type="button"
              className="text-white-400 absolute top-3.5 right-2.5 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-600 hover:text-white"
              data-modal-toggle="deleteAlertModal"
              onClick={() => handleCloseModal()}
            >
              <Image src={SVG.Exit} alt="exit" width={30} height={30} />
              <span className="sr-only">Close modal</span>
            </button>

            <h1
              className={`${leagueGothic.className} text-3xl mb-7 text-center  text-white`}
            >
              CHANGE PASSWORD
            </h1>

            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(handleChangePassword)}
            >
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-bold  text-white"
                >
                  Old Password
                </label>
                <input
                  type="password"
                  className="bg-[#162423] sm:text-sm rounded-lg outline-none block w-full p-3 text-white"
                  placeholder="Password"
                  {...register("password", {
                    required: true,
                  })}
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-bold text-white"
                >
                  New Password
                </label>
                <input
                  type="password"
                  className="outline-none
                  bg-[#162423] sm:text-sm rounded-lg  block w-full p-3 text-white"
                  placeholder="Password"
                  required
                  {...register("newPassword", {
                    required: true,
                  })}
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-bold text-white"
                >
                  Repeat New Password
                </label>
                <input
                  type="password"
                  className="outline-none
                  } bg-[#162423] sm:text-sm rounded-lg block w-full p-3 text-white"
                  placeholder="Password"
                  {...register("confirmNewPassword", {
                    required: true,
                  })}
                />
              </div>

              <button className="w-full font-bold h-[50] bg-[#37C535] text-white text-center py-[10px] px-[30px] rounded-tl-[20px] rounded-br-[20px] rounded-tr-[5px] rounded-bl-[5px] mb-3">
                Save
              </button>
            </form>
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

export default ChangePassword;
