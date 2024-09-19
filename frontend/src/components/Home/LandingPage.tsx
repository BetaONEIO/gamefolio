"use client";
import { SVG } from "@/assets/SVG";
import { IMAGES } from "@/assets/images";
import { ROUTES } from "@/labels/routes";
import { BASE_URL2 } from "@/services/api";
import { getCookieValue, getFromLocal } from "@/utils/localStorage";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import CustomBackground from "../CustomBackground/custombackground";

const LandingPage = () => {
  const router = useRouter();

  // If user is already login, redirect to main
  useEffect(() => {
    if (getFromLocal("@token") || getCookieValue("gfoliotoken")) {
      router.replace(ROUTES.main);
    } else {
      router.replace(ROUTES.landingPage);
    }
  }, []);

  return (
    <CustomBackground>
      <div className="flex flex-col items-center justify-center px-6 py-8  ">
        <div className="p-6 space-y-4 sm:p-8 w-96 bg-[#091619] rounded-xl border border-[#1C2C2E]">
          <div className="flex justify-center items-center">
            <Image
              className="mb-20"
              src={IMAGES.logo}
              alt="logo"
              width={150}
              height={150}
              priority
              style={{ width: "150px", height: "150px" }}
            />
          </div>

          <button className="w-80 h-[50] bg-[#30A55A] text-white text-center py-[10px] px-[30px] rounded-tl-[20px] rounded-br-[20px] rounded-tr-[5px] rounded-bl-[5px] mb-3">
            <div className="flex items-center gap-2">
              <Image src={SVG.Email} alt="Email" width={20} height={20} />
              <Link href={"/signup"}>Continue with Email</Link>
            </div>
          </button>

          <button className="w-80 h-[50] bg-[#4076E4] text-white text-center py-[10px] px-[30px] rounded-tl-[20px] rounded-br-[20px] rounded-tr-[5px] rounded-bl-[5px] mb-3">
            <div className="flex items-center gap-2">
              <Image src={SVG.Google} alt="Email" width={20} height={20} />
              <Link href={`${BASE_URL2}/auth/google`}>
                Continue with Google
              </Link>
            </div>
          </button>

          <button className="w-80 h-[50] bg-[#32CCFE] text-white text-center py-[10px] px-[30px] rounded-tl-[20px] rounded-br-[20px] rounded-tr-[5px] rounded-bl-[5px] mb-3">
            <div className="flex items-center gap-2">
              <Image src={SVG.Twitter} alt="Email" width={20} height={20} />
              <Link href={`${BASE_URL2}/auth/twitter`}>
                Login with Twitter/X
              </Link>
            </div>
          </button>

          <p className="text-sm font-light text-center text-gray-300">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-medium text-primary-600 hover:underline text-primary-500 text-green-400"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </CustomBackground>
  );
};

export default LandingPage;
