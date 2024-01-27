import React from "react";
import Image from "next/image";
import { SVG } from "@/assets/SVG";
import { leagueGothic } from "@/font/font";
import Link from "next/link";
import { IMAGES } from "@/assets/images";

function ExploreHeader() {
  return (
    <>
      <div className="flex justify-between items-center py-4 bg-[#091619] sticky top-0 w-full px-4 sm:px-2 lg:px-4">
        <div
          className={`${leagueGothic.className} text-2xl sm:text-4xl lg:text-4xl text-white`}
        >
          EXPLORE
        </div>

        <div className="w-2/3 sm:w-1/3 lg:w-2/4 bg-[#1C2C2E] ml-16 flex gap-2 p-2 sm:p-3 items-center rounded-lg overflow-hidden">
          <Image src={SVG.Search} alt="logo" width={25} height={25} />
          <input
            className="bg-[#1C2C2E] outline-none text-white flex-grow text-sm sm:text-base"
            placeholder="Search"
          />
        </div>

        <div className="flex items-center my-3 mx-2 gap-2">
          <Link href="/account/settings">
            <Image
              className="cursor-pointer hover:opacity-60"
              src={SVG.Notification}
              alt="Setting"
              width={24}
              height={24}
            />
          </Link>
          <Link href="/account/my-folio">
            <div className="flex items-center p-1 mr-2 rounded-full bg-[#162423]">
              <Image
                className="mr-2"
                src={SVG.GGcoin}
                alt="GGcoin"
                width={30}
                height={30}
              />
              <p className="font-semibold pr-2 text-white">GG COIN</p>
            </div>
          </Link>
          <Link href="/account/my-folio">
            <div className="flex items-center p-1 mr-2 rounded-full bg-[#162423]">
              <Image
                className="w-9 h-8"
                src={IMAGES.Badges}
                alt="GGcoin"
                width={30}
                height={30}
              />
              <p className="font-semibold pr-2 text-white">Badges</p>
            </div>
          </Link>
          <Link href="/account/settings">
            <Image
              className="cursor-pointer hover:opacity-60"
              src={SVG.Setting}
              alt="Setting"
              width={24}
              height={24}
            />
          </Link>
        </div>
      </div>
    </>
  );
}

export default ExploreHeader;
