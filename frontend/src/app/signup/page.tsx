"use client";
import { IMAGES } from "@/assets/images";
import CustomBackground from "@/components/CustomBackground/custombackground";
import { toastError, toastSuccess } from "@/components/Toast/Toast";
import { leagueGothic } from "@/font/font";
import { ROUTES } from "@/labels/routes";
import { dispatch, useSelector } from "@/store";
import { onVerifySignupUsername, register } from "@/store/slices/authSlice";
import { validateRegister, validateRegisterInputFields } from "@/validation";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useRef, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReCAPTCHA from "react-google-recaptcha";
import Link from "next/link";
import { SVG } from "@/assets/SVG";

const Signup = () => {
  const { loading } = useSelector((state: any) => state.auth) || [];
  const router = useRouter();
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [isVerifiedUsername, setIsVerifiedUsername] = useState(false);
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const recaptchaRef = useRef<any>();
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

  const handleCaptchaChange = (value: string | null) => {
    setCaptchaValue(value);
  };
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
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

    // Check if captcha is filled
    if (!captchaValue) {
      toastError("Please complete the reCAPTCHA.");
      return;
    }

    // validating username
    if (!isVerifiedUsername) {
      toastError("Please enter another username to proceed");
      return;
    }

    // Check if terms condition and privacy policy is checked or not
    if (!isChecked) {
      toastError(
        "Please agree to our terms and conditions and privacy policy to proceed"
      );
      return;
    }

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
      <div className="flex flex-col items-center justify-center px-4 py-8 h-screen ">
        <div className="p-12 space-y-4  w-92 md:w-[455px] bg-[#091619] rounded-xl border border-[#1C2C2E]  overflow-y-scroll no-scroll no-scrollbar">
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
              <div
                ref={inputRefs.username}
                className="flex items-center justify-center bg-[#162423] sm:text-sm outline-none rounded-lg  w-full  text-white "
              >
                <input
                  type="text"
                  name="username"
                  className="bg-[#162423] sm:text-sm outline-none rounded-lg  w-full h-full p-2.5 text-white "
                  placeholder="Username"
                  value={form.username}
                  onChange={handleChange}
                />
                {loading && (
                  <div className="mr-2" role="status">
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
              <div
                ref={inputRefs.password}
                className="flex items-center justify-center bg-[#162423] sm:text-sm outline-none rounded-lg  w-full  text-white  "
              >
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="bg-[#162423] sm:text-sm rounded-lg outline-none block w-full p-2.5 text-white"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                />
                <button
                  className="mr-2 cursor-pointer hover:opacity-80"
                  type="button"
                  onClick={togglePasswordVisibility}
                >
                  <Image
                    src={
                      showPassword ? SVG.eyeVisiblityOn : SVG.eyeVisiblityOff
                    }
                    alt="Visible"
                    width={18}
                    height={18}
                  />
                </button>
              </div>
              <p
                ref={errorRefs.password}
                className="mt-2 text-xs  font-normal text-gray-600 base-input-message"
              ></p>
            </div>
            <div className="captcha">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={process.env["NEXT_PUBLIC_RECAPTCHA_KEY"] as string}
                onChange={handleCaptchaChange}
              />
            </div>

            <div className="flex ">
              <div>
                <input
                  type="checkbox"
                  className="mr-2 leading-tight"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
              </div>
              <span className="text-sm">
                Please agree to our{" "}
                <Link
                  href="https://gamefolio.com/terms-and-conditions"
                  className="text-blue-500"
                >
                  terms and conditions
                </Link>{" "}
                and{" "}
                <Link
                  href="https://gamefolio.com/privacy-policy"
                  className="text-blue-500"
                >
                  privacy policy
                </Link>
              </span>
            </div>

            <button
              className="w-full h-12 bg-gradient-to-b from-[#62C860] to-[#37C535] font-bold text-white text-center rounded-tl-[20px] rounded-br-[20px] rounded-tr-[5px] rounded-bl-[5px] mb-3"
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
