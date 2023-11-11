"use client";
import { useState } from "react";
import { IMAGES } from "@/assets/images";
import { leagueGothic } from "@/font/font";
import Image from "next/image";
import { toastError, toastSuccess } from "@/components/Toast/Toast";

import { ROUTES } from "@/labels/routes";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
import { createPreferences } from "@/store/slices/authSlice";
import { dispatch } from "@/store";
import { useSelector } from "react-redux";
import { getFromLocal } from "@/utils/localStorage";

const tabsData = [
  { id: "1", label: "Action" },
  { id: "2", label: "Fighting" },
  { id: "3", label: "Point & Click" },
  { id: "4", label: "Puzzle" },
  { id: "5", label: "Racing" },
  { id: "6", label: "Card & Board" },
  { id: "7", label: "Arcade" },
  { id: "8", label: "Sports" },
  { id: "9", label: "Quiz/Trivia" },
  { id: "10", label: "Shooter" },
  { id: "11", label: "Real Time Strategy" },
  { id: "12", label: "Hack & slash/Beat,'em up" },
  { id: "13", label: "Indie" },
  { id: "15", label: "Pinball" },
  { id: "16", label: "Adventure" },
];

const Preference = () => {
  const userData = getFromLocal("@userData");
  const router = useRouter();
  const [activeTabs, setActiveTabs] = useState<string[]>([]);

  const handleTabClick = (tabId: string) => {
    if (activeTabs.includes(tabId)) {
      setActiveTabs(activeTabs.filter((id) => id !== tabId));
    } else if (activeTabs.length < 10) {
      setActiveTabs([...activeTabs, tabId]);
    } else {
      toastError("Maximum preferences exceeded");
    }
  };

  const handleNext = () => {
    // toastSuccess(message);
    if (activeTabs.length < 3) {
      toastError("Please pick at least three");
      return;
    } else if (activeTabs.length === 10) {
      toastError("Maximum preferences exceeded");
      return;
    }
    const successCallback = (response: any) => {
      console.log("response: ", response);
      toastSuccess(response);
      setTimeout(() => {
        router.push(ROUTES.selectGame);
      }, 6000);
    };

    const errorCallback = (error: string) => {
      toastError(error);
    };

    const params = {
      payload: { userID: userData._id, preference: activeTabs },
      successCallback,
      errorCallback,
    };

    dispatch(createPreferences(params));
    // router.push(ROUTES.selectGame);
  };

  return (
    <section className="bg-gray-50 dark:bg-[#091619] min-h-screen flex flex-col justify-center">
      <div className="flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        <Image src={IMAGES.logo} alt="logo" width={100} height={100} />

        <div className="p-6 space-y-4 sm:p-8 md:w-96">
          <h1 className={`${leagueGothic.className} text-4xl`}>PREFERENCES</h1>
          <hr className="w-10 border-t-4 border-[#43DD4E] rounded-lg" />

          <p className="text-sm font-normal text-gray-300">
            Please select preferences category
          </p>

          <hr className="border-t border-gray-600 my-4" />
          <div className="w-80 py-4">
            <ul
              className="flex-wrap flex text-gray-500 dark:text-gray-400"
              id="myTab"
              role="tablist"
            >
              {tabsData.map((tab) => (
                <li key={tab.id} className="mr-0.5 m-0.5" role="presentation">
                  <button
                    className={`inline-block px-2 font-normal rounded-full dark:bg-[#162423] ${
                      activeTabs.includes(tab.label)
                        ? "border-2 border-[#37C535] bg-[#37C535] text-white"
                        : "bg-gray-100 dark:bg-[#162423]  dark:border-green-700 text-gray-500 "
                    }`}
                    onClick={() => handleTabClick(tab.label)}
                    role="tab"
                    aria-controls={tab.id}
                    aria-selected={activeTabs.includes(tab.label)}
                  >
                    <span className="text-sm">{tab.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <button
            className="w-full h-[50] bg-[#37C535] text-white text-center py-[10px] px-[10px] rounded-tl-[20px] rounded-br-[20px] rounded-tr-[5px] rounded-bl-[5px] mb-3"
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </section>
  );
};

export default Preference;
