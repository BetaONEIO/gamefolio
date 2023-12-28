"use client";
import React from "react";
import { usePathname } from "next/navigation";

function TopBar() {
  const currentRoute = usePathname();
  // Define a function to determine if a sidebar item is active based on the current route
  const isItemActive = (path: string) => {
    return currentRoute === path ? true : false;
  };
  return (
    <>
      <div className="py-4 bg-[#1C2C2E]">
        <ul className="flex items-center justify-center divide-x  divide-gray-700 ">
          <li>
            <a
              href="/explore-search/explore-videos"
              className="text-base font-normal  text-white"
            >
              <div className="my-2 w-full">
                <span className="px-6">Videos</span>
              </div>
              {isItemActive("/explore-search/explore-videos") && (
                <div className="w-full h-1 bg-[#62C860] rounded-lg"></div>
              )}
            </a>
          </li>

          <li>
            <a
              href="/explore-search/explore-user"
              className="text-base font-normal  text-white"
            >
              <div className="my-2 w-full">
                <span className="px-6">Users</span>
              </div>
              {isItemActive("/explore-search/explore-user") && (
                <div className="w-full h-1 bg-[#62C860] rounded-lg"></div>
              )}
            </a>
          </li>

          <li>
            <a
              href="/explore-search/explore-games"
              className="text-base font-normal text-white"
            >
              <div className="my-2 w-full">
                <span className="px-6">Games</span>
              </div>
              {isItemActive("/explore-search/explore-games") && (
                <div className="w-full h-1 bg-[#62C860] rounded-lg"></div>
              )}
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}

export default TopBar;
