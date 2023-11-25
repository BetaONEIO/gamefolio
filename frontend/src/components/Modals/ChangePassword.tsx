"use client";
import { SVG } from "@/assets/SVG";
import { leagueGothic } from "@/font/font";
import Image from "next/image";

interface ChangePasswordProps {
  handleCloseModal: () => void;
}

function ChangePassword({ handleCloseModal }: ChangePasswordProps) {
  const myBGStyleModal = {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    backdropFilter: "blur(8px)",
  };

  return (
    <>
      <div
        style={myBGStyleModal}
        className="fixed inset-0 flex items-center justify-center z-50"
      >
        <div className="modal-container w-full sm:w-2/3 md:w-1/2 lg:w-1/4 mx-auto lg-rounded z-50 overflow-y-auto">
          {/* Modal content */}

          <div className="relative p-4  bg-white rounded-lg  dark:bg-[#091619] sm:p-5 border dark:border-[#586769]">
            <button
              type="button"
              className="text-white-400 absolute top-3.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="deleteAlertModal"
              onClick={handleCloseModal}
            >
              <Image src={SVG.Exit} alt="exit" width={30} height={30} />
              <span className="sr-only">Close modal</span>
            </button>

            <h1
              className={`${leagueGothic.className} text-3xl mb-7 text-center  dark:text-white`}
            >
              CHANGE PASSWORD
            </h1>

            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
                >
                  Old Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="bg-[#162423] sm:text-sm rounded-lg outline-none block w-full p-3 dark:text-white"
                  placeholder="Password"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
                >
                  New Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="bg-[#162423] sm:text-sm rounded-lg outline-none block w-full p-3 dark:text-white"
                  placeholder="Password"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
                >
                  Repeat New Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="bg-[#162423] sm:text-sm rounded-lg outline-none block w-full p-3 dark:text-white"
                  placeholder="Password"
                  required
                />
              </div>

              <button className="w-full font-bold h-[50] bg-[#37C535] text-white text-center py-[10px] px-[30px] rounded-tl-[20px] rounded-br-[20px] rounded-tr-[5px] rounded-bl-[5px] mb-3">
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChangePassword;
