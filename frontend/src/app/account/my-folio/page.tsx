import * as React from "react";
import Image from "next/image";
import Layout from "@/components/CustomLayout/layout";
import { leagueGothic } from "@/font/font";
import { SVG } from "@/assets/SVG";
import Link from "next/link";

function Page() {
  const sectionStyle = {
    backgroundImage: `linear-gradient(to bottom, rgba(4, 50, 12, 1), rgba(4, 50, 12, 0) 50%)`,
  };
  return (
    <Layout>
      {/* Header */}
      <div className="flex flex-col gap-8 items-center px-6 pt-2 pb-8 bg-[#091619]">
        <div className="flex justify-between items-center w-full mx-4">
          <div>
            <h1 className={`${leagueGothic.className} text-4xl`}>MY FOLIO</h1>
          </div>
          <div className="flex items-center my-3 mx-2">
            <div className="flex items-center p-2 mr-2 rounded-full bg-[#162423]">
              <Image
                className="mr-2"
                src={SVG.Statement}
                alt="GGcoin"
                width={22}
                height={22}
              />
              <p className="font-semibold text-sm pr-2">Download Statement</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-7/12 p-2 ">
          <div className="flex flex-col items-center w-full bg-[#1FDE1F] p-6 rounded-xl">
            <span className="text-black text-sm font-normal">
              Your Coin Balance
            </span>
            <span className="text-black text-xl font-bold">1000.00</span>
          </div>
        </div>
      </div>

      {/* Main */}
      <div
        style={sectionStyle}
        className="flex flex-col  items-center py-6 bg-[#091619]"
      >
        <div className="flex flex-col w-7/12  p-2">
          <span className="text-white">Transcation History</span>
          {/* Coins section */}
          <div className="flex flex-col gap-2">
            {/* Coins Item */}
            <div className="flex gap-2 justify-between items-center py-4 px-4 border-b border-gray-600">
              <Image
                src={SVG.CoinsDeduct}
                alt="GGcoin"
                width={42}
                height={42}
              />
              <span className="text-white">Spend to John Smith</span>
              <span className="text-[#7C7F80]">22 Mar, 2022 - 3:20 PM</span>
              <span className="text-white">3 Coins</span>
            </div>
            <div className="flex gap-2 justify-between items-center py-4 px-4 border-b border-gray-600">
              <Image src={SVG.CoinsAdd} alt="GGcoin" width={42} height={42} />
              <span className="text-white">Spend to John Smith</span>
              <span className="text-[#7C7F80]">22 Mar, 2022 - 3:20 PM</span>
              <span className="text-white">3 Coins</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Page;
