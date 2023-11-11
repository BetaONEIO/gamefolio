"use client";
import { SVG } from "@/assets/SVG";
import { IMAGES } from "@/assets/images";
import { leagueGothic } from "@/font/font";
import Image from "next/image";
import { useState } from "react";

interface BlockUserProps {
  handleCloseModal: () => void; // Define handleCloseModal as a function
}

function BlockUser({ handleCloseModal }: BlockUserProps) {
  const initialUsers = [
    { id: 1, name: "Mark Johnson", username: "john_smith", isBlocked: false },
    { id: 2, name: "Alice Smith", username: "alice", isBlocked: false },
    { id: 3, name: "Bob Williams", username: "bob", isBlocked: false },
    { id: 4, name: "Mark Johnson", username: "john_smith", isBlocked: false },
    { id: 5, name: "Alice Smith", username: "alice", isBlocked: false },
    { id: 6, name: "Bob Williams", username: "bob", isBlocked: false },
    { id: 7, name: "Mark Johnson", username: "john_smith", isBlocked: false },
    { id: 8, name: "Alice Smith", username: "alice", isBlocked: false },
    { id: 9, name: "Bob Williams", username: "bob", isBlocked: false },
    // Add more users as needed
  ];
  const [users, setUsers] = useState(initialUsers);

  const handleUserButtonClick = (id: any) => {
    const updatedUsers = users.map((user) =>
      user.id === id ? { ...user, isBlocked: !user.isBlocked } : user
    );
    setUsers(updatedUsers);
  };

  const myBGStyleModal = {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    backdropFilter: "blur(8px)",
  };

  return (
    <>
      <div
        style={myBGStyleModal}
        className="fixed inset-0 flex items-center justify-center z-50"
      >
        <div className="modal-container w-80 sm:w-1/3 lg-rounded z-50 ">
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
              BLOCK USER
            </h1>

            <div className="flex flex-col w-full sm:min-h-[350px] lg:min-h-[500px] max-h-[400px] sm:max-h-[350px] lg:max-h-[500px] overflow-y-auto no-scrollbar">
              {users.map((user) => (
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
                            user.isBlocked
                              ? "w-[100px] h-[50] font-bold bg-[#37C535] text-white text-center py-[5px] px-[10px] rounded-tl-[20px] rounded-br-[20px] rounded-tr-[5px] rounded-bl-[5px] "
                              : "w-[100px] h-[50] font-bold bg-[#162423] text-white text-center py-[5px] px-[10px] rounded-tl-[20px] rounded-br-[20px] rounded-tr-[5px] rounded-bl-[5px] "
                          } rounded-lg p-2`}
                        >
                          {user.isBlocked ? "Unblock" : "Block"}
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
    </>
  );
}

export default BlockUser;
