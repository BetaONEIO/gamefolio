"use client";
import { SVG } from "@/assets/SVG";
import Image from "next/image";
import { ToastContainer } from "react-toastify";
import Setting from "../page";

const Verification = () => {
  const VERIFICATION_DATA = [
    {
      id: 1,
      name: "Twitch",
      status: "Verification Completed",
      icon: SVG.Twitch,
      isVerified: true,
    },
    {
      id: 2,
      name: "PlayStation Network",
      status: "Verification Completed",
      icon: SVG.PlayStation,
      isVerified: true,
    },
    {
      id: 3,
      name: "DirectX Box",
      status: "Connect your account with Gamefolio for verification",
      icon: SVG.Xbox,
      isVerified: false,
    },
    {
      id: 4,
      name: "Steam",
      status: "Connect your account with Gamefolio for verification",
      icon: SVG.Steam,
      isVerified: false,
    },
    {
      id: 5,
      name: "Kick",
      status: "Connect your account with Gamefolio for verification",
      icon: SVG.Steam,
      isVerified: false,
    },
  ];
  return (
    <Setting>
      {/* Header */}

      <div className="flex flex-col justify-between px-6 py-8  lg:py-0 h-full">
        <div className="flex flex-col w-full ">
          <div className="flex justify-start items-center mb-6">
            <span className="block font-bold mb-2 text-lg text-white">
              Verification
            </span>
          </div>
          <div className="flex w-full flex-wrap gap-4 justify-start">
            {VERIFICATION_DATA.map((data, index) => (
              <div className="flex flex-col w-full" key={index}>
                <div className="flex flex-col items- justify-center md:flex-row md:items-center md:justify-between gap-4 flex-1 basis-full p-2">
                  <div className="flex gap-4">
                    <div>
                      <Image
                        src={data.icon}
                        alt="Platform Icon"
                        width={42}
                        height={42}
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold">{data.name}</span>
                      <div className="flex gap-1">
                        <span className="text-xs md:text-sm text-gray-400">
                          {data.status}
                        </span>
                        {data.isVerified && (
                          <Image
                            src={SVG.Tick}
                            alt="Tick"
                            width={16}
                            height={16}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  {!data.isVerified && (
                    <div>
                      <button className="flex gap-2 items-center justify-center text-xs text-white font-bold px-4 py-3 bg-[#43DD4E] rounded-lg  ">
                        Connect
                        <Image
                          src={SVG.Send}
                          alt="Send"
                          width={24}
                          height={24}
                        />
                      </button>
                    </div>
                  )}
                </div>
                <hr className="w-full border m-2 bg-gray-300 opacity-10" />
              </div>
            ))}
          </div>
        </div>
      </div>
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
    </Setting>
  );
};

export default Verification;
