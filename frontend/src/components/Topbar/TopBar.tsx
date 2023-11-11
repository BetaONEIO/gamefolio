import React from "react";

function TopBar() {
  return (
    <>
      <div className="py-4 bg-[#1C2C2E]">
        <ul className="flex items-center justify-center divide-x divide-gray-200 dark:divide-gray-700 ">
          <li>
            <a
              href="/explore-search/explore-videos"
              className="text-base font-normal text-gray-900  dark:text-white"
            >
              <span className="px-6">Videos</span>
            </a>
          </li>

          <li>
            <a
              href="/explore-search/explore-user"
              className="text-base font-normal text-gray-900 dark:text-white"
            >
              <span className="px-6">Users</span>
            </a>
          </li>

          <li>
            <a
              href="/explore-search/explore-games"
              className="text-base font-normal text-gray-900 dark:text-white"
            >
              <span className="px-6">Games</span>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}

export default TopBar;
