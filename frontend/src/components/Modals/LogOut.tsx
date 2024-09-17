"use client";
import { useRouter } from "next/navigation";
import { leagueGothic } from "@/font/font";
import { ROUTES } from "@/labels/routes";
import { removeCookie, removeFromLocal } from "@/utils/localStorage";

interface LogOutProps {
  handleCloseModal: () => void;
}

function LogOut({ handleCloseModal }: LogOutProps) {
  const router = useRouter();
  const myBGStyleModal = {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    backdropFilter: "blur(8px)",
  };

  // handle logout
  const handleLogout = () => {
    removeCookie("connect.sid", process.env.NEXT_PUBLIC_CONNECT_SID_DOMAIN);
    removeCookie("gfoliotoken", process.env.NEXT_PUBLIC_GFOLIO_TOKEN_DOMAIN);
    removeFromLocal("@token");
    removeFromLocal("@userData");

    router.replace(ROUTES.login);
  };

  return (
    <>
      <div
        style={myBGStyleModal}
        className="fixed inset-0 flex items-center justify-center z-50"
      >
        <div className="modal-container w-[410px] mx-auto lg-rounded z-50">
          {/* Modal content */}

          <div className="relative text-center justify-center rounded-lg bg-[#091619] p-5 sm:p-5 border border-[#586769]">
            <h1
              className={`${leagueGothic.className} text-3xl mb-7 text-white`}
            >
              LOG OUT
            </h1>

            <div className="w-full mb-4 sm:mb-5">
              <p className="text-md text-gray-50">
                Are you sure you want to logout?
              </p>
            </div>

            <div className="flex flex-col items-center mb-2 sm:mb-2">
              <button
                className="w-1/2 h-[50] font-bold bg-[#162423] text-white text-center py-[10px] px-[30px] rounded-tl-[20px] rounded-br-[20px] rounded-tr-[5px] rounded-bl-[5px] mb-3"
                onClick={handleLogout}
              >
                Yes
              </button>
              <button
                className="w-1/2 h-[50] font-bold bg-gradient-to-b from-[#62C860] to-[#37C535] text-white text-center py-[10px] px-[30px] rounded-tl-[20px] rounded-br-[20px] rounded-tr-[5px] rounded-bl-[5px]"
                onClick={handleCloseModal}
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LogOut;
