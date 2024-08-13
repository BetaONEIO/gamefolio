"use client";
import { SVG } from "@/assets/SVG";
import { leagueGothic } from "@/font/font";
import { BASE_URL } from "@/services/api";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { toastError, toastSuccess } from "../Toast/Toast";
import { ToastContainer } from "react-toastify";
import { URL } from "url";

interface AttachmentViewProps {
  handleCloseModal: () => void;
  handleGalleryModal: (videoData: string) => void;
}
interface FileUploadState {
  fileName: string;
  percentCompleted: number;
}

function AttachmentView({
  handleCloseModal,
  handleGalleryModal,
}: AttachmentViewProps) {
  const myBGStyleModal = {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    backdropFilter: "blur(8px)",
  };
  const [video, setVideo] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const [fileUpload, setFileUpload] = useState<FileUploadState>({
    fileName: "",
    percentCompleted: 0,
  });

  const handleAttachmentView = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setSelectedVideo(file);
      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios.post(
          `${BASE_URL}/storage/video/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (progressEvent: any) => {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setFileUpload({ fileName: file.name, percentCompleted });
            },
          }
        );
        console.log("ressssL : ", response.data);
        setVideo(response.data.videoURL);
        toastSuccess(response.data.message);
        handleGalleryModal(response.data.videoURL);
      } catch (error) {
        toastError(error);
      }
    }
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
                  <div className="cursor-pointer">
                    <p className="text-sm">Open Camera</p>
                  </div>
                </div>
              </div>
              <hr className="w-full h-1 border bg-[#1B1B1B] " />
              <div className="p-2  ">
                <label htmlFor="dropzone-file">
                  <div className="flex justify-center gap-2 items-center">
                    <Image
                      className="my-2"
                      src={SVG.Gallery}
                      alt="Gallery"
                      width={50}
                      height={60}
                    />

                    <div className="flex flex-col items-center cursor-pointer">
                      <p className="text-sm">Open Gallery</p>
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      accept="video/*"
                      onChange={handleAttachmentView}
                    />
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </>
  );
}

export default AttachmentView;
