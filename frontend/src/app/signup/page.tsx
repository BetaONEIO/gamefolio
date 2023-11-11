"use client";
import { IMAGES } from "@/assets/images";
import { toastError, toastSuccess } from "@/components/Toast/Toast";
import { leagueGothic } from "@/font/font";
import { ROUTES } from "@/labels/routes";
import { RootState, dispatch, useSelector } from "@/store";
import { register } from "@/store/slices/authSlice";
import { validateRegister } from "@/validation";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const router = useRouter();
  const authState = useSelector((state: RootState) => state.auth);
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
    // Convert the input value to capitalize each word
    // if (e.currentTarget.name === "name") {
    //   const capitalizedValue = e.currentTarget.value.replace(/\b\w/g, (char) =>
    //     char.toUpperCase()
    //   );
    //   setForm({ ...form, [e.currentTarget.name]: capitalizedValue });
    //   return;
    // }
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
    <section className="bg-gray-50 dark:bg-[#091619] min-h-screen flex flex-col justify-center">
      <div className="flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        <Image src={IMAGES.logo} alt="logo" width={100} height={100} />

        <div className="p-6 space-y-4 sm:p-8 md:w-96">
          <h1 className={`${leagueGothic.className} text-4xl`}>SIGNUP</h1>
          <hr className="w-7 border-t-4 border-[#43DD4E] rounded-lg" />

          <form
            onSubmit={(e) => e.preventDefault()}
            className="space-y-4 md:space-y-6"
          >
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                className="bg-[#162423] sm:text-sm outline-none rounded-lg block w-full p-2.5 dark:text-white"
                placeholder="Name"
                value={form.name}
                onChange={onChange}
              />
            </div>
            <div>
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                className="bg-[#162423] sm:text-sm outline-none rounded-lg block w-full p-2.5 dark:text-white"
                placeholder="Username"
                value={form.username}
                onChange={onChange}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium  text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                className="bg-[#162423] sm:text-sm rounded-lg outline-none block w-full p-2.5 dark:text-white"
                placeholder="Email Address"
                value={form.email}
                onChange={onChange}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                className="bg-[#162423] sm:text-sm rounded-lg outline-none block w-full p-2.5 dark:text-white"
                placeholder="Password"
                value={form.password}
                onChange={onChange}
              />
            </div>

            <button
              className="w-full h-12 bg-[#37C535] font-bold text-white text-center rounded-tl-[20px] rounded-br-[20px] rounded-tr-[5px] rounded-bl-[5px] mb-3"
              onClick={onRegister}
              type="submit"
            >
              SignUp
            </button>
            <p className="text-sm font-light text-center text-gray-50 dark:text-gray-50">
              Already have an account?{" "}
              <a
                href="/login"
                className="font-medium text-primary-600 hover:underline dark:text-[#43DD4E]"
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
    </section>
  );
};

export default Signup;
