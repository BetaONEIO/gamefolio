"use client";
import React, { ReactNode, Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";
import SideBar from "@/components/sideBar/SideBar";
import { ROUTES } from "@/labels/routes";
import { dispatch } from "@/store";
import { userSession } from "@/store/slices/authSlice";
import { getCookieValue, getFromLocal } from "@/utils/localStorage";

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
    <div className="antialiased">
      {/* <!-- Sidebar --> */}
      <SideBar />
      {/* Main Page */}
      <main className="md:ml-64 h-auto  ">
        <div className="rounded-lg border-gray-600 h-full overflow-y-scroll no-scrollbar">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
