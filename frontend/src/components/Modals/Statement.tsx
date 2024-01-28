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
  const myBGStyleModal = {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    backdropFilter: "blur(8px)",
  };

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

      <div className=" p-4 text-center rounded-lg bg-[#091619] sm:p-5">
        <h1 className={`${leagueGothic.className} text-3xl mb-7 text-white`}>
          GET STATEMENT
        </h1>

        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm text-left font-medium text-white"
          >
            Select Date Range
          </label>
          <input
            type="date"
            placeholder="Start Date"
            name="date"
            id="date"
            className="bg-[#162423] sm:text-sm rounded-lg outline-none block w-full p-3 text-white"
            value={startDate}
            onChange={handleStartDateChange}
            required
          />
        </div>

        <div>
          <input
            type="date"
            name="date"
            id="date"
            className="bg-[#162423] sm:text-sm rounded-lg outline-none block w-full p-3 text-white my-3"
            placeholder="End Date"
            value={endDate}
            onChange={handleEndDateChange}
            required
          />
        </div>

        <button
          onClick={() => handleModalToggle("isTransactionModalOpen")}
          className="w-full h-[50] bg-[#37C535] text-white text-center py-[10px] px-[30px] rounded-tl-[20px] rounded-br-[20px] rounded-tr-[5px] rounded-bl-[5px] mb-3"
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
