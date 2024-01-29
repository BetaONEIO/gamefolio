"use client";
import { useState } from "react";
import Image from "next/image";
import { SVG } from "@/assets/SVG";
import { leagueGothic } from "@/font/font";
import Modal from "./Modal";
import Transaction from "./Transaction";

interface StatementProps {
  handleCloseModal: any;
}

function Statement({ handleCloseModal }: StatementProps) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [modalState, setModalState] = useState({
    isTransactionModalOpen: false,
  });
  const statementCalendarIconStyle = {};

  const handleStartDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value);
  };

  const handleModalToggle = (modalName: keyof typeof modalState) => {
    setModalState((prevState) => ({
      ...prevState,
      [modalName]: !prevState[modalName],
    }));
  };

  return (
    <>
      {/* Modal content */}

      <div className="flex flex-col gap-4 p-4 text-start rounded-lg bg-[#091619] sm:p-5">
        <h1 className={`tracking-tighter font-bold text-base  text-white`}>
          Get Statement
        </h1>
        <div className="flex flex-col items-between justify-center md:flex-row md:justify-between md:items-center gap-4 ">
          <div className="flex flex-col gap-2 ">
            <label
              htmlFor="fromDate"
              className="block  text-xs text-left font-medium text-gray-400"
            >
              From Date
            </label>
            <input
              type="date"
              placeholder="Start Date"
              id="fromDate"
              className="bg-[#162423] sm:text-sm rounded-lg outline-none block w-full p-3 text-white "
              value={startDate}
              onChange={handleStartDateChange}
              required
            />
          </div>
          <div className="flex justify-center">
            <Image
              className="sm:w-8 sm:h-8 w-6 h-6"
              src={SVG.Arrow}
              alt="GGcoin"
              width={56}
              height={56}
            />
          </div>

          <div className="flex flex-col gap-2 ">
            <label
              htmlFor="toDate"
              className="block  text-xs text-left font-medium text-gray-400"
            >
              To Date
            </label>
            <input
              type="date"
              id="toDate"
              className="bg-[#162423] sm:text-sm rounded-lg outline-none block w-full p-3 text-white "
              placeholder="End Date"
              value={endDate}
              onChange={handleEndDateChange}
              required
            />
          </div>
        </div>

        <button
          onClick={() => handleModalToggle("isTransactionModalOpen")}
          className="w-full h-[50] bg-[#37C535] text-white text-center py-[10px] px-[30px] rounded-tl-[20px] rounded-br-[20px] rounded-tr-[5px] rounded-bl-[5px] mb-3 tracking-tighter font-bold"
        >
          Generate
        </button>
      </div>

      <Modal
        isOpen={modalState.isTransactionModalOpen}
        handleClose={() => handleModalToggle("isTransactionModalOpen")}
      >
        <Transaction
          handleCloseModal={() => handleModalToggle("isTransactionModalOpen")}
          startDate={startDate}
          endDate={endDate}
        />
      </Modal>
    </>
  );
}

export default Statement;
