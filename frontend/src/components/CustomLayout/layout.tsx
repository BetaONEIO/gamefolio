"use client";
import SideBar from "@/components/sideBar/SideBar";
import { ROUTES } from "@/labels/routes";
import { dispatch } from "@/store";
import { userSession } from "@/store/slices/authSlice";
import { getCookieValue, getFromLocal } from "@/utils/localStorage";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const cookies = getCookieValue("gfoliotoken");
  console.log("cookies: ", cookies);

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
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="antialiased bg-[#091619]">
      {/* <!-- Sidebar --> */}
      <SideBar toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
      {/* Main Page */}
      <main
        className="md:ml-64 h-auto  "
        onClick={sidebarOpen ? toggleSidebar : undefined}
      >
        <div className="rounded-lg border-gray-600 h-full overflow-y-scroll no-scrollbar">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
