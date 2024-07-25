"use client";
import { IMAGES } from "@/assets/images";
import CustomBackground from "@/components/CustomBackground/custombackground";
import { toastError, toastSuccess } from "@/components/Toast/Toast";
import { leagueGothic } from "@/font/font";
import { ROUTES } from "@/labels/routes";
import { dispatch } from "@/store";
import { register } from "@/store/slices/authSlice";
import { validateRegister, validateRegisterInputFields } from "@/validation";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useRef, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const inputRefs = {
    name: useRef<HTMLInputElement>(null),
    username: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    password: useRef<HTMLInputElement>(null),
  };
  const errorRefs = {
    name: useRef<HTMLParagraphElement>(null),
    username: useRef<HTMLParagraphElement>(null),
    email: useRef<HTMLParagraphElement>(null),
    password: useRef<HTMLParagraphElement>(null),
  };

  const validateFields = (name: string, value: string) => {
    const errorMsg = validateRegisterInputFields({ [name]: value });

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
      validateFields(name, value);
    }
  };

  const onRegister = () => {
    const payload = {
      name: form.name.trim(),
      username: form.username.trim(),
      email: form.email.trim(),
      password: form.password.trim(),
    };

    const errorMsg = validateRegister(payload);
    if (errorMsg) return toastError(errorMsg);

    const successCallback = async (message: string) => {
      toastSuccess(message);
      setTimeout(() => {
        router.push(ROUTES.login);
      }, 6000);
    };
    const errorCallback = (message: string) => {
      toastError(message);
    };

    const params = {
      payload,
      successCallback,
      errorCallback,
    };

    dispatch(register(params));
  };

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
            SIGNUP
          </h1>
          <hr className="w-7 border-t-4 border-[#43DD4E] rounded-lg" />

          <form
            onSubmit={(e) => e.preventDefault()}
            className="space-y-4 md:space-y-6"
          >
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-white"
              >
                Name
              </label>
              <input
                ref={inputRefs.name}
                type="text"
                name="name"
                className="bg-[#162423] sm:text-sm outline-none rounded-lg block w-full p-2.5 text-white"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
              />
              <p
                ref={errorRefs.name}
                className="mt-2 text-xs  font-normal text-gray-600 base-input-message"
              ></p>
            </div>
            <div>
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-white"
              >
                Username
              </label>
              <input
                ref={inputRefs.username}
                type="text"
                name="username"
                className="bg-[#162423] sm:text-sm outline-none rounded-lg block w-full p-2.5 text-white "
                placeholder="Username"
                value={form.username}
                onChange={handleChange}
              />
              <p
                ref={errorRefs.username}
                className="mt-2 text-xs  font-normal text-gray-600 base-input-message"
              ></p>
            </div>

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
                className="bg-[#162423] sm:text-sm rounded-lg outline-none block w-full p-2.5 text-white"
                placeholder="Email Address"
                value={form.email}
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
                className="bg-[#162423] sm:text-sm rounded-lg outline-none block w-full p-2.5 text-white"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
              />
              <p
                ref={errorRefs.password}
                className="mt-2 text-xs  font-normal text-gray-600 base-input-message"
              ></p>
            </div>

            <button
              className="w-full h-12 bg-[#37C535] font-bold text-white text-center rounded-tl-[20px] rounded-br-[20px] rounded-tr-[5px] rounded-bl-[5px] mb-3"
              onClick={onRegister}
              type="submit"
            >
              SignUp
            </button>
            <p className="text-sm font-light text-center text-gray-50">
              Already have an account?{" "}
              <a
                href="/login"
                className="font-medium text-primary-600 hover:underline text-[#43DD4E]"
              >
                Login
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

export default Signup;
