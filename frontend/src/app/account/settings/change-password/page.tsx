import { ToastContainer } from "react-toastify";
import Setting from "../page";

const ChangePassword = () => {
  return (
    <Setting>
      {/* Header */}
      <div className="flex flex-col justify-between px-6 py-8  lg:py-0 h-full">
        <div className="flex flex-col w-full ">
          <div className="flex justify-start items-center mb-6">
            <span className="block font-bold mb-2 text-lg text-white">
              Edit Profile
            </span>
          </div>
          <form className="flex w-full flex-wrap gap-4 justify-start">
            <div className="flex-1 basis-full lg:basis-5/12 ">
              <label
                id="oldPassword"
                className="block font-bold mb-2 text-sm text-white"
              >
                Old Password
              </label>
              <input
                type="password"
                id="oldPassword"
                className="bg-[#162423] sm:text-sm outline-none rounded-lg block w-full p-2.5 text-white"
                placeholder="Old Password"
                required
              />
            </div>
            <div className="flex-1 basis-full lg:basis-5/12 ">
              <label
                htmlFor="newPassword"
                className="block mb-2 text-sm font-bold text-white"
              >
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                className="bg-[#162423] sm:text-sm outline-none rounded-lg block w-full p-2.5 text-white"
                placeholder="New Password"
                required
              />
            </div>
            <div className="basis-full lg:basis-6/12 ">
              <label
                htmlFor="repeatPassword"
                className="block mb-2 text-sm font-bold text-white"
              >
                Repeat New Password
              </label>
              <input
                type="password"
                id="repeatPassword"
                className="bg-[#162423] sm:text-sm outline-none rounded-lg block w-full p-2.5 text-white"
                placeholder="Repeat New Password"
                required
              />
            </div>
          </form>
        </div>
        <div className="w-full flex justify-center lg:justify-end gap-4">
          <span className="w-6/12 lg:w-4/12 font-bold h-12 bg-[#586769] text-white text-center rounded-tl-[20px] rounded-br-[20px] rounded-tr-[5px] rounded-bl-[5px] mb-3 flex justify-center items-center cursor-pointer">
            Cancel
          </span>
          <button className="w-6/12 lg:w-4/12 font-bold h-12 bg-gradient-to-b from-[#62C860] to-[#37C535] text-white text-center rounded-tl-[20px] rounded-br-[20px] rounded-tr-[5px] rounded-bl-[5px] mb-3">
            Update
          </button>
        </div>
      </div>
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
    </Setting>
  );
};

export default ChangePassword;
