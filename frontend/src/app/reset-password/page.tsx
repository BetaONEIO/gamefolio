"use client";
import Image from "next/image";
import { IMAGES } from "@/assets/images";
import { leagueGothic } from "@/font/font";
import { toastError, toastSuccess } from "@/components/Toast/Toast";
import { dispatch } from "@/store";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { ToastContainer } from "react-toastify";
import {
  validateResetPassword,
  validateResetPasswordInputFields,
} from "@/validation";
import { resetPasswordRequest } from "@/store/slices/authSlice";
import CustomBackground from "@/components/CustomBackground/custombackground";

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

  const inputRefs = {
    password: useRef<HTMLInputElement>(null),
    confirmPassword: useRef<HTMLInputElement>(null),
  };
  const errorRefs = {
    password: useRef<HTMLParagraphElement>(null),
    confirmPassword: useRef<HTMLParagraphElement>(null),
  };

  const validateFields = (name: string, value: string) => {
    const errorMsg = validateResetPasswordInputFields({ [name]: value });

    const inputRef = inputRefs[name as keyof typeof inputRefs];
    const errorRef = errorRefs[name as keyof typeof errorRefs];
    if (inputRef.current && errorRef && errorRef.current) {
      if (errorMsg === false) {
        errorRef.current.style.display = "none";
        errorRef.current.textContent = "";
        inputRef.current.style.border = "";
      } else {
        errorRef.current.style.display = "block";
        errorRef.current.textContent = errorMsg as string;
        inputRef.current.style.border = "1px solid red";
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget || {}; // Add a fallback to prevent destructuring from null

    if (name && value !== undefined) {
      // Ensure name and value are not undefined or null
      setResetPassword({
        ...resetPassword,
        [e.currentTarget.name]: e.currentTarget.value,
      });
      validateFields(name, value);
    }
  };

  const handleForgetPasswordState = () => {
    if (
      !forgetPasswordState ||
      forgetPasswordState?.email?.trim()?.length === 0 ||
      forgetPasswordState?.email?.trim() === "" ||
      forgetPasswordState?.otp?.trim() === "" ||
      !forgetPasswordState?.email?.includes("@") ||
      Object.keys(forgetPasswordState)?.length === 0
    ) {
      toastError("No email found");
      router.push("/login");
      return true;
    }

    return false;
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
    <CustomBackground>
      <div className="flex flex-col items-center justify-center px-6 py-8 ">
        <div className="p-6 space-y-4 sm:p-8 md:w-96 bg-[#091619] rounded-xl border border-[#1C2C2E]">
          <div className="flex justify-center items-center">
            <Image
              src={IMAGES.logo}
              alt="logo"
              width={100}
              height={100}
              priority
              style={{ width: "100px", height: "100px" }}
            />
          </div>

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
                ref={inputRefs.password}
                type="password"
                name="password"
                id="password"
                className="bg-[#162423] sm:text-sm rounded-lg outline-none block w-full p-3 text-white"
                placeholder="New Password"
                required
                value={resetPassword.password}
                onChange={handleChange}
              />
              <p
                ref={errorRefs.password}
                className="mt-2 text-xs  font-normal text-gray-600 base-input-message"
              ></p>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block mb-2 text-sm font-medium  text-white"
              >
                Repeat New Password
              </label>
              <input
                ref={inputRefs.confirmPassword}
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="bg-[#162423] sm:text-sm rounded-lg outline-none block w-full p-3 text-white"
                placeholder="Confirm New Password"
                required
                value={resetPassword.confirmPassword}
                onChange={handleChange}
              />
              <p
                ref={errorRefs.confirmPassword}
                className="mt-2 text-xs  font-normal text-gray-600 base-input-message"
              ></p>
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
    </CustomBackground>
  );
};

export default ResetPassword;
