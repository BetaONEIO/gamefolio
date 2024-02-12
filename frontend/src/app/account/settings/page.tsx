"use client";
import React, { Suspense, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SVG } from "@/assets/SVG";
import Layout from "@/components/CustomLayout/layout";
import BlockUser from "@/components/Modals/BlockUser";
import ChangePassword from "@/components/Modals/ChangePassword";
import FeedBack from "@/components/Modals/FeedBack";
import LogOut from "@/components/Modals/LogOut";
import Modal from "@/components/Modals/Modal";
import { leagueGothic } from "@/font/font";
import Loading from "./loading";
import { toastError } from "@/components/Toast/Toast";
import { ToastContainer } from "react-toastify";
import CustomHeader from "@/components/CustomHeader/CustomHeader";
import { usePathname } from "next/navigation";

function Setting({ children }: any) {
  const [modalState, setModalState] = useState({
    isChangePasswordOpen: false,
    isTermsModalOpen: false,
    isPolicyModalOpen: false,
    isVerificationModalOpen: false,
    isSendFeedbackModalOpen: false,
    isBlockUserModalOpen: false,
    isLogoutModalOpen: false,
  });

  const currentRoute = usePathname();

  const sectionStyle = {
    backgroundImage: `linear-gradient(to bottom, rgba(4, 50, 12, 1), rgba(4, 50, 12, 0) 30%)`,
  };

  const handleModalToggle = (
    modalName: keyof typeof modalState,
    error?: string
  ) => {
    if (error) {
      toastError(error);
    }
    setModalState((prevState) => ({
      ...prevState,
      [modalName]: !prevState[modalName],
    }));
  };

  const isItemActive = (path: string) => {
    return currentRoute === path ? true : false;
  };

  return (
    <Layout>
      <Suspense fallback={<Loading />}>
        {/* Header */}
        <CustomHeader>SETTINGS</CustomHeader>

        {/* Body */}
        <div style={sectionStyle} className="h-screen w-full p-8">
          <div className="flex flex-col md:flex-row bg-[#091619] h-5/6 w-full   border border-[#1C2C2E] rounded-lg p-6   ">
            <div className="flex md:flex-col gap-2 bg-[#091619] overflow-y-scroll no-scrollbar">
              {/* Box 1 */}
              <Link href="/account/settings/edit-profile">
                <div className="hover:opacity-80 cursor-pointer bg-[#091619] h-fit p-4 rounded-xl">
                  <div className="flex flex-col md:flex-row  gap-2 justify-start items-center h-full">
                    <Image
                      className="text-green-500 fill-current"
                      src={SVG.Profile}
                      alt="Edit Profile"
                      width={42}
                      height={42}
                    />
                    <span
                      className={`text-xs text-center md:text-base font-semibold ${
                        isItemActive("/account/settings/edit-profile")
                          ? "text-[#43DD4E]"
                          : "text-white"
                      }`}
                    >
                      Edit Profile
                    </span>
                  </div>
                </div>
              </Link>

              {/* Box 2 */}
              <Link href="/account/settings/change-password">
                <div
                  className="hover:opacity-80 cursor-pointer bg-[#091619] h-fit p-4 rounded-xl"
                  // onClick={() => handleModalToggle("isChangePasswordOpen")}
                >
                  <div className="flex flex-col md:flex-row gap-2 justify-start items-center h-full">
                    <Image
                      src={SVG.ChangePassword}
                      alt="Change Password"
                      width={42}
                      height={42}
                    />
                    <span
                      className={`text-xs text-center md:text-base font-semibold ${
                        isItemActive("/account/settings/change-password")
                          ? "text-[#43DD4E]"
                          : "text-white"
                      }`}
                    >
                      Change Password
                    </span>
                  </div>
                </div>
              </Link>
              {/* Box 3 */}
              <Link href="/account/settings/terms-condition">
                <div className="hover:opacity-80 cursor-pointer bg-[#091619] h-fit p-4 rounded-xl">
                  <div className="flex flex-col md:flex-row gap-2 justify-start items-center h-full">
                    <Image
                      src={SVG.TermCondition}
                      alt="Edit Profile"
                      width={42}
                      height={42}
                    />
                    <span
                      className={`text-xs text-center md:text-base font-semibold ${
                        isItemActive("/account/settings/terms-condition")
                          ? "text-[#43DD4E]"
                          : "text-white"
                      }`}
                    >
                      Terms & Conditions
                    </span>
                  </div>
                </div>
              </Link>
              {/* Box 4 */}
              <Link href="/account/settings/privacy-policy">
                <div className="hover:opacity-80 cursor-pointer bg-[#091619] h-fit p-4 rounded-xl">
                  <div className="flex flex-col md:flex-row gap-2 justify-start items-center h-full">
                    <Image
                      src={SVG.PrivacyPolicy}
                      alt=" Privacy Policy"
                      width={42}
                      height={42}
                    />
                    <span
                      className={`text-xs text-center md:text-base font-semibold ${
                        isItemActive("/account/settings/privacy-policy")
                          ? "text-[#43DD4E]"
                          : "text-white"
                      }`}
                    >
                      Privacy Policy
                    </span>
                  </div>
                </div>
              </Link>
              {/* Box 5 */}
              <Link href="/account/settings/verification">
                <div className="hover:opacity-80 cursor-pointer bg-[#091619] h-fit p-4 rounded-xl">
                  <div className="flex flex-col md:flex-row gap-2 justify-start items-center h-full">
                    <Image
                      src={SVG.Verification}
                      alt="Verifications"
                      width={42}
                      height={42}
                    />
                    <span
                      className={`text-xs text-center md:text-base font-semibold ${
                        isItemActive("/account/settings/verification")
                          ? "text-[#43DD4E]"
                          : "text-white"
                      }`}
                    >
                      Verifications
                    </span>
                  </div>
                </div>
              </Link>
              {/* Box 6 */}
              <div className="hover:opacity-80 cursor-pointer bg-[#091619] h-fit p-4 rounded-xl">
                <div className="flex flex-col md:flex-row gap-2 justify-start items-center h-full">
                  <Image
                    src={SVG.SendFeedback}
                    alt="Send Feedback"
                    width={42}
                    height={42}
                  />
                  <span className="text-xs text-center md:text-base font-semibold text-white">
                    Send Feedback
                  </span>
                </div>
              </div>
              {/* Box 7 */}
              <div className="hover:opacity-80 cursor-pointer bg-[#091619] h-fit p-4 rounded-xl">
                <div className="flex flex-col md:flex-row gap-2 justify-start items-center h-full">
                  <Image
                    src={SVG.BlockUser}
                    alt="Block Users"
                    width={42}
                    height={42}
                  />
                  <span className="text-xs text-center md:text-base font-semibold text-white">
                    Block Users
                  </span>
                </div>
              </div>
              {/* Box 8 */}
              <div
                className="hover:opacity-80 cursor-pointer bg-[#091619] h-fit p-4 rounded-xl"
                onClick={() => handleModalToggle("isLogoutModalOpen")}
              >
                <div className="flex flex-col md:flex-row gap-2 justify-start items-center h-full">
                  <Image src={SVG.Logout} alt="Logout" width={42} height={42} />
                  <span className="text-xs text-center md:text-base font-semibold text-white">
                    Logout
                  </span>
                </div>
              </div>
            </div>
            <hr className="w-full md:h-full md:w-0 border m-2 bg-gray-300 opacity-10" />
            {/* Dynamic Content */}
            <div className=" flex-1 overflow-y-scroll no-scrollbar">
              {children}
            </div>
          </div>
        </div>

        {/* Modals */}

        <Modal
          isOpen={modalState.isChangePasswordOpen}
          handleClose={() => handleModalToggle("isChangePasswordOpen")}
        >
          <ChangePassword
            handleCloseModal={(error?: string) =>
              handleModalToggle("isChangePasswordOpen", error)
            }
          />
        </Modal>

        <Modal
          isOpen={modalState.isSendFeedbackModalOpen}
          handleClose={() => handleModalToggle("isSendFeedbackModalOpen")}
        >
          <FeedBack
            handleCloseModal={() =>
              handleModalToggle("isSendFeedbackModalOpen")
            }
          />
        </Modal>

        <Modal
          isOpen={modalState.isBlockUserModalOpen}
          handleClose={() => handleModalToggle("isBlockUserModalOpen")}
        >
          <BlockUser
            handleCloseModal={() => handleModalToggle("isBlockUserModalOpen")}
          />
        </Modal>

        <Modal
          isOpen={modalState.isLogoutModalOpen}
          handleClose={() => handleModalToggle("isLogoutModalOpen")}
        >
          <LogOut
            handleCloseModal={() => handleModalToggle("isLogoutModalOpen")}
          />
        </Modal>
      </Suspense>
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
    </Layout>
  );
}

export default Setting;
