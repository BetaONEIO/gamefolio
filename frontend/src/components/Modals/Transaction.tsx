"use client";
import { SVG } from "@/assets/SVG";
import { leagueGothic } from "@/font/font";
import Image from "next/image";
import { useEffect, useState } from "react";

function Transaction() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const initialCoins = [
    { id: 1, coin: 3 },
    { id: 2, coin: 1 },
    { id: 3, coin: 4 },
    { id: 4, coin: 2 },
    { id: 5, coin: 5 },
    { id: 6, coin: 4 },
    { id: 7, coin: 2 },
    { id: 8, coin: 5 },
  ];

  const [coins, setCoins] = useState(initialCoins);

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
          <div className="modal-container sm:w-96 lg:w-4/12 mx-auto z-50 overflow-y-auto">
            <div className="relative text-center bg-white rounded-lg dark:bg-[#091619] p-3 sm:p-6 border dark:border-[#586769]">
              <button
                type="button"
                className="text-white-400 absolute top-3.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={handleCloseModal}
              >
                <Image src={SVG.Exit} alt="exit" width={30} height={30} />
                <span className="sr-only">Close modal</span>
              </button>

              <h1
                className={`${leagueGothic.className} text-center text-3xl mb-5 dark:text-white`}
              >
                TRANSACTION HISTORY
              </h1>

              <div className="flex gap-6 p-3 sm:p-3 justify-center w-full rounded-lg overflow-hidden">
                <div>
                  <p className="mx-2 sm:mx-4 text-sm font-light text-left text-[#787F80]">
                    From Date
                  </p>
                  <p className="mx-2 sm:mx-4 text-sm font-bold sm:text-base">
                    1 Mar, 2022
                  </p>
                </div>
                <Image
                  className="object-contain"
                  src={SVG.Arrow}
                  alt="Arrow"
                  width={30}
                  height={30}
                />
                <div>
                  <p className="mx-2 sm:mx-4 text-sm font-light text-left text-[#787F80]">
                    To Date
                  </p>
                  <p className="mx-2 sm:mx-4 text-sm font-bold sm:text-base">
                    30 Mar, 2022
                  </p>
                </div>
              </div>

              <div className="flex flex-col w-full sm:min-h-[350px] lg:min-h-[500px] max-h-[400px] sm:max-h-[350px] lg:max-h-[500px] overflow-y-auto no-scrollbar">
                {coins.map((coin) => (
                  <div key={coin.id}>
                    <div className="flex items-center my-3">
                      <Image
                        className="object-contain"
                        src={SVG.Coin}
                        alt="Profile"
                        width={50}
                        height={50}
                      />
                      <div className="flex items-center justify-between w-full sm:w-full">
                        <div>
                          <p className="mx-2 sm:mx-4 text-sm font-light sm:text-base">
                            Spend to John Smith
                          </p>
                          <p className="mx-2 sm:mx-4 text-sm font-light text-left text-[#7C7F80]">
                            22 Mar, 2022 - 3:20 PM
                          </p>
                        </div>
                        <div>
                          <p>{coin.coin} Coin</p>
                        </div>
                      </div>
                    </div>
                    <hr className="border-t border-[#343434]" />
                  </div>
                ))}
              </div>

              <div className="flex items-center w-full my-5">
                <button className="w-full sm:text-base font-semibold bg-[#37C535] py-[10px] px-[30px] text-white text-center rounded-tl-[20px] rounded-br-[20px] rounded-tr-[5px] rounded-bl-[5px]">
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Transaction;
