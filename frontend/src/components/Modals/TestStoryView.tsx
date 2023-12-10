"use client";
import { SVG } from "@/assets/SVG";
import { leagueGothic } from "@/font/font";
import Image from "next/image";
import { useState } from "react";

interface AddNewProps {
  handleCloseModal: () => void; // Define handleCloseModal as a function
}

function TestStoryView({ handleCloseModal }: AddNewProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const myBGStyleModal = {
    backgroundColor: "rgba(0, 0, 0, 1)",
  };

  return (
    <>
      <div
        style={myBGStyleModal}
        className="fixed inset-0 flex items-center justify-center z-50"
      >
        <div className="modal-container w-120 mx-auto lg-rounded z-50 overflow-y-auto">
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
              className={`${leagueGothic.className} text-3xl mb-7  dark:text-white`}
            >
              ADD NEW
            </h1>

            <div className="p-2 mb-4 text-sm text-left rounded-lg sm:mb-5 dark:bg-[#162423] ">
              <div className="flex items-center">
                <Image
                  className="mr-4"
                  src={SVG.Video}
                  alt="Video"
                  width={50}
                  height={60}
                />
                <div>
                  <span className="text-base font-semibold">Post Video</span>
                  <p>Description dummy text here...</p>
                </div>
              </div>
            </div>

            <div className="p-2 mb-4 text-sm text-left rounded-lg sm:mb-5 dark:bg-[#162423]">
              <div className="flex items-center">
                <Image
                  className=" mr-4"
                  src={SVG.Clip}
                  alt="Clip"
                  width={50}
                  height={60}
                />
                <div>
                  <span className="text-base font-semibold">Post Clips</span>
                  <p>Description dummy text here...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TestStoryView;
