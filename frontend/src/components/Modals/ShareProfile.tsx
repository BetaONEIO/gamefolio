"use client";
import { SVG } from "@/assets/SVG";
import { IMAGES } from "@/assets/images";
import { leagueGothic } from "@/font/font";
import Image from "next/image";
import { useState } from "react";

interface ShareProfileProps {
  handleCloseModal: () => void;
}

function ShareProfile({ handleCloseModal }: ShareProfileProps) {
  const initialCheckboxes = [
    { id: 1, isChecked: false },
    { id: 2, isChecked: false },
    { id: 3, isChecked: false },
    { id: 4, isChecked: false },
    { id: 5, isChecked: false },
    { id: 6, isChecked: false },
    { id: 7, isChecked: false },
    { id: 8, isChecked: false },
    { id: 9, isChecked: false },
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
        <div className="modal-container sm:w-96 mx-auto lg:w-4/12 z-50 overflow-y-auto">
          {/* Modal content */}

          <div className="relative text-center rounded-lg bg-[#091619] py-3 px-3 sm:py-4 sm:px-8 border border-[#586769]">
            <button
              type="button"
              className="text-white-400 absolute top-2.5 right-2.5 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-600 hover:text-white"
              onClick={handleCloseModal}
            >
              <Image src={SVG.Exit} alt="exit" width={30} height={30} />
              <span className="sr-only">Close modal</span>
            </button>

            <h1
              className={`${leagueGothic.className} text-center text-3xl mb-5  text-white`}
            >
              SHARE PROFILE
            </h1>
            <div className="bg-[#1C2C2E] flex gap-2 p-3  sm:p-3 items-center w-full rounded-lg overflow-hidden">
              <Image src={SVG.Search} alt="logo" width={24} height={24} />
              <input
                className="bg-[#1C2C2E] outline-none text-white"
                placeholder="Search"
              />
            </div>

            <div className="flex flex-col w-full sm:min-h-[350px] lg:min-h-[500px] max-h-[400px] sm:max-h-[350px] lg:max-h-[500px] overflow-y-auto no-scrollbar">
              {checkboxes.map((checkbox) => (
                <div key={checkbox.id}>
                  <div className="flex items-center my-3">
                    <Image
                      className="object-contain"
                      src={IMAGES.Profile}
                      alt="Profile"
                      width={50}
                      height={50}
                    />
                    <div className="flex items-center justify-between w-full sm:w-full">
                      <div>
                        <span className="ml-2 sm:ml-4 text-sm sm:text-base">
                          Mark Johnson
                        </span>
                        <p className="ml-2 sm:ml-4 text-sm text-left">
                          john_smith
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
                  <hr className="border-t border-[#162423]" />
                </div>
              ))}
            </div>

            <div className="flex items-center  justify-between w-full my-3">
              <span className="text-white"> 3 Selected</span>
              <button className="font-bold w-40 sm:w-1/3 h-10 sm:h-6/12 text-base sm:text-base bg-[#37C535] text-white text-center  sm:py-[7px] rounded-tl-[20px] sm:rounded-tl-[20px] rounded-br-[20px] sm:rounded-br-[20px] rounded-tr-[5px] sm:rounded-tr-[5px] rounded-bl-[5px] sm:rounded-bl-[5px] hover:opacity-80">
                Share Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShareProfile;
