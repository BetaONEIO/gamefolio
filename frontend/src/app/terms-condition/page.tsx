import CustomBackground from "@/components/CustomBackground/custombackground";
import { leagueGothic } from "@/font/font";
import React from "react";

const TermsCondition = () => {
  return (
    <CustomBackground>
      <div className="flex flex-col items-center justify-center px-6 py-8 h-screen ">
        <div className="p-8 space-y-4 h-fit w-96 bg-[#091619] rounded-xl border border-[#1C2C2E]">
          <div className="flex flex-col">
            <h1 className={`${leagueGothic.className} text-4xl`}>
              TERMS OF USE
            </h1>
            <hr className="w-10 border-t-4 border-[#43DD4E] rounded-lg my-2" />
            <hr className="border-t border-gray-700 my-2" />
          </div>

          <div className="flex flex-col gap-4 justify-center p-2 items-start">
            <div className="flex items-start mt-3 mr-4">
              <input
                id="pending"
                type="checkbox"
                value=""
                name="show-only"
                className="w-4 h-4  text-primary-600 focus:ring-primary-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
              />
              <label
                htmlFor="pending"
                className="ml-2 text-sm font-medium text-gray-300"
              >
                You agree to Gamefolio.ggs
                <br />
                <u className="text-white">Terms & Conditions</u> and{" "}
                <u className="text-white">Privacy Policy</u>.
              </label>
            </div>

            <div className="flex items-start mt-3 mr-4">
              <input
                id="pending"
                type="checkbox"
                value=""
                name="show-only"
                className="w-4 h-4 text-primary-600 focus:ring-primary-500 focus:ring-primary-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
              />
              <label
                htmlFor="pending"
                className="ml-2 text-sm font-medium  text-gray-300"
              >
                I confirm that I am <b className="text-white">13+ years old</b>.
              </label>
            </div>
          </div>

          <div className="flex justify-center">
            <button className="w-full sm:w-96 h-[50] bg-[#37C535] text-white text-center py-[10px] px-[30px] rounded-tl-[20px] rounded-br-[20px] rounded-tr-[5px] rounded-bl-[5px] mb-3">
              Confirm
            </button>
          </div>
        </div>
      </div>
    </CustomBackground>
  );
};

export default TermsCondition;
