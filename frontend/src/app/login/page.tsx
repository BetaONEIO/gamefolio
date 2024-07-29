"use client";
import { IMAGES } from "@/assets/images";
import CustomBackground from "@/components/CustomBackground/custombackground";
import { toastError, toastSuccess } from "@/components/Toast/Toast";
import { leagueGothic } from "@/font/font";
import { ROUTES } from "@/labels/routes";
import { RootState, dispatch, useSelector } from "@/store";
import { login } from "@/store/slices/authSlice";
import { getCookieValue, getFromLocal } from "@/utils/localStorage";
import { validateLogin, validateLoginInputFields } from "@/validation";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { ToastContainer } from "react-toastify";

const Page = () => {
  const router = useRouter();
  const authState = useSelector((state: RootState) => state.auth);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const inputRefs = {
    email: useRef<HTMLInputElement>(null),
    password: useRef<HTMLInputElement>(null),
  };
  const errorRefs = {
    email: useRef<HTMLParagraphElement>(null),
    password: useRef<HTMLParagraphElement>(null),
  };

  const validateFields = (name: string, value: string) => {
    const errorMsg = validateLoginInputFields({ [name]: value });

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
      setFormData((prevForm) => ({ ...prevForm, [name]: value }));
      validateFields(name, value);
    }
  };

  const onLogin = async () => {
    const payload = {
      email: email.trim(),
      password: password.trim(),
    };

    const errorMsg = validateLogin(payload);
    if (errorMsg) return toastError(errorMsg);

    const successCallback = (response: any) => {
      toastSuccess(response.message);

      setTimeout(() => {
        router.push(ROUTES.main);
      }, 6000);
    };

    const errorCallback = (error: string) => {
      toastError(error);
    };

    const params = {
      payload,
      successCallback,
      errorCallback,
    };

    dispatch(login(params));
  };

  // If user is already login, redirect to main
  useEffect(() => {
    if (getFromLocal("@token") || getCookieValue("gfoliotoken")) {
      router.replace(ROUTES.main);
    } else {
      router.replace(ROUTES.login);
    }
  }, []);

  return (
    <CustomBackground>
      <div className="flex flex-col items-center justify-center px-6 py-8 ">
        <div className="p-6 space-y-4 sm:p-8 md:w-96 bg-[#091619] rounded-xl border border-[#1C2C2E] h-screen overflow-scroll">
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

          <h1 className={`${leagueGothic.className} text-4xl text-white`}>
            LOGIN
          </h1>
          <hr className="w-7 border-t-4 border-[#43DD4E] rounded-lg" />

          <form
            className="space-y-4 md:space-y-6"
            onSubmit={(e) => e.preventDefault()}
          >
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
                name="email"
                className="bg-[#162423] sm:text-sm outline-none rounded-lg block w-full p-3 text-white"
                placeholder="Email Address"
                value={email}
                onChange={handleChange}
              />
              <p
                ref={errorRefs.email}
                className="mt-2 text-xs  font-normal text-gray-600 base-input-message"
              ></p>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-white"
              >
                Password
              </label>
              <input
                ref={inputRefs.password}
                type="password"
                name="password"
                id="password"
                className="bg-[#162423] sm:text-sm rounded-lg outline-none block w-full p-3 text-white"
                placeholder="Password"
                value={password}
                onChange={handleChange}
              />
              <p
                ref={errorRefs.password}
                className="mt-2 text-xs  font-normal text-gray-600 base-input-message"
              ></p>
            </div>

            <button
              className="w-full h-[50] bg-[#37C535] text-white text-center py-[10px] px-[30px] rounded-tl-[20px] rounded-br-[20px] rounded-tr-[5px] rounded-bl-[5px] mb-3"
              onClick={onLogin}
            >
              Login
            </button>

            <p className="text-sm font-light text-center text-gray-300">
              <a href="./forgot-password">Forget Password?</a>
            </p>

            <p className="text-sm font-light text-center text-gray-50">
              A new user?{" "}
              <a
                href="./signup"
                className="font-medium text-primary-600 hover:underline  text-green-400"
              >
                Sign up
              </a>
            </p>
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
          </form>
        </div>
      </div>
    </CustomBackground>
  );
};

export default Page;
