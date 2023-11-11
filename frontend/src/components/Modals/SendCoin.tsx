"use client";
import { SVG } from "@/assets/SVG";
import { leagueGothic } from "@/font/font";
import Image from "next/image";
import React, { useEffect, useState } from "react";

function SendCoin() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const element = document.getElementById("updateProductButton");
      if (element) {
        element.addEventListener("click", handleUpdateButtonClick);
        return () => {
          element.removeEventListener("click", handleUpdateButtonClick);
        };
      }
    }
  }, []);

  const handleUpdateButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex justify-center m-5">
        <button
          id="updateProductButton"
          className="block text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-[#091619] dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          type="button"
          onClick={handleUpdateButtonClick}
        >
          Update product
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-container sm:w-96 mx-auto lg:w-3/12 z-50 overflow-y-auto">
            {/* Modal content */}

            <div className="relative p-4 text-center bg-white rounded-lg  dark:bg-[#091619] sm:p-5 border dark:border-[#586769]">
              <button
                type="button"
                className="text-white-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="deleteAlertModal"
                onClick={handleCloseModal}
              >
                <Image src={SVG.Exit} alt="exit" width={30} height={30} />
                <span className="sr-only">Close modal</span>
              </button>

              <h1
                className={`${leagueGothic.className} text-center text-3xl mb-5  dark:text-white`}
              >
                SEND COIN
              </h1>

              <div className="justify-center items-center block">
                <button className="w-12 h-12 m-2 dark:bg-[#162423] rounded-lg">
                  1
                </button>
                <button className="w-12 h-12 m-2 dark:bg-[#162423] rounded-lg">
                  3
                </button>
                <button className="w-12 h-12 m-2 dark:bg-[#162423] rounded-lg">
                  5
                </button>
                <button className="w-12 h-12 m-2 dark:bg-[#162423] rounded-lg">
                  7
                </button>

                <div className="justify-center items-center block">
                  <button className="w-12 h-12 m-2 dark:bg-[#162423] rounded-lg">
                    8
                  </button>
                  <button className="w-12 h-12 m-2 dark:bg-[#162423] rounded-lg">
                    9
                  </button>
                  <button className="w-12 h-12 m-2 dark:bg-[#162423] rounded-lg">
                    10
                  </button>
                </div>
              </div>

              <hr className="border-t border-gray-700 my-4" />

              <div className="flex justify-center items-center">
                <input
                  name="number"
                  id="number"
                  className="mb-1 w-72 bg-gray-50 text-gray-900 sm:text-sm outline-none rounded-lg block py-4 px-4 dark:bg-[#162423] dark:placeholder-gray-400 dark:text-white"
                  placeholder="Or Enter manually"
                  required
                />
              </div>

              <hr className="border-t border-gray-700 my-4" />

              <button className="w-40 h-10 bg-[#37C535] text-white text-center rounded-tl-[20px] rounded-br-[20px] rounded-tr-[5px] rounded-bl-[5px] mb-3">
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SendCoin;
