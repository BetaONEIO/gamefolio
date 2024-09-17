"use client";
import { SVG } from "@/assets/SVG";
import { IMAGES } from "@/assets/images";
import { leagueGothic } from "@/font/font";
import { generateUniqueRoomId } from "@/utils/helpers";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toastError, toastSuccess } from "../Toast/Toast";

import { dispatch } from "@/store";
import { initChat } from "@/store/slices/chatSlice";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
interface GalleryProps {
  receiverID: string;
  galleryVideo: string;
  handleCloseModal: () => void;
}
function Gallery({ receiverID, galleryVideo, handleCloseModal }: GalleryProps) {
  const authState = useSelector((state: any) => state.auth.userData) || [];
  const popular = [
    { id: 1, IMAGE: IMAGES.Popular },
    { id: 2, IMAGE: IMAGES.Popular1 },
    { id: 3, IMAGE: IMAGES.Popular1 },
    { id: 4, IMAGE: IMAGES.Popular },
    { id: 5, IMAGE: IMAGES.Popular1 },
    { id: 6, IMAGE: IMAGES.Popular1 },
    { id: 7, IMAGE: IMAGES.Popular },
    { id: 8, IMAGE: IMAGES.Popular1 },
    { id: 9, IMAGE: IMAGES.Popular1 },
    { id: 10, IMAGE: IMAGES.Popular1 },
  ];
  const router = useRouter();

  const [checkboxes, setCheckboxes] = useState(
    popular?.map((game) => ({ id: game.id, isChecked: false }))
  );

  const handleCheckboxClick = (id: any) => {
    const updatedCheckboxes = checkboxes?.map((checkbox) =>
      checkbox.id === id
        ? { ...checkbox, isChecked: !checkbox.isChecked }
        : checkbox
    );
    setCheckboxes(updatedCheckboxes);
  };

  console.log("galleryVideo: ", galleryVideo);

  const handleMessage = async (galleryVideo: string, receiverID: string) => {
    console.log("receiverID: ", receiverID);
    const payload = {
      roomID: generateUniqueRoomId(),
      type: "galleryvideo",
      video: galleryVideo,
      sender: authState._id,
      receiver: receiverID,
      isSocket: false,
    };

    const successCallback = (response: any) => {
      toastSuccess(response);

      setTimeout(() => {
        router.push("/chat");
      }, 4000);

      handleCloseModal();
    };

    const errorCallback = (error: string) => {
      toastError(error);
      handleCloseModal();
    };

    const params = {
      payload,
      successCallback,
      errorCallback,
    };

    dispatch(initChat(params));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-container sm:w-96 mx-auto lg:w-4/12 z-50 overflow-y-auto">
        {/* Modal content */}
        <div className="relative text-center rounded-lg bg-[#091619] py-3 px-3 sm:py-4 sm:px-8 border border-[#586769] h-5/6">
          <button
            type="button"
            className="text-white-400 absolute top-2.5 right-2.5 bg-transparent  rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-600 hover:text-white"
            onClick={handleCloseModal}
          >
            <Image src={SVG.Exit} alt="exit" width={30} height={30} />
            <span className="sr-only">Close modal</span>
          </button>

          <h1
            className={`${leagueGothic.className} text-center text-3xl mb-5  text-white`}
          >
            GALLERY
          </h1>

          <div className="flex flex-col justify-center items-center w-full sm:min-h-[300px] lg:min-h-[200px] max-h-[300px] sm:max-h-[300px] lg:max-h-[300px] overflow-y-auto no-scrollbar">
            <div className="w-full h-full flex  justify-center">
              {galleryVideo && (
                <video
                  className="w-full h-full"
                  src={galleryVideo}
                  controls
                  width="100%"
                  height="100%"
                  autoPlay
                  controlsList=" nodownload  noremoteplayback noplaybackrate foobar"
                  disablePictureInPicture
                />
              )}
            </div>
          </div>
          <div className="flex justify-center w-full mt-3 ">
            <button
              className="sm:w-1/2 sm:h-6/12 sm:text-base bg-gradient-to-b from-[#62C860] to-[#37C535] text-white text-center py-[7px] rounded-tl-[20px] rounded-br-[20px] rounded-tr-[5px] rounded-bl-[5px] mb-3"
              onClick={() => handleMessage(galleryVideo, receiverID)}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Gallery;
