"use client";
import { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IMAGES } from "@/assets/images";
import { leagueGothic } from "@/font/font";
import { RootState, dispatch, useSelector } from "@/store";
import { ROUTES } from "@/labels/routes";
import { login } from "@/store/slices/authSlice";
import { getFromLocal } from "@/utils/localStorage";
import { validateLogin } from "@/validation";
import { ToastContainer } from "react-toastify";
import { toastError, toastSuccess } from "@/components/Toast/Toast";

const Page = () => {
  const router = useRouter();
  const authState = useSelector((state: RootState) => state.auth);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  // console.log("####123", authState);

  const { email, password } = formData;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onLogin = async () => {
    const payload = {
      email: email.trim(),
      password: password.trim(),
    };

    const errorMsg = validateLogin(payload);
    if (errorMsg) return toastError(errorMsg);

    const successCallback = (response: any) => {
      // if (response.data.is_email_verified === false) {
      //   setMessage(response.message);
      //   return;
      // }

      toastSuccess(response.message);

      setTimeout(() => {
        if (response.favoriteGames.length === 0) {
          router.push(ROUTES.selectGame);
        } else {
          router.push(ROUTES.main);
        }
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
    // setToLocal("@token", authState.token);
  };

  // Will Update in Future
  useEffect(() => {
    if (getFromLocal("@token")) {
      router.replace(ROUTES.main);
    } else {
      router.replace(ROUTES.login);
    }
  }, []);

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
          <h1 className={`${leagueGothic.className} text-4xl`}>LOGIN</h1>
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
                type="email"
                name="email"
                className="bg-[#162423] sm:text-sm outline-none rounded-lg block w-full p-3 text-white"
                placeholder="Email Address"
                value={email}
                onChange={handleChange}
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
                id="password"
                className="bg-[#162423] sm:text-sm rounded-lg outline-none block w-full p-3 text-white"
                placeholder="Password"
                value={password}
                onChange={handleChange}
              />
            </div>

            <button
              className="w-full h-[50] bg-[#37C535] text-white text-center py-[10px] px-[30px] rounded-tl-[20px] rounded-br-[20px] rounded-tr-[5px] rounded-bl-[5px] mb-3"
              onClick={onLogin}
            >
              Login
            </button>

            <p className="text-sm font-light text-center text-gray-300">
              <a href="./forget-password">Forget Password?</a>
            </p>

            <p className="text-sm font-light text-center text-gray-50">
              A new user?{" "}
              <a
                href="./signup"
                className="font-medium text-primary-600 hover:underline  text-green-400"
              >
                SignUp
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

export default Page;
