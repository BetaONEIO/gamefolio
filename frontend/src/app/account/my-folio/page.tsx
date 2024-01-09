"use client";
import { useState } from "react";
import Image from "next/image";
import { SVG } from "@/assets/SVG";
import Layout from "@/components/CustomLayout/layout";
import Modal from "@/components/Modals/Modal";
import Statement from "@/components/Modals/Statement";
import { leagueGothic } from "@/font/font";
import { useSelector } from "@/store";
import { format } from "date-fns";

function Page() {
  const authState = useSelector((state: any) => state.auth.userData) || [];
  const [modalState, setModalState] = useState({
    isStatementModalOpen: false,
  });
  console.log("authState!!", authState);

  // Calculate total coin amount
  const totalCoinAmount = authState?.coins?.reduce(
    (total: any, user: any) => total + user.coinAmount,
    0
  );
  const sectionStyle = {
    backgroundImage: `linear-gradient(to bottom, rgba(4, 50, 12, 1), rgba(4, 50, 12, 0) 50%)`,
  };

  const handleModalToggle = (modalName: keyof typeof modalState) => {
    setModalState((prevState) => ({
      ...prevState,
      [modalName]: !prevState[modalName],
    }));
  };
  return (
    <Layout>
      {/* Header */}
      <div className="flex flex-col gap-8 items-center px-6 pt-2 pb-8 bg-[#091619]">
        <div className="flex justify-between items-center w-full mx-4">
          <div>
            <h1 className={`${leagueGothic.className} text-4xl`}>MY FOLIO</h1>
          </div>
          <div className="flex items-center my-3 mx-2">
            <div
              onClick={() => handleModalToggle("isStatementModalOpen")}
              className="flex items-center p-2 mr-2 rounded-full bg-[#162423]"
            >
              <Image
                className="mr-2"
                src={SVG.Statement}
                alt="GGcoin"
                width={22}
                height={22}
              />
              <p className="font-semibold text-sm pr-2">Download Statement</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-7/12 p-2 ">
          <div className="flex flex-col items-center w-full bg-[#1FDE1F] p-6 rounded-xl">
            <span className="text-black text-sm font-normal">
              Your Coin Balance
            </span>
            <span className="text-black text-xl font-bold">
              {totalCoinAmount}.00
            </span>
          </div>
        </div>
      </div>

      {/* Main */}
      <div
        style={sectionStyle}
        className="flex flex-col  items-center py-6 bg-[#091619]"
      >
        <div className="flex flex-col w-7/12  p-2">
          <span className="text-white">Transcation History</span>
          {/* Coins section */}
          {authState?.coins?.map((user: any) => (
            <div key={user.id} className="flex flex-col gap-2">
              {/* Coins Item */}
              <div className="flex gap-2 justify-between items-center py-4 px-4 border-b border-gray-600">
                <Image src={SVG.CoinsAdd} alt="GGcoin" width={42} height={42} />
                <span className="text-white">{user.coinType}</span>
                <span className="text-[#7C7F80]">
                  {format(new Date(user.date), "dd MMM, yyyy - h:mm a")}
                </span>
                <span className="text-white">{user.coinAmount} Coins</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal
        isOpen={modalState.isStatementModalOpen}
        handleClose={() => handleModalToggle("isStatementModalOpen")}
      >
        <Statement
          handleCloseModal={() => handleModalToggle("isStatementModalOpen")}
        />
      </Modal>
    </Layout>
  );
}

export default Page;
