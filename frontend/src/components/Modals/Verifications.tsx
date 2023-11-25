"use client";
import { SVG } from "@/assets/SVG";
import { IMAGES } from "@/assets/images";
import { leagueGothic } from "@/font/font";
import Image from "next/image";
import { useState } from "react";

interface VerificationProps {
  handleCloseModal: () => void;
}

function Verifications({ handleCloseModal }: VerificationProps) {
  const initialCheckboxes = [
    { id: 1, isChecked: false },
    { id: 2, isChecked: false },
    { id: 3, isChecked: false },
    { id: 4, isChecked: false },
  ];

  const [checkboxes, setCheckboxes] = useState(initialCheckboxes);

  const handleCheckboxClick = (id: any) => {
    const updatedCheckboxes = checkboxes.map((checkbox) =>
      checkbox.id === id
        ? { ...checkbox, isChecked: !checkbox.isChecked }
        : checkbox
    );
    setCheckboxes(updatedCheckboxes);
  };

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
        <div className="modal-container sm:w-96 lg:w-1/3 lg-rounded z-50 ">
          {/* Modal content */}
          <div className="relative text-center bg-white rounded-lg dark:bg-[#091619] py-2 sm:py-4 px-6 sm:px-10 border dark:border-[#586769]">
            <button
              type="button"
              className="text-white-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={handleCloseModal}
            >
              <Image src={SVG.Exit} alt="exit" width={30} height={30} />
              <span className="sr-only">Close modal</span>
            </button>

            <h1
              className={`${leagueGothic.className} text-center text-3xl mb-5  dark:text-white`}
            >
              VERIFICATIONS
            </h1>

            <div className="flex flex-col w-full no-scrollbar overflow-scroll ">
              {checkboxes.map((checkbox) => (
                <div key={checkbox.id}>
                  <div className="flex items-center my-3">
                    <Image
                      className="w-12 h-12 rounded-lg object-contain"
                      src={IMAGES.Profile}
                      alt="Profile"
                      width={20}
                      height={20}
                      sizes="100vw"
                    />
                    <div className="flex items-center justify-between w-full sm:w-full ml-2 sm:ml-4">
                      <div>
                        <p className="text-left font-bold text-sm sm:text-base">
                          Twitch
                        </p>
                        <p className="text-left text-xs">
                          Verification Completed
                        </p>
                      </div>
                      <div>
                        <Image
                          src={checkbox.isChecked ? SVG.Tick : SVG.Untick}
                          alt="logo"
                          onClick={() => handleCheckboxClick(checkbox.id)}
                          className={`text-green-500 ${
                            checkbox.isChecked ? "cursor-pointer" : ""
                          }`}
                          width={20}
                          height={20}
                        />
                      </div>
                    </div>
                  </div>
                  <hr className="border-t border-gray-600" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Verifications;
