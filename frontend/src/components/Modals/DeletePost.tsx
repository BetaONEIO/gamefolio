import { leagueGothic } from "@/font/font";

// interface DeleteAccountProps {
//   handleCloseModal: () => void; // Define handleCloseModal as a function
// }

function DeletePost() {
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
        <div className="modal-container w-[410px] mx-auto lg-rounded z-50 ">
          {/* Modal content */}

          <div className="relative text-center justify-center bg-white rounded-lg  dark:bg-[#091619] p-5 sm:p-5 border dark:border-[#586769]">
            <h1
              className={`${leagueGothic.className} text-3xl mb-7  dark:text-white`}
            >
              DELETE ACCOUNT
            </h1>

            <div className="w-full mb-4 sm:mb-5">
              <p className="text-md">Are you sure you want to Delete Post?</p>
            </div>

            <div className="flex flex-col items-center mb-2 sm:mb-2 ">
              <button className="w-1/2 h-[50] font-bold bg-[#162423] text-white text-center py-[10px] px-[30px] rounded-tl-[20px] rounded-br-[20px] rounded-tr-[5px] rounded-bl-[5px] mb-3">
                Yes
              </button>
              <button className="w-1/2 h-[50] font-bold bg-[#37C535] text-white text-center py-[10px] px-[30px] rounded-tl-[20px] rounded-br-[20px] rounded-tr-[5px] rounded-bl-[5px] ">
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeletePost;
