"use client";
import { leagueGothic } from "@/font/font";
import { ROUTES } from "@/labels/routes";
import { dispatch } from "@/store";
import {
  onVerifySignupUsername,
  updateUsername,
} from "@/store/slices/authSlice";
import { validateRegisterInputFields } from "@/validation";
import { useRouter } from "next/navigation";
import { ChangeEvent, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { toastError } from "../Toast/Toast";

interface UsernameProps {
  handleCloseModal: (error?: string) => void;
}

interface FormData {
  password: string;
  newPassword: string;
  confirmNewPassword: string;
}

function Username({ handleCloseModal }: UsernameProps) {
  const authState = useSelector((state: any) => state.auth.userData) || [];
  const { loading } = useSelector((state: any) => state.auth) || [];
  const [isVerifiedUsername, setIsVerifiedUsername] = useState(false);
  const [form, setForm] = useState({
    username: "",
  });
  const inputRefs = {
    username: useRef<HTMLInputElement>(null),
  };
  const errorRefs = {
    username: useRef<HTMLParagraphElement>(null),
  };

  const router = useRouter();

  const myBGStyleModal = {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    backdropFilter: "blur(8px)",
  };

  const validateFields = (name: string, value: any, apiChecked?: boolean) => {
    let errorMsg;

    if (!apiChecked) {
      errorMsg = validateRegisterInputFields({ [name]: value });
    }

    if (apiChecked) {
      errorMsg = value;
    }

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
      setForm((prevForm) => ({ ...prevForm, [name]: value }));

      if (name === "username" && value.length >= 4) {
        const payload = {
          username: value,
        };

        const successCallback = async (message: string) => {
          if (message === "Success") {
            setIsVerifiedUsername(true);
            return validateFields("username", false, true);
          }
        };
        const errorCallback = (message: string) => {
          setIsVerifiedUsername(false);
          return validateFields("username", message, true);
        };

        const params = {
          payload,
          successCallback,
          errorCallback,
        };
        dispatch(onVerifySignupUsername(params));
      }

      return validateFields(name, value);
    }
  };

  const onSubmitUsername = () => {
    const payload = {
      username: form.username.trim(),
    };

    const errorMsg = validateRegisterInputFields({
      ["username"]: payload.username,
    });
    if (errorMsg) return toastError(errorMsg);

    // validating username
    if (!isVerifiedUsername) {
      toastError("Please enter another username to proceed");
      return;
    }

    const successCallback = async (message: string) => {
      handleCloseModal();
      router.replace(ROUTES.main);
    };
    const errorCallback = (message: string) => {
      toastError(message);
    };

    const params = {
      payload,
      successCallback,
      errorCallback,
    };

    dispatch(updateUsername(params));
  };

  return (
    <>
      <div
        style={myBGStyleModal}
        className="fixed inset-0 flex items-center justify-center z-50"
      >
        <div className="modal-container  w-full sm:w-2/3 md:w-1/2 lg:w-1/4 mx-auto lg-rounded z-50 overflow-y-auto">
          {/* Modal content */}

          <div className="relative p-4 rounded-lg bg-[#091619] sm:p-5 border border-[#586769]">
            <h1
              className={`${leagueGothic.className} text-3xl mb-7 text-center  text-white`}
            >
              Enter your Username
            </h1>

            <div className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Enter Username to proceed
                </label>
                <div
                  ref={inputRefs.username}
                  className="flex items-center justify-center bg-[#162423] sm:text-sm outline-none rounded-lg  w-full  text-white "
                >
                  <input
                    type="text"
                    name="username"
                    className="bg-[#162423] sm:text-sm outline-none rounded-lg  w-full h-full p-2.5 text-white "
                    placeholder="e.g john123"
                    value={form.username}
                    onChange={handleChange}
                  />
                  {loading && (
                    <div className="px-2" role="status">
                      <svg
                        aria-hidden="true"
                        className="inline w-5 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span className="sr-only">Loading...</span>
                    </div>
                  )}
                </div>
                <p
                  ref={errorRefs.username}
                  className="mt-2 text-xs  font-normal text-gray-600 base-input-message"
                ></p>
              </div>

              <button
                className="w-full font-bold h-[50] bg-gradient-to-b from-[#62C860] to-[#37C535] text-white text-center py-[10px] px-[30px] rounded-tl-[20px] rounded-br-[20px] rounded-tr-[5px] rounded-bl-[5px] mb-3"
                onClick={onSubmitUsername}
              >
                Add
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

export default Username;
