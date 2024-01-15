"use client";
import Image from "next/image";
import { SVG } from "@/assets/SVG";
import { leagueGothic } from "@/font/font";
import { dispatch } from "@/store";
import {
  updatePassword,
  verifyForgotPasswordOTP,
} from "@/store/slices/authSlice";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { toastError, toastSuccess } from "../Toast/Toast";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface ChangePasswordProps {
  email: string;
  handleCloseModal: (error?: string) => void;
}

interface FormData {
  password: string;
  newPassword: string;
  confirmNewPassword: string;
}

function OtpVerification({ email, handleCloseModal }: ChangePasswordProps) {
  const authState = useSelector((state: any) => state.auth.userData) || [];
  const [otp, setOtp] = useState("");

  const router = useRouter();

  console.log("OTP", otp);

  const myBGStyleModal = {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    backdropFilter: "blur(8px)",
  };

  const handleVerifyForgetOTP = (data: any) => {
    if (email.length === 0 || email === "" || !email.includes("@")) {
      toastError("No email found");
      return;
    }
    if (otp.length !== 6 || otp === "") {
      toastError("Enter only 6 digit OTP");
      return;
    }

    const payload = {
      email: email,
      otp: otp,
    };

    const successCallback = (response: any) => {
      toastSuccess(response);
      setTimeout(() => {
        router.push("/reset-password"), 3000;
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
    dispatch(verifyForgotPasswordOTP(params));
  };

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
              OTP Verify
            </h1>

            <div className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="otp"
                  className="block mb-2 text-sm font-bold  text-white"
                >
                  Enter OTP sent to your email address to reset the password.
                </label>
                <input
                  id="otp"
                  type="number"
                  className="bg-[#162423] sm:text-sm rounded-lg outline-none block w-full p-3 text-white"
                  placeholder="Enter 6 digit OTP here"
                  maxLength={6}
                  minLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>

              <button
                className="w-full font-bold h-[50] bg-[#37C535] text-white text-center py-[10px] px-[30px] rounded-tl-[20px] rounded-br-[20px] rounded-tr-[5px] rounded-bl-[5px] mb-3"
                onClick={handleVerifyForgetOTP}
              >
                Verify
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

export default OtpVerification;
