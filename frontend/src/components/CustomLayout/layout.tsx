"use client";
import SideBar from "@/components/sideBar/SideBar";
import { ROUTES } from "@/labels/routes";
import { dispatch, useSelector } from "@/store";
import { userSession } from "@/store/slices/authSlice";
import { getCookieValue, getFromLocal } from "@/utils/localStorage";
import { usePathname, useRouter } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";
import Modal from "../Modals/Modal";
import Username from "../Modals/Username";

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const cookies = getCookieValue("gfoliotoken");
  const authState = useSelector((state: any) => state.auth.userData) || [];
  const [showSidebar, setShowSidebar] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalState, setModalState] = useState({
    isUsernameModalOpen: false,
  });

  const handleModalToggle = (
    modalName: keyof typeof modalState,
    value: boolean
  ) => {
    setModalState((prevState) => ({
      ...prevState,
      [modalName]: value,
    }));
  };

  const shouldHideSidebar =
    pathname.includes(ROUTES.mygamefolio) &&
    !getFromLocal("@token") &&
    !cookies;

 
 

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
        const excludedRoute = ROUTES.mygamefolio; // Replace with the actual route you want to exclude
        if (pathname.includes(excludedRoute)) {
          // Skip session check for this route
          setShowSidebar(false);
          return;
        }
        router.replace(ROUTES.login);
      }
    };

    fetchUserSession();
  }, [modalState.isUsernameModalOpen]); // Only run this on mount

  useEffect(() => {
    if (authState) {
      checkUsername();
    }
  }, [authState]); // Run this when authState changes

  const checkUsername = () => {
    if (Object.keys(authState).length !== 0) {
      if (
        authState.hasOwnProperty("username") === false ||
        authState?.username?.trim() === "" ||
        authState?.name?.trim() === "" ||
        authState.hasOwnProperty("name") === false
      ) {
        handleModalToggle("isUsernameModalOpen", true);
      } else {
        handleModalToggle("isUsernameModalOpen", false);
      }
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

 

  return (
    <div className="antialiased bg-[#091619]">
      {/* <!-- Sidebar --> */}

      {!shouldHideSidebar && (
        <SideBar toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
      )}

      {/* Main Page */}
      <main
        className={`${showSidebar && !shouldHideSidebar && "md:ml-64"} h-auto`}
        onClick={sidebarOpen ? toggleSidebar : undefined}
      >
        <div className="rounded-lg border-gray-600 h-fit overflow-y-auto  no-scrollbar">
          {children}
        </div>
      </main>
      <Modal
        isOpen={modalState.isUsernameModalOpen}
        handleClose={() => handleModalToggle("isUsernameModalOpen", false)}
      >
        <Username
          handleCloseModal={() =>
            handleModalToggle("isUsernameModalOpen", false)
          }
        />
      </Modal>
    </div>
  );
};

export default Layout;
