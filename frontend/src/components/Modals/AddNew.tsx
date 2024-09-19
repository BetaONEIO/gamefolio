"use client";
import { useState } from "react";
import Image from "next/image";
import { SVG } from "@/assets/SVG";
import { leagueGothic } from "@/font/font";
import Modal from "./Modal";
import AddClips from "./AddClips";
import AddVideo from "./AddVideo";

interface AddNewProps {
  handleCloseModal: () => void;
}

function AddNew({ handleCloseModal }: AddNewProps) {
  const [modalState, setModalState] = useState({
    isAddClipsOpen: false,
    isAddVideoOpen: false,
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
        <div className="modal-container w-120 mx-auto lg-rounded z-50 overflow-y-auto">
          {/* Modal content */}

          <div className="relative p-4 text-center  rounded-lg  bg-[#091619] sm:p-5 border border-[#586769]">
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
              ADD NEW
            </h1>

            <div className="p-2 mb-4 text-sm text-left rounded-lg sm:mb-5 bg-[#162423] hover:opacity-80 cursor-pointer">
              <div
                className="flex items-center"
                onClick={() => {
                  handleModalToggle("isAddVideoOpen");
                }}
              >
                <Image
                  className="mr-4"
                  src={SVG.Video}
                  alt="Video"
                  width={50}
                  height={60}
                />
                <div>
                  <span className="text-base font-semibold text-white">
                    Post to your Gamefolio
                  </span>
                  {/* <p className="text-white"> Description dummy text here...</p> */}
                </div>
              </div>
            </div>

            {/* <div className="p-2 mb-4 text-sm text-left rounded-lg sm:mb-5 bg-[#162423] hover:opacity-80 cursor-pointer">
              <div
                className="flex items-center"
                onClick={() => handleModalToggle("isAddClipsOpen")}
              >
                <Image
                  className=" mr-4"
                  src={SVG.Clip}
                  alt="Clip"
                  width={50}
                  height={60}
                />
                <div>
                  <span className="text-base font-semibold text-white">
                    Post Clips
                  </span>
                  <p className="text-white">Description dummy text here...</p>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalState.isAddClipsOpen}
        handleClose={() => handleModalToggle("isAddClipsOpen")}
      >
        <AddClips
          handleCloseModal={() => handleModalToggle("isAddClipsOpen")}
        />
      </Modal>

      <Modal
        isOpen={modalState.isAddVideoOpen}
        handleClose={() => handleModalToggle("isAddVideoOpen")}
      >
        <AddVideo
          handleCloseModal={() => handleModalToggle("isAddVideoOpen")}
        />
      </Modal>
    </>
  );
}

export default AddNew;
