"use client";
import Image from "next/image";
import { SVG } from "@/assets/SVG";
import { leagueGothic } from "@/font/font";

interface AttachmentViewProps {
  handleCloseModal: () => void;
}

function AttachmentView({ handleCloseModal }: AttachmentViewProps) {
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

          <div className="relative p-4 text-center  rounded-lg  bg-[#091619] sm:p-5">
            <button
              type="button"
              className="text-white-400 absolute top-2.5 right-2.5 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-600 hover:text-white"
              data-modal-toggle="deleteAlertModal"
              onClick={() => handleCloseModal()}
            >
              <Image src={SVG.Exit} alt="exit" width={30} height={30} />
              <span className="sr-only">Close modal</span>
            </button>

            <h1
              className={`${leagueGothic.className} text-3xl mb-7  text-white`}
            >
              ATTACHMENT
            </h1>

            <div className="flex items-center divide-x divide-gray-800">
              <div className="p-4 rounded-lg sm:mb-5">
                <div className="flex flex-col items-center">
                  <Image
                    className=" my-2"
                    src={SVG.Camera}
                    alt="Camera"
                    width={50}
                    height={60}
                  />
                  <div>
                    <p className="text-sm">Open Camera</p>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:mb-5 ">
                <div className="flex flex-col items-center">
                  <Image
                    className="my-2"
                    src={SVG.Gallery}
                    alt="Gallery"
                    width={50}
                    height={60}
                  />
                  <div>
                    <p className="text-sm">Open Gallery</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AttachmentView;
