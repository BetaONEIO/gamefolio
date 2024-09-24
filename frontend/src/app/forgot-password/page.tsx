"use client";
import { IMAGES } from "@/assets/images";
import CustomBackground from "@/components/CustomBackground/custombackground";
import Modal from "@/components/Modals/Modal";
import OtpVerification from "@/components/Modals/OtpVerification";
import { toastError, toastSuccess } from "@/components/Toast/Toast";
import { leagueGothic } from "@/font/font";
import { dispatch, useSelector } from "@/store";
import { forgotPasswordOTP } from "@/store/slices/authSlice";
import { validateForgetPasswordInputFields } from "@/validation";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useRef, useState } from "react";
import { ToastContainer } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [modalState, setModalState] = useState({
    isOtpVerificationModalOpen: false,
  });

  const inputRefs = {
    email: useRef<HTMLInputElement>(null),
  };
  const errorRefs = {
    email: useRef<HTMLParagraphElement>(null),
  };

  const validateFields = (name: string, value: string) => {
    const errorMsg = validateForgetPasswordInputFields({ [name]: value });

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
      setEmail(value);
      validateFields(name, value);
    }
  };

  const handleModalToggle = (
    modalName: keyof typeof modalState,
    error?: string
  ) => {
    if (error) {
      toastError(error);
    }
    setModalState((prevState) => ({
      ...prevState,
      [modalName]: !prevState[modalName],
    }));
  };

  const handleForgetPassword = (data: any) => {
    if (email?.length === 0 || email === "" || !email.includes("@")) {
      toastError("Please enter Email");
      return;
    }

    const payload = {
      email: email,
    };

    const successCallback = (response: any) => {
      toastSuccess(response);
      handleModalToggle("isOtpVerificationModalOpen");
    };

    const errorCallback = (error: string) => {
      toastError(error);
    };

    const params = {
      payload,
      successCallback,
      errorCallback,
    };
    dispatch(forgotPasswordOTP(params));
  };
  return (
    <CustomBackground>
      <div className="flex flex-col items-center justify-center px-6 py-8 ">
        <div className="p-12 space-y-4  md:w-[455px] bg-[#091619] rounded-xl border border-[#1C2C2E]">
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
            FORGOT PASSWORD
          </h1>
          <hr className="w-7 border-t-4 border-[#43DD4E] rounded-lg" />

          <p className="text-sm font-medium">
            Please enter your registered email <br /> address to reset the
            password.
          </p>

          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-white"
            >
              Email
            </label>
            <input
              ref={inputRefs.email}
              type="email"
              id="email"
              name="email"
              className="bg-[#162423] sm:text-sm outline-none rounded-lg block w-full p-3 text-white"
              placeholder="Email Address"
              required
              value={email}
              onChange={handleChange}
            />
            <p
              ref={errorRefs.email}
              className="mt-2 text-xs  font-normal text-gray-600 base-input-message"
            ></p>
          </div>

          <button
            className="w-full h-12 bg-gradient-to-b from-[#62C860] to-[#37C535] text-white text-center rounded-tl-[20px] rounded-br-[20px] rounded-tr-[5px] rounded-bl-[5px] mb-3"
            onClick={handleForgetPassword}
          >
            Send
          </button>

          <p className="text-sm font-light text-center text-gray-50">
            Go back to{" "}
            <Link
              href="/login"
              className="font-medium text-primary-600 hover:underline text-[#43DD4E]"
            >
              Login
            </Link>
          </p>
        </div>
      </div>

      {/* Modals */}
      <Modal
        isOpen={modalState.isOtpVerificationModalOpen}
        handleClose={() => handleModalToggle("isOtpVerificationModalOpen")}
      >
        <OtpVerification
          email={email}
          handleCloseModal={(error?: string) =>
            handleModalToggle("isOtpVerificationModalOpen", error)
          }
        />
      </Modal>

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

export default ForgotPassword;
