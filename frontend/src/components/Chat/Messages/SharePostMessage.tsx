"use client";

import { IMAGES } from "@/assets/images";
import Image from "next/image";
import Link from "next/link";

interface SharePostMessageProps {
  postData: any;
}
function SharePostMessage({ postData }: SharePostMessageProps) {
  return (
    <div
      key={postData._id}
      className="border border-[#1C2C2E] rounded-2xl bg-[#091619] w-2/4 px-2"
    >
      <div className="flex items-center justify-between m-3">
        <div className="flex items-center sm:gap-4 gap-2">
          <Image
            className="w-12 h-12 rounded-xl"
            src={postData?.userID?.profilePicture}
            alt="Profile"
            width={50}
            height={50}
            sizes="100vw"
            quality={80}
            loading="lazy"
          />
          <div>
            <Link
              href={`/account/${postData?.userID?.username}`}
              key={postData._id}
            >
              <h1 className="w-[230px] sm:w-[350px] text-lg font-bold text-white hover:opacity-80">
                {postData?.userID?.name}
              </h1>
            </Link>
            <p className="text-sm md:text-sm sm:text-base font-light text-gray-400">
              {postData?.date &&
                new Date(postData.date).toLocaleString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
            </p>
          </div>
        </div>
      </div>

      <div className="mx-3">
        <p className="text-neutral-300">{postData?.description}</p>
      </div>

      <video
        className="w-[710px] h-[185px] sm:h-[300px] my-2 sm:my-2"
        src={`${postData.video}#t=0.1`}
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

export default SharePostMessage;
