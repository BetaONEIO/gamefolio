"use client";
import { useState } from "react";
import Image from "next/image";
import { SVG } from "@/assets/SVG";
import { leagueGothic } from "@/font/font";

interface FeedBackProps {
  handleCloseModal: () => void;
}

function FeedBack({ handleCloseModal }: FeedBackProps) {
  const [selectedOption, setSelectedOption] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const myBGStyleModal = {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    backdropFilter: "blur(8px)",
  };

  const optionsForReason = [
    { value: "Bug Report", label: "Bug Report" },
    { value: "Feature Suggestion", label: "Feature Suggestion" },
    { value: "Other", label: "Other" },
  ];

  const handleSelect = (value: any) => {
    setSelectedOption(value);
    setIsDropdownOpen(false);
  };

  const [text, setText] = useState("");
  const maxLength = 100;

  const handleChange = (event: any) => {
    const newText = event.target.value;
    if (newText.length <= maxLength) {
      setText(newText);
    }
  };

  const wordLimitClassName =
    text.length > maxLength ? "text-red-500" : "text-green-500";

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
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
            <button
              type="button"
              className="text-white-400 absolute top-2.5 right-2.5 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-600 hover:text-white"
              onClick={handleCloseModal}
            >
              <Image src={SVG.Exit} alt="exit" width={30} height={30} />
              <span className="sr-only">Close modal</span>
            </button>

            <h1
              className={`${leagueGothic.className} text-3xl mb-2 text-white`}
            >
              SEND FEEDBACK
            </h1>

            <div className="relative mb-4">
              <div className="relative inline-block text-left">
                <p className="text-xs font-semibold text-center my-4 text-gray-50">
                  Feel Free to share your Feedback with us.
                </p>
                <div className="relative">
                  <span className="rounded-md shadow-sm">
                    <button
                      onClick={toggleDropdown}
                      type="button"
                      className="inline-flex justify-between w-80 px-4 py-2 bg-[#1C2C2E] border-gray-700 text-white hover:bg-[#1C2C2E] rounded-lg"
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
                    <ul className="py-1 border bg-[#1C2C2E] border-gray-700 text-white border-t-0 rounded-b-lg">
                      {optionsForReason.map((option) => (
                        <li
                          key={option.value}
                          onClick={() => handleSelect(option.value)}
                          className="cursor-pointer select-none relative px-4 py-2 text-gray-50 hover:bg-primary-500 hover:text-white focus:bg-primary-500 focus:text-white"
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
              <div className="relative">
                <textarea
                  id="description"
                  className="inline-flex justify-between p-2.5 w-80 h-28 text-sm outline-none rounded-lg bg-[#1C2C2E] text-white"
                  placeholder="Type here report reason..."
                  value={text}
                  onChange={handleChange}
                ></textarea>
                <p
                  className={`absolute right-7 bottom-2 ${wordLimitClassName}`}
                >
                  {text.length}/{maxLength} words
                </p>
              </div>
            </div>
            <button className="font-bold justify-between w-80 h-12 bg-[#37C535] text-white text-center rounded-tl-[20px] rounded-br-[20px] rounded-tr-[5px] rounded-bl-[5px] mb-3">
              Send feedback
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default FeedBack;
