import React from "react";
import Image from "next/image";
import { SVG } from "@/assets/SVG";
import { leagueGothic } from "@/font/font";

function ExploreHeader() {
  return (
    <>
      <div className="flex items-center py-4 bg-[#091619] sticky top-0">
        <div className="flex justify-between items-center w-full mx-4 sm:mx-2 lg:mx-4">
          <div>
            <h1
              className={`${leagueGothic.className} text-2xl sm:text-4xl lg:text-4xl text-white`}
            >
              EXPLORE
            </h1>
          </div>
          <div className="w-2/3 sm:w-1/3 lg:w-1/3 bg-[#1C2C2E] flex gap-2 p-2 sm:p-3 items-center rounded-lg overflow-hidden">
            <Image src={SVG.Search} alt="logo" width={25} height={25} />
            <input
              className="bg-[#1C2C2E] outline-none text-white flex-grow text-sm sm:text-base"
              placeholder="Search"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default ExploreHeader;
