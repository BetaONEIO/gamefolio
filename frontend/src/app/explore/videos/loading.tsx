import React from "react";

export default function Loading() {
  return (
    <div className="flex flex-col gap-2 w-68 h-64 border-2 border-[#1C2C2E] rounded-xl mx-1 pb-2 animate-pulse">
      <div className="relative overflow-hidden rounded-t-xl aspect-w-16 aspect-h-9 bg-gray-700"></div>
      <div className="p-2">
        <div className="flex items-center gap-2 mb-2">
          <div className="rounded-full w-10 h-10 bg-gray-700"></div>
          <div>
            <div className="w-24 h-4 bg-gray-700 rounded"></div>
            <div className="w-16 h-3 mt-1 bg-gray-700 rounded"></div>
          </div>
        </div>
        <div className="flex justify-between mx-2">
          <div className="w-6 h-6 bg-gray-700 rounded-full"></div>
          <div className="w-6 h-6 bg-gray-700 rounded-full"></div>
          <div className="w-6 h-6 bg-gray-700 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
