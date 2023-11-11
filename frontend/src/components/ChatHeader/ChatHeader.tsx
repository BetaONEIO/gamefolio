import { leagueGothic } from "@/font/font";
import React from "react";

function ChatHeader() {
  return (
    <>
      <div className="flex items-center py-2 bg-[#091619] border-b border-gray-800">
        <div className="flex justify-start items-center w-full mx-4 px-4 py-2">
          <div>
            <h1 className={`${leagueGothic.className} text-4xl`}>MESSAGES</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatHeader;
