"use client";
import { SVG } from "@/assets/SVG";
import { leagueGothic } from "@/font/font";
import Image from "next/image";
import { useState } from "react";
import Modal from "./Modal";
import Report from "./Report";
import BlockPopup from "./BlockPopup";
import ShareProfile from "./ShareProfile";

interface MoreOptionProps {
  handleCloseModal: () => void;
}

function MoreOptions({ handleCloseModal }: MoreOptionProps) {
  const [modalState, setModalState] = useState({
    isProfileShareOpen: false,
    isReportModalOpen: false,
    isBlockModalOpen: false,
  });

  const handleModalToggle = (modalName: keyof typeof modalState) => {
    setModalState((prevState) => ({
      ...prevState,
      [modalName]: !prevState[modalName],
    }));
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
        <div className="modal-container w-72 sm:w-96 lg-rounded z-50 overflow-y-auto">
          {/* Modal content */}

          <div className="relative p-4 text-center rounded-lg  bg-[#091619] sm:p-5 border border-[#586769]">
            <button
              type="button"
              className="text-white-400 absolute top-2.5 right-2.5 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-600 hover:text-white"
              data-modal-toggle="deleteAlertModal"
              onClick={handleCloseModal}
            >
              <Image src={SVG.Exit} alt="exit" width={30} height={30} />
              <span className="sr-only">Close modal</span>
            </button>

            <h1
              className={`${leagueGothic.className} text-3xl mb-7  text-white`}
            >
              MORE
            </h1>

            <div
              className="text-sm text-left rounded-lg mb-3 sm:mb-5"
              onClick={() => handleModalToggle("isProfileShareOpen")}
            >
              <p className="pl-4 text-base font-semibold mb-4 hover:opacity-80 cursor-pointer text-white">
                Share this Profile
              </p>
              <hr className="border-t border-gray-600" />
            </div>
            <div
              className="text-sm text-left rounded-lg mb-3 sm:mb-5"
              onClick={() => handleModalToggle("isReportModalOpen")}
            >
              <p className="pl-4 text-base text-white font-semibold mb-4  hover:opacity-80 cursor-pointer">
                Report
              </p>
              <hr className="border-t border-gray-600" />
            </div>
            <div
              className="text-sm text-left rounded-lg sm:mb-5"
              onClick={() => handleModalToggle("isBlockModalOpen")}
            >
              <p className="pl-4 text-base text-white font-semibold mb-4  hover:opacity-80 cursor-pointer">
                Block
              </p>
              <hr className="border-t border-gray-600" />
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalState.isProfileShareOpen}
        handleClose={() => handleModalToggle("isProfileShareOpen")}
      >
        <ShareProfile
          handleCloseModal={() => handleModalToggle("isProfileShareOpen")}
        />
      </Modal>

      <Modal
        isOpen={modalState.isReportModalOpen}
        handleClose={() => handleModalToggle("isReportModalOpen")}
      >
        <Report
          handleCloseModal={() => handleModalToggle("isReportModalOpen")}
        />
      </Modal>

      <Modal
        isOpen={modalState.isBlockModalOpen}
        handleClose={() => handleModalToggle("isBlockModalOpen")}
      >
        <BlockPopup
          handleCloseModal={() => handleModalToggle("isBlockModalOpen")}
        />
      </Modal>
    </>
  );
}

export default MoreOptions;
