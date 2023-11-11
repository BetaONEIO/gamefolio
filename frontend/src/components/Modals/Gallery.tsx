"use client";
import { SVG } from "@/assets/SVG";
import { IMAGES } from "@/assets/images";
import { leagueGothic } from "@/font/font";
import Image from "next/image";
import React, { useEffect, useState } from "react";

function Gallery() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const element = document.getElementById("updateProductButton");
      if (element) {
        element.addEventListener("click", handleUpdateButtonClick);
        return () => {
          element.removeEventListener("click", handleUpdateButtonClick);
        };
      }
    }
  }, []);

  const popular = [
    { id: 1, IMAGE: IMAGES.Popular },
    { id: 2, IMAGE: IMAGES.Popular1 },
    { id: 3, IMAGE: IMAGES.Popular1 },
    { id: 4, IMAGE: IMAGES.Popular },
    { id: 5, IMAGE: IMAGES.Popular1 },
    { id: 6, IMAGE: IMAGES.Popular1 },
    { id: 7, IMAGE: IMAGES.Popular },
    { id: 8, IMAGE: IMAGES.Popular1 },
    { id: 9, IMAGE: IMAGES.Popular1 },
    { id: 10, IMAGE: IMAGES.Popular1 },
  ];

  const [checkboxes, setCheckboxes] = useState(
    popular.map((game) => ({ id: game.id, isChecked: false }))
  );

  const handleCheckboxClick = (id: any) => {
    const updatedCheckboxes = checkboxes.map((checkbox) =>
      checkbox.id === id
        ? { ...checkbox, isChecked: !checkbox.isChecked }
        : checkbox
    );
    setCheckboxes(updatedCheckboxes);
  };

  const handleUpdateButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex justify-center m-5">
        <button
          id="updateProductButton"
          className="block text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-[#091619] dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          type="button"
          onClick={handleUpdateButtonClick}
        >
          Update product
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-container sm:w-96 mx-auto lg:w-4/12 z-50 overflow-y-auto">
            {/* Modal content */}
            <div className="relative text-center bg-white rounded-lg dark:bg-[#091619] py-3 px-3 sm:py-4 sm:px-8 border dark:border-[#586769]">
              <button
                type="button"
                className="text-white-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={handleCloseModal}
              >
                <Image src={SVG.Exit} alt="exit" width={30} height={30} />
                <span className="sr-only">Close modal</span>
              </button>

              <h1
                className={`${leagueGothic.className} text-center text-3xl mb-5  dark:text-white`}
              >
                GALLERY
              </h1>

              <div className="flex flex-col w-full sm:min-h-[350px] lg:min-h-[500px] max-h-[400px] sm:max-h-[350px] lg:max-h-[500px] overflow-y-auto no-scrollbar">
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 my-2 p-2">
                  {popular.map((game) => (
                    <div key={game.id} className="relative">
                      <Image
                        src={game.IMAGE}
                        alt="Popular"
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="h-36 w-64 object-cover rounded-xl"
                      />
                      <span className="absolute bottom-2 right-2">8:31</span>
                      {checkboxes.map((checkbox) => (
                        <Image
                          key={checkbox.id}
                          src={checkbox.isChecked ? SVG.Tick : SVG.Untick}
                          alt="logo"
                          onClick={() => handleCheckboxClick(checkbox.id)}
                          className={`text-green-500 ${
                            checkbox.isChecked ? "cursor-pointer" : ""
                          } absolute top-2 right-2`}
                          width={20}
                          height={20}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-center w-full mt-4">
                <button className="sm:w-1/2 sm:h-6/12 sm:text-base bg-[#37C535] text-white text-center py-[7px] rounded-tl-[20px] rounded-br-[20px] rounded-tr-[5px] rounded-bl-[5px] mb-3">
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Gallery;
