"use client";
import { SVG } from "@/assets/SVG";
import { leagueGothic } from "@/font/font";
import Image from "next/image";

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
      <div className="absolute bottom-16 left-0 flex items-center justify-center z-50">
        <div className="modal-container w-full mx-auto lg-rounded z-50 overflow-y-auto">
          {/* Modal content */}

          <div className="relative p-4 text-center bg-white rounded-lg  dark:bg-[#1C2C2E] sm:p-5">
            {/* <button
              type="button"
              className="text-white-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="deleteAlertModal"
              onClick={() => handleCloseModal()}
            >
              <Image src={SVG.Exit} alt="exit" width={30} height={30} />
              <span className="sr-only">Close modal</span>
            </button> */}

            <div className="flex flex-col  items-center divide-x divide-gray-800">
              <div className=" p-2 rounded-lg ">
                <div className="flex justify-center gap-2 items-center">
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
              <hr className="w-full h-1 border bg-[#1B1B1B] " />
              <div className="p-2  ">
                <div className="flex justify-center gap-2 items-center">
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
