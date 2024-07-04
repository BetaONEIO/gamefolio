"use client";

import { IMAGES } from "@/assets/images";
import Image from "next/image";
import Link from "next/link";

interface GalleryVideoMessageProps {
  videoData: string;
}
function GalleryVideoMessage({ videoData }: GalleryVideoMessageProps) {
  return (
    <div
      // key={videoData?._id}
      className="border border-[#1C2C2E] rounded-2xl bg-[#091619] w-2/4 "
    >
      <video
        className="w-[710px] h-[185px] sm:h-[185px] my-2 sm:my-2 rounded-2xl"
        src={`${videoData}#t=0.1`}
        style={{ aspectRatio: "16:9" }}
        width={50}
        height={50}
        controls
        controlsList="nodownload noremoteplayback noplaybackrate"
        disablePictureInPicture
        autoPlay={false}
        playsInline
        preload="metadata"
      />
    </div>
  );
}

export default GalleryVideoMessage;
