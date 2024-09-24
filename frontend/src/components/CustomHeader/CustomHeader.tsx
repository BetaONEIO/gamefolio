"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { SVG } from "@/assets/SVG";
import { leagueGothic } from "@/font/font";
import Link from "next/link";
import Modal from "../Modals/Modal";
import Badges from "../Modals/Badges";
import { useSelector } from "@/store";
import { handleUpdateNotification } from "@/components/Notification/Notification";

const NotificationSkeletonLoader = () => {
  return (
    <div className="flex items-center gap-1 animate-pulse">
      <div className="w-10 h-10 rounded-lg bg-gray-700"></div>
      <div className="flex flex-col">
        <div className="flex items-center gap-2 mx-2">
          <div className="w-28 h-4 bg-gray-700"></div>
          <div className="w-32 h-4 bg-gray-700"></div>
        </div>
        <div className="w-56 h-4 bg-gray-700 mx-2"></div>
      </div>
    </div>
  );
};

function CustomHeader({ children }: { children?: String }) {
  const authState = useSelector((state: any) => state.auth.userData) || [];
  const postState = useSelector((state: any) => state.post) || [];
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [modalState, setModalState] = useState({
    isBadgeOpen: false,
  });

  const isBrowser = typeof window !== "undefined";

  const { loading, isScroll } = postState;

  const handleModalToggle = (modalName: keyof typeof modalState) => {
    setModalState((prevState) => ({
      ...prevState,
      [modalName]: !prevState[modalName],
    }));
  };

  // const handleSearch = () => {
  //   if (searchQuery.trim() !== "") {
  //     router.push(`/${searchQuery}`);
  //   }
  // };

  const handleSearch = () => {
    if (searchQuery) {
      // Navigate to the desired URL using the username entered
      router.push(`/mygamefolio/${searchQuery}`);
    }
  };

  const convertDateFormat = (dateString: any) => {
    const date = new Date(dateString);

    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12;

    const formattedTime = `${hours}:${minutes
      .toString()
      .padStart(2, "0")} ${ampm}`;

    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear().toString()?.slice(-2);

    const formattedDate = `${month}/${day}/${year}`;

    return `${formattedTime}-${formattedDate}`;
  };

  const isView = authState?.notification?.every((item: any) => item.isView);

  const getNotificationMessage = (notificationType: any) => {
    switch (notificationType) {
      case "like_post":
        return "Liked your post.";
      case "comment_post":
        return "Commented on your post.";
      case "story":
        return "Liked your story.";
      case "clip":
        return "Liked your clip.";
      case "friendRequest":
        return "sent you a friend request.";

      default:
        return "Unknown notification type";
    }
  };

  const notificationIndex =
    authState?.notification?.filter((item: any) => item.isView === false)
      ?.length ?? 0;

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <div className="z-40 flex flex-col sm:flex-row justify-between items-center py-4 sticky top-0 w-full px-4 sm:px-2 lg:px-4 bg-[#091619]">
        <div
          className={`${leagueGothic.className} text-2xl sm:text-4xl lg:text-4xl text-white mb-4 sm:mb-0`}
        >
          {children}
        </div>

        <div className="flex items-center w-full sm:w-1/2 lg:w-2/5 bg-[#1C2C2E] p-2 sm:p-3 rounded-lg mb-4 sm:mb-0">
          <Image src={SVG.Search} alt="logo" width={25} height={25} />
          <input
            className="bg-[#1C2C2E] outline-none text-white flex-grow text-sm sm:text-base ml-2"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch(); // Allow search on pressing "Enter"
              }
            }}
          />
          <button
            className="text-white cursor-pointer hover:opacity-60 ml-2"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

        <div className="flex items-center gap-28">
          {/* <Link href="/main"> */}
          <div className="relative">
            <div
              onClick={toggleDropdown}
              className="p-1 rounded-3xl border-2 border-[#162423]"
            >
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

          <div
            id="dropdown"
            className={`${
              isDropdownOpen ? "block" : "hidden"
            } flex absolute top-full justify-center border-2 border-[#43DD4E] rounded-lg mt-2`}
            style={{
              borderWidth: "2px",
              borderColor: "#43DD4E",
              position: "absolute",
              top: isBrowser && window.innerWidth <= 768 ? "90%" : "75%",
              left: isBrowser && window.innerWidth <= 768 ? "52.4%" : "84.5%",
              transform: "translateX(-50%)",
              height: "400px",
              width: "300px",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-10px",
                left: isBrowser && window.innerWidth <= 768 ? "21%" : "50%",
                transform: "translateX(-50%)",
                borderLeft: "5px solid transparent",
                borderRight: "5px solid transparent",
                borderBottom: `10px solid #43DD4E`,
              }}
            />
            <div
              className="w-full md:flex flex-col gap-4 rounded-lg bg-[#091619] border border-[#1C2C2E] px-2 py-6 overflow-hidden overflow-y-auto"
              style={styles.scroller}
            >
              <div className="flex justify-between items-center">
                <span className="text-white font-bold">Notification</span>
                <div className="flex gap-2">
                  <span
                    className={`text-xs cursor-pointer ${
                      isView ? "text-gray-500" : "text-[#43DD4E]"
                    }`}
                  >
                    Unread
                  </span>
                  <span
                    className={`text-xs cursor-pointer ${
                      isView ? "text-[#43DD4E]" : "text-gray-500"
                    }`}
                  >
                    Read
                  </span>
                </div>
              </div>
              {loading ? (
                <>
                  {[...Array(5)]?.map((_, index) => (
                    <NotificationSkeletonLoader key={index} />
                  ))}
                </>
              ) : (
                <>
                  {authState?.notification?.length === 0 ? (
                    <div className="flex h-full justify-center items-center text-gray-500">
                      No data available
                    </div>
                  ) : (
                    authState?.notification?.map((notification: any) => (
                      <a
                        href={notification?.postID?.url}
                        key={notification?._id}
                      >
                        <div
                          className={`flex items-center gap-0.2 cursor-pointer hover:opacity-80 hover:bg-[#162423] p-2 ${
                            notification?.isView === false
                              ? "bg-[#162423]"
                              : "bg-[#091619]"
                          }`}
                          onClick={() =>
                            handleUpdateNotification(
                              authState._id,
                              notification?._id
                            )
                          }
                        >
                          <Image
                            className="w-10 h-10 rounded-lg"
                            src={notification?.oppositionID?.profilePicture}
                            alt="picture"
                            width={12}
                            height={12}
                            sizes="100vw"
                          />
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2 mx-2">
                              <p
                                className={`w-32 text-xs text-white ${
                                  notification?.isView === false
                                    ? "font-bold"
                                    : "font-semibold"
                                }`}
                              >
                                {notification?.oppositionID?.name?.length > 12
                                  ? `${notification?.oppositionID?.name.substring(
                                      0,
                                      14
                                    )}`
                                  : notification?.oppositionID?.name}
                              </p>
                              <p
                                className={`w-28 text-[0.60rem] text-gray-400 ${
                                  notification?.isView === false
                                    ? "font-bold"
                                    : "font-semibold"
                                }`}
                              >
                                {convertDateFormat(notification?.date)}
                              </p>
                            </div>
                            <span
                              className={`text-xs text-white mx-2 ${
                                notification?.isView === false
                                  ? "font-bold"
                                  : "font-normal"
                              }`}
                            >
                              {getNotificationMessage(
                                notification?.notificationType
                              )}
                            </span>
                          </div>
                        </div>
                      </a>
                    ))
                  )}
                </>
              )}
            </div>
          </div>
          {/* </Link> */}

          {/* <div className="flex items-center p-1 rounded-full border-2 border-[#162423] cursor-pointer hover:opacity-60">
              <Image
                className="mr-2"
                src={SVG.GGcoin}
                alt="GGcoin"
                width={30}
                height={30}
              />
              <p className="font-semibold text-white text-xs sm:text-sm md:text-base lg:text-lg">
                GG Coins
              </p>
            </div> */}

          {/* <div
            className="flex items-center gap-2 p-1 rounded-full border-2 border-[#162423] cursor-pointer hover:opacity-60"
            onClick={() => handleModalToggle("isBadgeOpen")}
          >
            <Image
              className="w-7 h-8"
              src={SVG.Badge1}
              alt="Badges"
              width={10}
              height={10}
              sizes="100vw"
            />
            <p className="font-semibold text-white text-xs sm:text-sm md:text-base lg:text-lg">
              Badges
            </p>
          </div> */}

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

const styles = {
  scroller: {
    scrollbarColor: "#43DD4E #FFFFFF",
  },
};

export default CustomHeader;
