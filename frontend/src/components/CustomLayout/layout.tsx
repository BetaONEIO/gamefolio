"use client";
import SideBar from "@/components/sideBar/SideBar";
import { ROUTES } from "@/labels/routes";
import { dispatch, useSelector } from "@/store";
import { userSession } from "@/store/slices/authSlice";
import { getCookieValue, getFromLocal } from "@/utils/localStorage";
import { useRouter } from "next/navigation";
import React, { ReactNode, Suspense, useEffect } from "react";

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();

  const cookies = getCookieValue("gfoliotoken");
  const payload = {
    userToken: getFromLocal("@token") || getCookieValue("gfoliotoken"),
  };
  const params = {
    payload,
  };
  useEffect(() => {
    if (getFromLocal("@token") || cookies) {
      dispatch(userSession(params));
    } else {
      router.replace(ROUTES.login);
    }
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="antialiased bg-gray-50 dark:bg-[#091619]">
        {/* <!-- Sidebar --> */}
        <SideBar />
        {/* Main Page */}
        <main className="md:ml-64 h-auto ">
          <div className=" rounded-lg border-gray-300 dark:border-gray-600 h-screen overflow-y-scroll no-scrollbar">
            {children}
          </div>
        </main>
      </div>
    </Suspense>
  );
};

export default Layout;
