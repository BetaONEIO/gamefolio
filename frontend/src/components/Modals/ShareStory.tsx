"use client";
import { SVG } from "@/assets/SVG";
import { IMAGES } from "@/assets/images";
import { leagueGothic } from "@/font/font";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface ShareStoryProps {
  handleCloseModal: () => void; // Define handleCloseModal as a function
}

function ShareStory({ handleCloseModal }: ShareStoryProps) {
  const initialUsers = [
    { id: 1, name: "Mark Johnson", username: "john_smith", isSend: true },
    { id: 2, name: "Alice Smith", username: "alice", isSend: false },
    { id: 3, name: "Bob Williams", username: "bob", isSend: false },
    { id: 4, name: "Mark Johnson", username: "john_smith", isSend: false },
    { id: 5, name: "Alice Smith", username: "alice", isSend: false },
    { id: 6, name: "Bob Williams", username: "bob", isSend: false },
    { id: 7, name: "Mark Johnson", username: "john_smith", isSend: false },
    { id: 8, name: "Alice Smith", username: "alice", isSend: false },
    { id: 9, name: "Bob Williams", username: "bob", isSend: false },
    { id: 10, name: "Mark Johnson", username: "john_smith", isSend: false },
    { id: 11, name: "Alice Smith", username: "alice", isSend: false },
    { id: 12, name: "Bob Williams", username: "bob", isSend: false },
    // Add more users as needed
  ];

  const [users, setUsers] = useState(initialUsers);

  const handleUserButtonClick = (id: any) => {
    const updatedUsers = users?.map((user) =>
      user.id === id ? { ...user, isSend: !user.isSend } : user
    );
    setUsers(updatedUsers);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const element = document.getElementById("updateProductButton");
      if (element) {
        element.addEventListener("click", handleCloseModal);
        return () => {
          element.removeEventListener("click", handleCloseModal);
        };
      }
    }
  }, []);

  const myBGStyleModal = {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    backdropFilter: "blur(8px)",
  };

  return (
    <div
      style={myBGStyleModal}
      className="fixed inset-0 flex items-center justify-center z-50"
    >
      <div className="flex justify-center m-5">
        <button
          id="updateProductButton"
          className="block text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-[#091619] hover:bg-primary-700 focus:ring-primary-800"
          type="button"
          onClick={handleCloseModal}
        >
          Update product
        </button>
      </div>

      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="modal-container sm:w-96 mx-auto lg:w-4/12 z-50 overflow-y-auto">
          {" "}
          {/* Modal content */}
          <div className="relative text-center  rounded-lg bg-[#091619] py-3 px-3 sm:py-4 sm:px-8 border border-[#586769]">
            <button
              type="button"
              className="text-white-400 absolute top-2.5 right-2.5 bg-transparent  rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-600 hover:text-white"
              onClick={handleCloseModal}
            >
              <Image src={SVG.Exit} alt="exit" width={30} height={30} />
              <span className="sr-only">Close modal</span>
            </button>

            <h1
              className={`${leagueGothic.className} text-center text-3xl mb-5  text-white`}
            >
              SHARE STORY
            </h1>

            <div className="bg-[#1C2C2E] flex gap-2 px-4 items-center w-full sm:w-full rounded-lg overflow-hidden mb-2">
              <Image src={SVG.Search} alt="search" width={30} height={30} />
              <input
                className="w-full block p-2.5 outline-none bg-[#1C2C2E] "
                placeholder="Search"
              />
            </div>

            <div className="flex flex-col w-full sm:min-h-[350px] lg:min-h-[500px] max-h-[400px] sm:max-h-[350px] lg:max-h-[500px] overflow-y-auto no-scrollbar">
              {users?.map((user) => (
                <div key={user.id}>
                  <div className="flex items-center my-3">
                    <Image
                      className="object-contain"
                      src={IMAGES.Profile}
                      alt="Profile"
                      width={50}
                      height={50}
                    />
                    <div className="flex items-center justify-between w-full sm:w-full">
                      <div>
                        <span className="ml-2 sm:ml-4 text-sm sm:text-base">
                          {user.name}
                        </span>
                        <p className="ml-2 sm:ml-4 text-sm text-left">
                          {user.username}
                        </p>
                      </div>
                      <div>
                        <button
                          onClick={() => handleUserButtonClick(user.id)}
                          className={`${
                            user.isSend
                              ? "w-[100px] h-[50] font-bold bg-gradient-to-b from-[#62C860] to-[#37C535] text-white text-center py-[5px] px-[10px] rounded-tl-[20px] rounded-br-[20px] rounded-tr-[5px] rounded-bl-[5px] "
                              : "w-[100px] h-[50] font-bold bg-[#162423] text-white text-center py-[5px] px-[10px] rounded-tl-[20px] rounded-br-[20px] rounded-tr-[5px] rounded-bl-[5px] "
                          } rounded-lg p-2`}
                        >
                          {user.isSend ? "Send" : "Undo"}
                        </button>
                      </div>
                    </div>
                  </div>
                  <hr className="border-t border-[#162423]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShareStory;
