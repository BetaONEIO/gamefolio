"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { SVG } from "@/assets/SVG";
import { leagueGothic } from "@/font/font";
import Link from "next/link";
import { IMAGES } from "@/assets/images";
import Modal from "../Modals/Modal";
import Badges from "../Modals/Badges";
import { useSelector } from "@/store";

function CustomHeader({ children }: { children?: String }) {
  const authState = useSelector((state: any) => state.auth.userData) || [];
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [modalState, setModalState] = useState({
    isBadgeOpen: false,
  });

  const handleModalToggle = (modalName: keyof typeof modalState) => {
    setModalState((prevState) => ({
      ...prevState,
      [modalName]: !prevState[modalName],
    }));
  };

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      router.push(`/${searchQuery}`);
    }
  };

  const notificationIndex =
    authState?.notification?.filter((item: any) => item.isView === false)
      ?.length ?? 0;

  return (
    <>
      <div className="z-40 flex justify-between items-center py-4 sticky top-0 w-full px-4 sm:px-2 lg:px-4">
        <div
          className={`${leagueGothic.className} text-2xl sm:text-4xl lg:text-4xl text-white`}
        >
          {children}
        </div>

        <div className="w-2/3 sm:w-1/3 lg:w-2/5 bg-[#1C2C2E] ml-16 flex gap-2 p-2 sm:p-3 items-center rounded-lg overflow-hidden">
          <Image src={SVG.Search} alt="logo" width={25} height={25} />
          <input
            className="bg-[#1C2C2E] outline-none text-white flex-grow text-sm sm:text-base"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="text-white cursor-pointer hover:opacity-60"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

        <div className="flex items-center my-3 mx-2 gap-1">
          <Link href="/main">
            <div className="relative">
              <div className="p-1 rounded-3xl p-1.5 border-2 border-[#162423]">
                <Image
                  className="cursor-pointer hover:opacity-60"
                  src={SVG.Notification}
                  alt="Notification"
                  width={22}
                  height={22}
                />
              </div>
              {notificationIndex > 0 && (
                <span className="absolute top-0.5 right-1 bg-red-800 text-white text-xs font-bold rounded-full px-1">
                  {notificationIndex}
                </span>
              )}
            </div>
          </Link>
          <Link href="/account/my-folio">
            <div className="flex items-center p-0.5 mr-2 rounded-full border-2 border-[#162423] cursor-pointer hover:opacity-60">
              <Image
                className="mr-2"
                src={SVG.GGcoin}
                alt="GGcoin"
                width={30}
                height={30}
              />
              <p className="sm:font-light md:font-semibold pr-2 sm:text-xs md:text-base lg:text-base text-white">
                GG Coins
              </p>
            </div>
          </Link>

          <div
            className="flex items-center p-0.5 mr-2 rounded-full border-2 border-[#162423] cursor-pointer hover:opacity-60"
            // onClick={() => handleModalToggle("isBadgeOpen")}
          >
            <Image
              className="w-9 h-8"
              src={IMAGES.Badges}
              alt="GGcoin"
              width={10}
              height={10}
              sizes="100vw"
            />
            <p className="font-semibold pr-2 text-white">Badges</p>
          </div>

          <Link href="/account/settings/edit-profile">
            <div className="rounded-3xl p-1.5 border-2 border-[#162423]">
              <Image
                className="cursor-pointer hover:opacity-60"
                src={SVG.Setting}
                alt="Setting"
                width={22}
                height={22}
              />
            </div>
          </Link>
        </div>
      </div>

      <Modal
        isOpen={modalState.isBadgeOpen}
        handleClose={() => handleModalToggle("isBadgeOpen")}
      >
        <Badges handleCloseModal={() => handleModalToggle("isBadgeOpen")} />
      </Modal>
    </>
  );
}

export default CustomHeader;
