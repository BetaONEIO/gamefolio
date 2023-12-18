import { IMAGES } from "@/assets/images";
import { leagueGothic } from "@/font/font";
import Image from "next/image";

const ResetPassword = () => {
  return (
    <section className=" bg-[#091619] min-h-screen flex flex-col justify-center">
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
            RESET PASSWORD
          </h1>
          <hr className="w-8 border-t-4 border-[#43DD4E] rounded-lg" />

          <p className="text-sm font-normal text-gray-300">
            Please set your new password below <br /> for future login into the
            app.
          </p>

          <hr className="border-t border-gray-600 my-4" />
          <form className="space-y-4 md:space-y-6" action="#">
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium  text-white"
              >
                New Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="bg-[#162423] sm:text-sm rounded-lg outline-none block w-full p-3 text-white"
                placeholder="New Password"
                required
              />
            </div>

            <div>
              <label
                htmlFor="resetPassword"
                className="block mb-2 text-sm font-medium  text-white"
              >
                Repeat New Password
              </label>
              <input
                type="password"
                name="resetPassword"
                id="resetPassword"
                className="bg-[#162423] sm:text-sm rounded-lg outline-none block w-full p-3 text-white"
                placeholder="Confirm New Password"
                required
              />
            </div>

            <button className="w-full h-12 bg-[#37C535] text-white text-center rounded-tl-[20px] rounded-br-[20px] rounded-tr-[5px] rounded-bl-[5px] mb-3">
              Save
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
