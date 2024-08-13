"use client";
import SideBar from "@/components/sideBar/SideBar";
import { ROUTES } from "@/labels/routes";
import { dispatch, useSelector } from "@/store";
import { userSession } from "@/store/slices/authSlice";
import { getCookieValue, getFromLocal } from "@/utils/localStorage";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";
import Modal from "../Modals/Modal";
import Username from "../Modals/Username";

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();
  const authState = useSelector((state: any) => state.auth.userData) || [];
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalState, setModalState] = useState({
    isUsernameModalOpen: false,
  });

  const handleModalToggle = (modalName: keyof typeof modalState) => {
    setModalState((prevState) => ({
      ...prevState,
      [modalName]: !prevState[modalName],
    }));
  };

  const cookies = getCookieValue("gfoliotoken");
  console.log("cookies: ", cookies);
  console.log("authState: ", authState);

  const payload = {
    userToken: getFromLocal("@token") || getCookieValue("gfoliotoken"),
  };
  const params = {
    payload,
  };
  useEffect(() => {
    const fetchUserSession = async () => {
      if (getFromLocal("@token") || cookies) {
        await dispatch(userSession(params));
      } else {
        router.replace(ROUTES.login);
      }
    };

    fetchUserSession();
  }, []); // Only run this on mount

  useEffect(() => {
    if (authState) {
      checkUsername();
    }
  }, [authState]); // Run this when authState changes

  const checkUsername = () => {
    console.log("myAuth: ", authState);
    if (authState.length !== 0) {
      console.log("ss: ", authState.hasOwnProperty("username"));
      if (
        !authState.hasOwnProperty("username") ||
        authState?.username?.trim() === ""
      ) {
        console.log("eee");
        handleModalToggle("isUsernameModalOpen");
      }
    }
  };

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
      <Modal
        isOpen={modalState.isUsernameModalOpen}
        handleClose={() => handleModalToggle("isUsernameModalOpen")}
      >
        <Username
          handleCloseModal={() => handleModalToggle("isUsernameModalOpen")}
        />
      </Modal>
    </div>
  );
};

export default Layout;
