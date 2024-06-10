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
import CustomHeader from "@/components/CustomHeader/CustomHeader";

function Page() {
  const authState = useSelector((state: any) => state.auth.userData) || [];
  const [modalState, setModalState] = useState({
    isStatementModalOpen: false,
  });

  const totalCoinAmount = authState?.coins?.reduce(
    (total: any, user: any) => total + user.coinAmount,
    0
  );
  const sectionStyle = {
    backgroundImage: `linear-gradient(to bottom, rgba(4, 50, 12, 1), rgba(4, 50, 12, 0.1) 50%)`,
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
      <CustomHeader>MY FOLIO</CustomHeader>

      {/* Main */}
      <div style={sectionStyle} className="flex  justify-center h-full w-full ">
        <div className="mt-4 flex flex-col  lg:flex-row h-fit lg:h-5/6 w-11/12 overflow-y-auto md:overflow-hidden justify-center border border-[#1C2C2E] rounded-xl py-6 px-4 bg-[#091619] ">
          <div className="flex-1 flex flex-col gap-4 p-4 bg-black-200">
            <div className="flex flex-col gap-4 py-2">
              <span className="font-bold text-lg">Gamefolio Coin Wallet</span>
              {/* Card */}
              <div className="relative flex justify-between rounded-lg border-[0.12px] border-emerald-500 bg-gradient-to-br from-slate-900 to-slate-800 md:w-10/12 h-56 shrink-0 overflow-hidden p-4">
                {/* 1st col of ggcoin card  */}
                <div className="flex flex-col justify-between h-full">
                  <div className="flex items-center ">
                    <Image
                      className="sm:w-14 sm:h-14 w-5 h-5"
                      src={SVG.GGcoin}
                      alt="GGcoin"
                      width={56}
                      height={56}
                    />
                    <div
                      className={`${leagueGothic.className} text-2xl sm:text-4xl lg:text-4xl text-white`}
                    >
                      GAMEFOLIO
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-base sm:text-sm lg:text-base tracking-tighter text-white">
                      Profile Name
                    </span>
                    <span className="text-xl sm:text-sm lg:text-xl font-bold tracking-tighter text-white">
                      {authState?.name}
                    </span>
                  </div>
                </div>

                {/* 2nd col of ggcoin card  */}
                <div className="absolute inset-0 p-4">
                  <Image
                    className="w-full h-full "
                    src={SVG.MyFolioCardBG}
                    alt="Gamefolio"
                    width={56}
                    height={56}
                  />
                </div>

                {/* 3rd col of ggcoin card  */}
                <div className="flex flex-col justify-between items-end h-full">
                  <div className="flex items-center ">
                    <Image
                      className="sm:w-14 sm:h-14 w-10 h-10"
                      src={SVG.ChipCard}
                      alt="ChipCard"
                      width={56}
                      height={56}
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className=" text-base sm:text-sm lg:text-base tracking-tighter text-white">
                      Coin Balance:
                    </span>
                    <span className=" text-3xl sm:text-lg lg:text-3xl font-bold tracking-tighter text-white">
                      {`${totalCoinAmount}.00`}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <hr className="w-full border m-2 bg-gray-300 opacity-10" />
            <div>
              <Statement
                handleCloseModal={() =>
                  handleModalToggle("isStatementModalOpen")
                }
              />
            </div>
          </div>
          <hr className="h-[1px] lg:h-full lg:w-0 border m-2 bg-gray-700 opacity-10" />

          {/* transaction history */}
          <div className="flex-1 p-4 bg-black-50 overflow-y-scroll scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-green-300">
            <span className="text-white font-bold text-lg">
              Transaction History
            </span>

            {/* Coins section */}
            {authState?.coins?.map((user: any) => (
              <div key={user.id} className="flex flex-col gap-2">
                {/* Coins Item */}
                <div className="flex gap-2 items-center py-4 px-4 border-b border-gray-600">
                  <Image
                    src={SVG.CoinsAdd}
                    alt="GGcoin"
                    width={42}
                    height={42}
                  />
                  <div className="flex flex-col">
                    <span className="text-white">{user.coinType}</span>
                    <div className="flex items-center justify-between w-96">
                      <span className="text-[#7C7F80]">
                        {format(new Date(user.date), "dd MMM, yyyy - h:mm a")}
                      </span>
                      <span className="text-white">
                        {user.coinAmount} Coins
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
