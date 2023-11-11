"use client";
import { SVG } from "@/assets/SVG";
import { leagueGothic } from "@/font/font";
import Image from "next/image";
import { useState } from "react";

interface ReportProps {
  handleCloseModal: () => void;
}

function Report({ handleCloseModal }: ReportProps) {
  const [selectedOption, setSelectedOption] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const optionsForGame = [
    { value: "Explicit Content", label: "Explicit Content" },
    { value: "Abusive Post", label: "Abusive Post" },
    { value: "Irrelevant Post", label: "Irrelevant Post" },
    { value: "Repetitive Post", label: "Repetitive Post" },
  ];

  const handleSelect = (value: any) => {
    setSelectedOption(value);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="modal-container w-full sm:w-96 mx-auto lg-rounded z-50 overflow-y-auto">
          {/* Modal content */}
          <div className="relative p-4 text-center rounded-lg dark:bg-[#091619] sm:p-5 border dark:border-[#586769]">
            <button
              type="button"
              className="text-white-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="deleteAlertModal"
              onClick={handleCloseModal}
            >
              <Image src={SVG.Exit} alt="Close modal" width={30} height={30} />
              <span className="sr-only">Close modal</span>
            </button>

            <h1
              className={`${leagueGothic.className} text-3xl mb-7  dark:text-white`}
            >
              REPORT
            </h1>

            <div className="relative mb-4">
              <div className="relative inline-block text-left">
                <div className="relative">
                  <span className="rounded-md shadow-sm">
                    <button
                      onClick={toggleDropdown}
                      type="button"
                      className="inline-flex justify-between w-80 px-4 py-2 text-gray-700  dark:bg-[#1C2C2E] dark:border-gray-700 dark:text-white dark:hover:bg-[#1C2C2E] dark:rounded-lg"
                      aria-selected={true}
                    >
                      {selectedOption || "Select Reason"}
                      <Image
                        className="ml-2"
                        src={SVG.Dropdown}
                        alt="Dropdown"
                        width={25}
                        height={25}
                      />
                    </button>
                  </span>
                </div>

                {isDropdownOpen && (
                  <div className="absolute z-50 mt-2 w-full rounded-md shadow-lg">
                    <ul className="py-1 border  dark:bg-[#1C2C2E] dark:border-gray-700 dark:text-white dark:border-t-0 dark:rounded-b-lg">
                      {optionsForGame.map((option) => (
                        <li
                          key={option.value}
                          onClick={() => handleSelect(option.value)}
                          className="cursor-pointer select-none relative px-4 py-2 text-gray-50"
                          role="option"
                          aria-selected={false}
                        >
                          <span
                            className={`${
                              option.value === selectedOption
                                ? "font-semibold"
                                : ""
                            } block truncate`}
                          >
                            {option.label}
                          </span>
                          {option.value === selectedOption && (
                            <Image
                              className="absolute text-green-500 right-3 top-2/4 transform -translate-y-2/4"
                              src={SVG.Tick}
                              alt="Selected"
                              width={20}
                              height={20}
                            />
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="mb-4 sm:col-span-2">
              <textarea
                id="description"
                className="inline-flex justify-between  p-2.5 w-80 h-28 text-sm text-gray-900 outline-none rounded-lg dark:bg-[#1C2C2E] dark:text-white"
                placeholder="Type here report reason..."
              ></textarea>
            </div>
            <button className="font-bold justify-between w-80 h-12 bg-[#37C535] text-white text-center rounded-tl-[20px] rounded-br-[20px] rounded-tr-[5px] rounded-bl-[5px] mb-3">
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Report;
