import { IMAGES } from "@/assets/images";
import { leagueGothic } from "@/font/font";
import Image from "next/image";

const ForgetPassword = () => {
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
          <h1 className={`${leagueGothic.className} text-4xl`}>
            FORGOT PASSWORD
          </h1>
          <hr className="w-7 border-t-4 border-[#43DD4E] rounded-lg" />

          <p className="text-sm font-medium">
            Please enter your registered email <br /> address to reset the
            password.
          </p>

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
              id="email"
              className="bg-[#162423] sm:text-sm outline-none rounded-lg block w-full p-3 text-white"
              placeholder="Email Address"
              required
            />
          </div>

          <button className="w-full h-12 bg-[#37C535] text-white text-center rounded-tl-[20px] rounded-br-[20px] rounded-tr-[5px] rounded-bl-[5px] mb-3">
            Send
          </button>

          <p className="text-sm font-light text-center text-gray-50">
            Go back to{" "}
            <a
              href="/login"
              className="font-medium text-primary-600 hover:underline text-[#43DD4E]"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ForgetPassword;
