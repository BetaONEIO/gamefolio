import React from "react";
import Setting from "./page";

export default function Loading() {
  return (
    <Setting>
      <div className="flex items-center justify-center h-full ">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-[#DB2777] h-12 w-12"></div>
      </div>
    </Setting>
  );
}
