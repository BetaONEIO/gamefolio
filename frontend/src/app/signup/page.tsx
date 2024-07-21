"use client";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { IMAGES } from "@/assets/images";
import { toastError, toastSuccess } from "@/components/Toast/Toast";
import { leagueGothic } from "@/font/font";
import { ROUTES } from "@/labels/routes";
import { RootState, dispatch, useSelector } from "@/store";
import { register } from "@/store/slices/authSlice";
import { validateRegister } from "@/validation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomBackground from "@/components/CustomBackground/custombackground";

const Signup = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const validateName = (name: any) => {
    const pattern = /^[A-Za-z\s]+$/;
    return pattern.test(name);
  };
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.currentTarget.name]: e.currentTarget.value });
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

          <h1 className={`${leagueGothic.className} text-4xl`}>SIGNUP</h1>
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
                type="text"
                name="name"
                className="bg-[#162423] sm:text-sm outline-none rounded-lg block w-full p-2.5 text-white"
                placeholder="Name"
                value={form.name}
                onChange={onChange}
              />
            </div>
            <div>
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-white"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                className="bg-[#162423] sm:text-sm outline-none rounded-lg block w-full p-2.5 text-white"
                placeholder="Username"
                value={form.username}
                onChange={onChange}
              />
              <p className="mt-2 text-xs font-normal text-gray-600">
                Example: john_doe123
              </p>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-white"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                className="bg-[#162423] sm:text-sm rounded-lg outline-none block w-full p-2.5 text-white"
                placeholder="Email Address"
                value={form.email}
                onChange={onChange}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-white"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                className="bg-[#162423] sm:text-sm rounded-lg outline-none block w-full p-2.5 text-white"
                placeholder="Password"
                value={form.password}
                onChange={onChange}
              />
              <p className="mt-2 text-xs font-normal text-gray-600">
                Example: Password123@
              </p>
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
