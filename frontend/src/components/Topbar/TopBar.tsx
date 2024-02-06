"use client";
import React from "react";
import { usePathname } from "next/navigation";

function TopBar() {
  const currentRoute = usePathname();
  const isItemActive = (path: string) => {
    return currentRoute === path ? true : false;
  };
  return (
    <>
      <div className=" px-4">
        <ul className="flex items-center gap-10">
          <li>
            <a href="/explore" className="text-base font-normal text-white">
              <div className="my-2 w-full">
                <span className="px-6">All</span>
              </div>
              {isItemActive("/explore") && (
                <div className="w-full h-1 bg-[#62C860] rounded-lg"></div>
              )}
            </a>
          </li>

          <li>
            <a
              href="/explore/games"
              className="text-base font-normal text-white"
            >
              <div className="my-2 w-full">
                <span className="px-6">Games</span>
              </div>
              {isItemActive("/explore/games") && (
                <div className="w-full h-1 bg-[#62C860] rounded-lg"></div>
              )}
            </a>
          </li>

          <li>
            <a
              href="/explore/videos"
              className="text-base font-normal text-white"
            >
              <div className="my-2 w-full">
                <span className="px-6">Videos</span>
              </div>
              {isItemActive("/explore/videos") && (
                <div className="w-full h-1 bg-[#62C860] rounded-lg"></div>
              )}
            </a>
          </li>

          <li>
            <a
              href="/explore/users"
              className="text-base font-normal text-white"
            >
              <div className="my-2 w-full">
                <span className="px-6">Users</span>
              </div>
              {isItemActive("/explore/users") && (
                <div className="w-full h-1 bg-[#62C860] rounded-lg"></div>
              )}
            </a>
          </li>
        </ul>
      </div>
      <hr className="h-px border-0 bg-gray-700" />
    </>
  );
}

export default TopBar;
