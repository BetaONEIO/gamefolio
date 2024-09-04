"use client";
import { SVG } from "@/assets/SVG";
import { IMAGES } from "@/assets/images";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";
import AddNew from "../Modals/AddNew";

const SkeletonSideBarAccountInfoLoader = () => {
  return (
    <div className="flex flex-col relative items-center justify-center p-3 rounded-lg border bg-[#1C2C2E] border-gray-600">
      <div className="animate-pulse mb-4 w-20 h-20 rounded-full bg-gray-700" />

      <div className="animate-pulse text-xs sm:text-sm mb-2 font-semibold leading-none bg-gray-700 h-4 w-24 rounded-lg" />

      <div className="animate-pulse text-gray-400 bg-gray-700 h-3 w-20 rounded-lg mt-1" />

      <div className="cursor-pointer animate-pulse w-9 h-8 rounded-full bg-gray-700 mt-4" />
    </div>
  );
};

// Define types for props
interface SideBarProps {
  toggleSidebar: () => void;
  sidebarOpen: boolean;
}
function SideBar({ toggleSidebar, sidebarOpen }: SideBarProps) {
  const authState = useSelector((state: any) => state.auth) || [];
  const messageState = useSelector((state: any) => state.chat) || [];
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isDataFetching =
    Object.keys(authState?.userData || {}).length === 0 || authState?.loading;

  {
    /* Get the current route */
  }
  const currentRoute = usePathname();

  const handleUpdateButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const isItemActive = (path: string) => {
    return currentRoute === path ? true : false;
  };

  return (
    <>
      <button
        data-drawer-target="sidebar-notification"
        data-drawer-toggle="sidebar-notification"
        aria-controls="sidebar-notification"
        type="button"
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm rounded-lg sm:hidden"
        onClick={toggleSidebar}
      >
        <span className="sr-only">Open sidebar</span>
        <Image src={SVG.SideBar} alt="sidebar" width={30} height={30} />
      </button>

      <aside
        id="sidebar-notification"
        className={`fixed top-0 left-0  w-64 h-screen transition-transform  z-50 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 bg-[#091619]`}
      >
        <div className="flex flex-col justify-between h-full overflow-y-auto no-scrollbar py-4 px-3 border-r bg-[#050E10] border-[#050E10]">
          <div className="mb-16">
            <div className="flex flex-col items-center px-6 py-8 mb-6 lg:py-0">
              <Link href="/main" className="cursor-pointer hover:opacity-80">
                <Image width={100} height={100} src={IMAGES.logo} alt="logo" />
              </Link>
            </div>

            <ul className="space-y-2">
              <li>
                <Link
                  href="/main"
                  className={`flex items-center p-2 text-base font-normal rounded-lg text-white  ${
                    isItemActive("/main") ? "bg-[#162423]" : ""
                  } hover:bg-[#162423] group`}
                >
                  <svg
                    width="20"
                    height="22"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      fill: isItemActive("/main") ? "#62C860" : "#586769",
                    }}
                  >
                    <path d="M7.13477 18.7733V15.7156C7.13477 14.9351 7.77216 14.3023 8.55843 14.3023H11.4326C11.8102 14.3023 12.1723 14.4512 12.4393 14.7162C12.7063 14.9813 12.8563 15.3408 12.8563 15.7156V18.7733C12.8539 19.0978 12.9821 19.4099 13.2124 19.6402C13.4427 19.8705 13.756 20 14.0829 20H16.0438C16.9596 20.0023 17.8387 19.6428 18.4872 19.0008C19.1356 18.3588 19.5 17.487 19.5 16.5778V7.86685C19.5 7.13245 19.1721 6.43584 18.6046 5.96466L11.934 0.675868C10.7737 -0.251438 9.1111 -0.221498 7.98538 0.746978L1.46701 5.96466C0.87274 6.42195 0.517552 7.12063 0.5 7.86685V16.5689C0.5 18.4638 2.04738 20 3.95617 20H5.87228C6.55122 20 7.10299 19.4562 7.10791 18.7822L7.13477 18.7733Z" />
                    <defs>
                      <linearGradient
                        id="paint0_linear_748_4648"
                        x1="9.99999"
                        y1="0"
                        x2="9.99999"
                        y2="20"
                        gradientUnits="userSpaceOnUse"
                      ></linearGradient>
                    </defs>
                  </svg>
                  <div className="flex flex-row w-48 justify-between">
                    <span
                      className={`ml-5 font-semibold ${
                        isItemActive("/main") ? "text-white" : "text-gray-400"
                      }`}
                    >
                      Home
                    </span>
                    {isItemActive("/main") && (
                      <hr className="w-1 h-6 bg-[#fff] rounded-lg" />
                    )}
                  </div>
                </Link>
              </li>

              {/* <li>
                <Link
                  href="/clips"
                  className={`flex items-center p-2 text-base font-normal rounded-lg text-white ${
                    isItemActive("/clips") ? "bg-[#162423]" : ""
                  } hover:bg-[#162423] group`}
                >
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      fill: isItemActive("/clips") ? "#62C860" : "#586769",
                    }}
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M5.00018 6.47388C3.89561 6.47388 3.00018 7.36931 3.00018 8.47388V19.0987C3.00018 20.2033 3.89561 21.0987 5.00018 21.0987H19C20.1046 21.0987 21 20.2033 21 19.0987V8.47388C21 7.36931 20.1046 6.47388 19 6.47388H5.00018ZM10.693 11.2164L14.6592 13.653C15.0135 13.8701 15.0135 14.2257 14.6592 14.4428L10.693 16.8803C10.3404 17.0983 10.05 16.9196 10.05 16.4854V11.6113C10.05 11.1771 10.3404 10.9984 10.693 11.2164Z"
                    />
                    <path d="M5.49533 4.58594H18.5657C19.0912 4.5899 19.6081 4.72023 20.0726 4.96593L19.483 3.30838C19.347 2.92395 19.0949 2.59131 18.7616 2.35654C18.4282 2.12177 18.0301 1.99649 17.6223 1.99806H6.406C5.99826 1.99649 5.60012 2.12177 5.26674 2.35654C4.93337 2.59131 4.68126 2.92395 4.54535 3.30838L3.98846 4.96593C4.453 4.72023 4.96983 4.5899 5.49533 4.58594Z" />
                  </svg>
                  <div className="flex flex-row w-48 justify-between">
                    <span
                      className={`ml-5 font-semibold ${
                        isItemActive("/clips") ? "text-white" : "text-gray-400"
                      }`}
                    >
                      Clips
                    </span>
                    {isItemActive("/clips") && (
                      <hr className="w-1 h-6 bg-[#fff] rounded-lg" />
                    )}
                  </div>
                </Link>
              </li> */}

              <li>
                <Link
                  href="/explore"
                  className={`flex items-center p-2 text-base font-normal rounded-lg text-white ${
                    isItemActive("/explore") ? "bg-[#162423]" : ""
                  } hover:bg-[#162423] group`}
                >
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 26 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      fill: isItemActive("/explore") ? "#62C860" : "#586769",
                      stroke: isItemActive("/explore") ? "#62C860" : "#586769",
                    }}
                  >
                    <path
                      d="M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16 12C16 14.2091 14.2091 16 12 16"
                      stroke="#162423"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M22.75 22.75L18.0375 18.0375"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex flex-row w-48 justify-between">
                    <span
                      className={`ml-5 font-semibold ${
                        isItemActive("/explore")
                          ? "text-white"
                          : "text-gray-400"
                      }`}
                    >
                      Explore
                    </span>
                    {isItemActive("/explore") && (
                      <hr className="w-1 h-6 bg-[#fff] rounded-lg" />
                    )}
                  </div>
                </Link>
              </li>

              {/* <li>
                <Link
                  href="/trending"
                  className={`flex items-center p-2 text-base font-normal rounded-lg text-white ${
                    isItemActive("/trending") ? "bg-[#162423]" : ""
                  } hover:bg-[#162423] group`}
                >
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 26 26"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      fill: isItemActive("/trending") ? "#62C860" : "#586769",
                    }}
                  >
                    <path d="M15.432 21.7248C15.4078 22.2508 15.2351 24 13.1955 24C11.1558 24 10.6105 21.9817 10.5754 21.4317C10.4668 19.7259 11.1818 17.639 12.1159 16.6661C12.2216 16.5559 12.4031 16.621 12.4443 16.768C12.5712 17.2206 12.878 18.04 13.535 18.6069C14.5152 19.4528 15.5028 20.1793 15.432 21.7248ZM17.853 11.9928C16.8296 11.0237 15.8885 9.84106 16.3101 7.11484C16.3618 6.78052 16.0888 6.48952 15.7844 6.63718C15.3939 6.82663 15.0445 7.11461 14.8017 7.3443C14.67 7.46884 14.4184 7.38643 14.383 7.20869C14.1912 6.24583 13.7586 5.20061 14.7307 2.87823C14.8874 2.50388 14.5864 2.10459 14.2029 2.23721C10.2977 3.58758 4.72425 9.59532 5.01061 15.3844C5.155 18.3034 6.50363 21.7795 9.72285 23.2691C9.82848 23.318 9.91735 23.1632 9.83209 23.084C8.89756 22.2155 8.23516 20.9693 8.01514 19.5309C7.2741 14.6876 12.0628 10.2486 14.4523 10.5133C14.5512 10.5242 14.6145 10.614 14.5794 10.7072C14.2716 11.5248 12.543 13.7498 16.0877 16.0961C19.9239 18.6349 18.2044 21.4737 17.146 22.6861C17.0682 22.7753 17.196 22.9516 17.2983 22.8919C19.2559 21.7503 20.6557 19.8193 20.9623 17.5412C21.2729 15.2321 19.6117 13.6587 17.853 11.9928Z" />
                  </svg>
                  <div className="flex flex-row w-48 justify-between">
                    <span
                      className={`ml-5 font-semibold ${
                        isItemActive("/trending")
                          ? "text-white"
                          : "text-gray-400"
                      }`}
                    >
                      Trending
                    </span>
                    {isItemActive("/trending") && (
                      <hr className="w-1 h-6 bg-[#fff] rounded-lg" />
                    )}
                  </div>
                </Link>
              </li> */}

              <li>
                <Link
                  href={`/mygamefolio/${authState?.userData?.username}`}
                  className={`flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white  ${
                    isItemActive("/portfolio-web") ? "bg-[#162423]" : ""
                  } dark:hover:bg-[#162423] group`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    style={{
                      fill: isItemActive("/portfolio-web")
                        ? "#62C860"
                        : "#586769",
                      stroke: isItemActive("/portfolio-web")
                        ? "#62C860"
                        : "#586769",
                    }}
                  >
                    <path
                      d="M16.19 2H12.75V8V8.75V13.75H22V8.75V8V7.81C22 4.17 19.83 2 16.19 2Z"
                      fill="#586769"
                    />
                    <path
                      d="M2 10.25V15.25V15.75V16.19C2 19.83 4.17 22 7.81 22H11.25V15.75V15.25V10.25H2Z"
                      fill="#586769"
                    />
                    <path
                      d="M11.25 2V8.75H2V7.81C2 4.17 4.17 2 7.81 2H11.25Z"
                      fill="#586769"
                    />
                    <path
                      d="M22 15.25V16.19C22 19.83 19.83 22 16.19 22H12.75V15.25H22Z"
                      fill="#586769"
                    />
                  </svg>

                  <div className="flex flex-row w-48 justify-between">
                    <span
                      className={`ml-5 font-semibold ${
                        isItemActive("/portfolio-web")
                          ? "text-white"
                          : "text-gray-400"
                      }`}
                    >
                      My Gamefolio
                    </span>
                    {isItemActive("/portfolio-web") && (
                      <hr className="w-1 h-6 bg-[#fff] rounded-lg" />
                    )}
                  </div>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="flex flex-col items-center justify-center gap-3">
              <Link href="/chat">
                <button className="flex w-full sm:w-52 bg-[#1C2C2E] text-white py-[10px] px-[20px] rounded-full ">
                  <div className="flex self-center justify-between ">
                    <Image
                      width={20}
                      height={20}
                      src={SVG.Message}
                      alt="Message"
                      className=""
                    />
                    <div>
                      <p className="mx-4">Messages</p>
                    </div>
                    <p className="px-2 rounded-xl bg-[#586769]">
                      {messageState.messages?.length}
                    </p>
                  </div>
                </button>
              </Link>

              <button
                className="flex items-center w-full sm:w-52 bg-gradient-to-b from-[#62C860] to-[#37C535] text-white py-[10px] px-[20px] rounded-full mb-3 gap-4"
                onClick={handleUpdateButtonClick}
              >
                <Image
                  width={20}
                  height={20}
                  className="justify-self-start"
                  src={SVG.Addnew}
                  alt="Addnew"
                />
                <p className="font-bold">Add New</p>
              </button>
            </div>
            {isDataFetching ? (
              <SkeletonSideBarAccountInfoLoader />
            ) : (
              <div
                key={authState?.userData?.userID}
                className="flex flex-col relative items-center justify-center p-3 rounded-lg border bg-[#1C2C2E] border-gray-600"
              >
                <Image
                  src={authState?.userData?.profilePicture}
                  sizes="100vw"
                  width={20}
                  height={20}
                  className="mb-4 w-20 h-20 rounded-full"
                  alt="account"
                />

                <dt className="text-xs sm:text-sm text-center mb-2 font-semibold leading-none text-white">
                  {authState?.userData?.name}
                </dt>
                <dd className="text-gray-400">
                  ({authState?.userData.username})
                </dd>
                <button
                  className="cursor-pointer hover:opacity-80 hover:scale-105 transition-transform duration-100"
                  onClick={toggleDropdown}
                >
                  <Image
                    src={SVG.Threedot}
                    width={20}
                    height={20}
                    className="w-9 h-8 rounded-full"
                    alt="account"
                  />
                </button>

                <div
                  id="dropdown"
                  className={`${
                    isDropdownOpen ? "block" : "hidden"
                  } flex absolute top-48 justify-center border-2 border-[#43DD4E] rounded-lg mt--2`}
                  style={{
                    borderWidth: "2px",
                    borderColor: "#43DD4E",
                    position: "absolute",
                    top: "100%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "133px",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "-20px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      borderLeft: "10px solid transparent",
                      borderRight: "10px solid transparent",
                      borderBottom: `20px solid #43DD4E`,
                    }}
                  />

                  <Link
                    href="/account"
                    className={`flex items-center p-2 text-base font-normal rounded-lg text-white transition duration-300 ${
                      isItemActive("/account") ? "bg-[#162423]" : ""
                    } hover:bg-[#162423] group`}
                  >
                    <span className="font-normal underline">My Account</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>
      {isModalOpen && <AddNew handleCloseModal={handleCloseModal} />}
    </>
  );
}

export default SideBar;
