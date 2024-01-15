"use client";
import Image from "next/image";
import { IMAGES } from "@/assets/images";
import { leagueGothic } from "@/font/font";
import { toastError, toastSuccess } from "@/components/Toast/Toast";
import { dispatch } from "@/store";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { ChangeEvent, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { validateResetPassword } from "@/validation";
import { resetPasswordRequest } from "@/store/slices/authSlice";

const ResetPassword = () => {
  const forgetPasswordState =
    useSelector((state: any) => state.auth.forgetPasswordRequest) || [];
  const [resetPassword, setResetPassword] = useState({
    password: "",
    confirmPassword: "",
  });
  const router = useRouter();

  useEffect(() => {
    handleForgetPasswordState();
  }, [forgetPasswordState]);

  const handleForgetPasswordState = () => {
    if (
      !forgetPasswordState ||
      forgetPasswordState?.email?.trim()?.length === 0 ||
      forgetPasswordState?.email?.trim() === "" ||
      forgetPasswordState?.otp?.trim() === "" ||
      !forgetPasswordState?.email?.includes("@") ||
      Object.keys(forgetPasswordState).length === 0
    ) {
      toastError("No email found");
      router.push("/login");
      return true;
    }

    return false;
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setResetPassword({
      ...resetPassword,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const handleResetPassword = () => {
    if (handleForgetPasswordState()) {
      return;
    }

    const payload = {
      email: forgetPasswordState?.email,
      otp: forgetPasswordState?.otp,
      password: resetPassword.password,
      confirmPassword: resetPassword.confirmPassword,
    };
    const errorMsg = validateResetPassword(payload);
    if (errorMsg) return toastError(errorMsg);

    const successCallback = (response: any) => {
      toastSuccess(response);
      setTimeout(() => {
        router.push("/login"), 3000;
      });
    };

    const errorCallback = (error: string) => {
      toastError(error);
    };

    const params = {
      payload,
      successCallback,
      errorCallback,
    };
    dispatch(resetPasswordRequest(params));
  };
  return (
    <section className="bg-[#091619] min-h-screen flex flex-col justify-center">
      <div className="flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        <Image
          src={IMAGES.logo}
          alt="logo"
          width={100}
          height={100}
          priority
          style={{ width: "100px", height: "100px" }}
        />

        <div className="p-6 space-y-4 sm:p-8 md:w-96">
          <h1 className={`${leagueGothic.className} text-4xl`}>
            RESET PASSWORD
          </h1>
          <hr className="w-8 border-t-4 border-[#43DD4E] rounded-lg" />

          <p className="text-sm font-normal text-gray-300">
            Please set your new password below <br /> for future login into the
            app.
          </p>

          <hr className="border-t border-gray-600 my-4" />
          <div className="space-y-4 md:space-y-6">
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium  text-white"
              >
                New Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="bg-[#162423] sm:text-sm rounded-lg outline-none block w-full p-3 text-white"
                placeholder="New Password"
                required
                value={resetPassword.password}
                onChange={onChange}
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block mb-2 text-sm font-medium  text-white"
              >
                Repeat New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="bg-[#162423] sm:text-sm rounded-lg outline-none block w-full p-3 text-white"
                placeholder="Confirm New Password"
                required
                value={resetPassword.confirmPassword}
                onChange={onChange}
              />
            </div>

            <button
              className="w-full h-12 bg-[#37C535] text-white text-center rounded-tl-[20px] rounded-br-[20px] rounded-tr-[5px] rounded-bl-[5px] mb-3"
              onClick={handleResetPassword}
            >
              Save
            </button>
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
    </section>
  );
};

export default ResetPassword;
