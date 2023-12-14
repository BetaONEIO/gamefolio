"use client";
import Link from "next/link";
import { IMAGES } from "@/assets/images";
import { SVG } from "@/assets/SVG";
import Image from "next/image";
import { BASE_URL2 } from "@/services/api";

const LandingPage = () => {
  const backgroundImage = `url(${IMAGES.bgImage})`;

  return (
    <section
      style={{
        background: `linear-gradient(to bottom, transparent 40%, rgba(0, 0, 0, 0.9) 60%), ${backgroundImage}`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="bg-no-repeat bg-cover bg-center bg-gray-700 bg-blend-multiply bg-opacity-60 min-h-screen flex flex-col justify-center"
    >
      <div className="flex flex-col items-center justify-center px-6 py-8">
        <Image
          className="mb-20"
          src={IMAGES.logo}
          alt="logo"
          width={150}
          height={150}
          priority
          style={{ width: "150px", height: "150px" }}
        />

        <button className="w-80 h-[50] bg-[#30A55A] text-white text-center py-[10px] px-[30px] rounded-tl-[20px] rounded-br-[20px] rounded-tr-[5px] rounded-bl-[5px] mb-3">
          <div className="flex items-center gap-2">
            <Image src={SVG.Email} alt="Email" width={20} height={20} />
            <Link href={"/signup"}>Continue with Email</Link>
          </div>
        </button>

        <button className="w-80 h-[50] bg-[#4076E4] text-white text-center py-[10px] px-[30px] rounded-tl-[20px] rounded-br-[20px] rounded-tr-[5px] rounded-bl-[5px] mb-3">
          <div className="flex items-center gap-2">
            <Image src={SVG.Google} alt="Email" width={20} height={20} />
            <Link href={`${BASE_URL2}/auth/google`}>Continue with Google</Link>
          </div>
        </button>

        <button className="w-80 h-[50] bg-[#3C599F] text-white text-center py-[10px] px-[30px] rounded-tl-[20px] rounded-br-[20px] rounded-tr-[5px] rounded-bl-[5px] mb-3">
          <div className="flex items-center gap-2">
            <Image
              src={SVG.Facebook}
              alt="Email"
              width={20}
              height={20}
              style={{ width: "20px", height: "20px" }}
            />
            <Link href={`${BASE_URL2}/auth/facebook`}>Login with Facebook</Link>
          </div>
        </button>

        <button className="w-80 h-[50] bg-[#32CCFE] text-white text-center py-[10px] px-[30px] rounded-tl-[20px] rounded-br-[20px] rounded-tr-[5px] rounded-bl-[5px] mb-3">
          <div className="flex items-center gap-2">
            <Image src={SVG.Twitter} alt="Email" width={20} height={20} />
            <Link href={`${BASE_URL2}/auth/twitter`}>Login with twitter</Link>
          </div>
        </button>

        <p className="text-sm font-light text-center text-gray-500 dark:text-gray-300">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-medium text-primary-600 hover:underline dark:text-primary-500 dark:text-green-400"
          >
            Login
          </a>
        </p>
      </div>
    </section>
  );
};

export default LandingPage;
