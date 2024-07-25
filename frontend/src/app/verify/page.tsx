"use client";
import CustomBackground from "@/components/CustomBackground/custombackground";
import { leagueGothic } from "@/font/font";
import { dispatch } from "@/store";
import { verifyEmailLink } from "@/store/slices/authSlice";
import { useSearchParams } from "next/navigation";

import { useEffect, useState } from "react";

const Verify = () => {
  const [status, setStatus] = useState("");
  const router = useSearchParams();
  const token = router.get("token");

  useEffect(() => {
    if (token) {
      const payload = {
        token: token,
      };

      const successCallback = (response: any) => {
        setStatus(response);
      };

      const errorCallback = (error: string) => {
        setStatus(error);
      };

      const params = {
        payload,
        successCallback,
        errorCallback,
      };

      dispatch(verifyEmailLink(params));
    } else {
      setStatus("invalid request");
    }
  }, [token]);

  return (
    <CustomBackground>
      <div className="flex flex-col items-center justify-center px-6 py-8 h-screen ">
        <div className="p-8 space-y-4 h-fit w-96 bg-[#091619] rounded-xl border border-[#1C2C2E]">
          <div className="flex flex-col">
            <h1 className={`${leagueGothic.className} text-4xl text-white`}>
              Account Verification
            </h1>
            <hr className="w-10 border-t-4 border-[#43DD4E] rounded-lg my-2" />
            <hr className="border-t border-gray-700 my-2" />
          </div>

          <div className="flex flex-col gap-4 justify-center p-2 items-start text-white">
            <div>{status ? <p>{status}</p> : <p>Loading...</p>}</div>
          </div>
        </div>
      </div>
    </CustomBackground>
  );
};

export default Verify;
