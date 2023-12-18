"use client";
import { SVG } from "@/assets/SVG";
import Layout from "@/components/CustomLayout/layout";
import BlockUser from "@/components/Modals/BlockUser";
import ChangePassword from "@/components/Modals/ChangePassword";
import FeedBack from "@/components/Modals/FeedBack";
import LogOut from "@/components/Modals/LogOut";
import Modal from "@/components/Modals/Modal";
import PrivacyPolicy from "@/components/Modals/PrivacyPolicy";
import TermsModal from "@/components/Modals/TermsModal";
import Verifications from "@/components/Modals/Verifications";
import { leagueGothic } from "@/font/font";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense, useState } from "react";
import Loading from "./loading";
import { toastError } from "@/components/Toast/Toast";
import { ToastContainer } from "react-toastify";

function Setting() {
  const [modalState, setModalState] = useState({
    isChangePasswordOpen: false,
    isTermsModalOpen: false,
    isPolicyModalOpen: false,
    isVerificationModalOpen: false,
    isSendFeedbackModalOpen: false,
    isBlockUserModalOpen: false,
    isLogoutModalOpen: false,
  });

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

  return (
    <Layout>
      <Suspense fallback={<Loading />}>
        {/* Header */}
        <div className="flex items-center py-6 bg-[#091619]">
          <div className="flex justify-between items-center w-full mx-4 ">
            <div className="flex gap-4 items-center">
              <h1 className={`${leagueGothic.className} text-4xl text-white`}>
                SETTINGS
              </h1>
              <Image
                className="hover:opacity-80 cursor-pointer"
                src={SVG.SettingHeader}
                alt="Settings"
                width={32}
                height={32}
              />
            </div>
          </div>
        </div>

        {/* Body */}
        <div
          style={sectionStyle}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 w-full p-8"
        >
          {/* Box 1 */}
          <Link
            href="/edit"
            className="text-md sm:text-md lg:text-md hover:opacity-80 cursor-pointer"
          >
            <div className="hover:opacity-80 cursor-pointer bg-[#08191D] h-40 sm:h-44 md:h-44 lg:h-44 xl:h-44 p-4 rounded-xl">
              <div className="flex flex-col gap-2 justify-center h-full">
                <Image
                  src={SVG.Profile}
                  alt="Edit Profile"
                  width={42}
                  height={42}
                />
                <span className="font-semibold text-white">Edit Profile</span>
              </div>
            </div>
          </Link>

          {/* Box 2 */}
          <div
            className="hover:opacity-80 cursor-pointer bg-[#08191D] h-40 sm:h-44 md:h-44 lg:h-44 xl:h-44 p-4 rounded-xl"
            onClick={() => handleModalToggle("isChangePasswordOpen")}
          >
            <div className="flex flex-col gap-2 justify-center h-full">
              <Image
                src={SVG.ChangePassword}
                alt="Change Password"
                width={42}
                height={42}
              />
              <span className="font-semibold text-white">Change Password</span>
            </div>
          </div>

          {/* Box 3 */}
          <div
            className="hover:opacity-80 cursor-pointer bg-[#08191D] h-40 sm:h-44 md:h-44 lg:h-44 xl:h-44 p-4 rounded-xl"
            onClick={() => handleModalToggle("isTermsModalOpen")}
          >
            <div className="flex flex-col gap-2 justify-center h-full">
              <Image
                src={SVG.TermCondition}
                alt="Term & Condition"
                width={42}
                height={42}
              />
              <span className="font-semibold text-white">
                Terms & Conditions
              </span>
            </div>
          </div>

          {/* Box 4 */}
          <div
            className="hover:opacity-80 cursor-pointer bg-[#08191D] h-40 sm:h-44 md:h-44 lg:h-44 xl:h-44 p-4 rounded-xl"
            onClick={() => handleModalToggle("isTermsModalOpen")}
          >
            <div className="flex flex-col gap-2 justify-center h-full">
              <Image
                src={SVG.PrivacyPolicy}
                alt="Privacy Policy"
                width={42}
                height={42}
              />
              <span className="font-semibold text-white">Privacy Policy</span>
            </div>
          </div>

          {/* Box 5 */}
          <div
            className="hover:opacity-80 cursor-pointer bg-[#08191D] h-40 sm:h-44 md:h-44 lg:h-44 xl:h-44 p-4 rounded-xl"
            onClick={() => handleModalToggle("isVerificationModalOpen")}
          >
            <div className="flex flex-col gap-2 justify-center h-full">
              <Image
                src={SVG.Verification}
                alt="Verification"
                width={42}
                height={42}
              />
              <span className="font-semibold text-white">Verification</span>
            </div>
          </div>

          {/* Box 6 */}
          <div
            className="hover:opacity-80 cursor-pointer bg-[#08191D] h-40 sm:h-44 md:h-44 lg:h-44 xl:h-44 p-4 rounded-xl"
            onClick={() => handleModalToggle("isSendFeedbackModalOpen")}
          >
            <div className="flex flex-col gap-2 justify-center h-full">
              <Image
                src={SVG.SendFeedback}
                alt="Send Feedback"
                width={42}
                height={42}
              />
              <span className="font-semibold text-white">Send Feedback</span>
            </div>
          </div>

          {/* Box 7 */}
          <div
            className="hover:opacity-80 cursor-pointer bg-[#08191D] h-40 sm:h-44 md:h-44 lg:h-44 xl:h-44 p-4 rounded-xl"
            onClick={() => handleModalToggle("isBlockUserModalOpen")}
          >
            <div className="flex flex-col gap-2 justify-center h-full">
              <Image
                src={SVG.BlockUser}
                alt="Block User"
                width={42}
                height={42}
              />
              <span className="font-semibold text-white">Block Users</span>
            </div>
          </div>

          {/* Box 8 */}
          <div
            className="hover:opacity-80 cursor-pointer bg-[#08191D] h-40 sm:h-44 md:h-44 lg:h-44 xl:h-44 p-4 rounded-xl"
            onClick={() => handleModalToggle("isLogoutModalOpen")}
          >
            <div className="flex flex-col gap-2 justify-center h-full">
              <Image src={SVG.Logout} alt="Logout" width={42} height={42} />
              <span className="font-semibold text-white">Logout</span>
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
          isOpen={modalState.isTermsModalOpen}
          handleClose={() => handleModalToggle("isTermsModalOpen")}
        >
          <TermsModal
            handleCloseModal={() => handleModalToggle("isTermsModalOpen")}
          />
        </Modal>

        <Modal
          isOpen={modalState.isPolicyModalOpen}
          handleClose={() => handleModalToggle("isPolicyModalOpen")}
        >
          <PrivacyPolicy
            handleCloseModal={() => handleModalToggle("isPolicyModalOpen")}
          />
        </Modal>

        <Modal
          isOpen={modalState.isVerificationModalOpen}
          handleClose={() => handleModalToggle("isVerificationModalOpen")}
        >
          <Verifications
            handleCloseModal={() =>
              handleModalToggle("isVerificationModalOpen")
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
