"use client";
import { SVG } from "@/assets/SVG";
import { leagueGothic } from "@/font/font";
import Image from "next/image";

// interface StatementProps {
//   handleCloseModal: () => void; // Define handleCloseModal as a function
// }

function Statement() {
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
        <div className="modal-container w-full sm:w-2/3 md:w-1/2 lg:w-1/5 mx-auto lg-rounded z-50 overflow-y-auto">
          {/* Modal content */}

          <div className="relative p-4 text-center bg-white rounded-lg  dark:bg-[#091619] sm:p-5">
            <button
              type="button"
              className="text-white-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="deleteAlertModal"
              // onClick={handleCloseModal}
            >
              <Image src={SVG.Exit} alt="exit" width={30} height={30} />
              <span className="sr-only">Close modal</span>
            </button>

            <h1
              className={`${leagueGothic.className} text-3xl mb-7  dark:text-white`}
            >
              GET STATEMENT
            </h1>

            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm text-left font-medium text-gray-900 dark:text-white"
                >
                  Select Date Range
                </label>
                <input
                  type="date"
                  placeholder="Start Date"
                  name="date"
                  id="date"
                  className="bg-[#162423] sm:text-sm rounded-lg outline-none block w-full p-3 dark:text-white"
                  required
                />
              </div>

              <div>
                <input
                  type="date"
                  name="date"
                  id="date"
                  className="bg-[#162423] sm:text-sm rounded-lg outline-none block w-full p-3 dark:text-white"
                  placeholder="End Date"
                  required
                />
              </div>

              <button className="w-full h-[50] bg-[#37C535] text-white text-center py-[10px] px-[30px] rounded-tl-[20px] rounded-br-[20px] rounded-tr-[5px] rounded-bl-[5px] mb-3">
                Generate
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Statement;
