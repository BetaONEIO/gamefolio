export default function SkeletonLoaderUser() {
  return (
    <div className="flex flex-col w-64 h-44 gap-2 border-2 border-[#1C2C2E] rounded-xl mx-1 my-2 animate-pulse">
      <div className="flex items-center gap-4 mb-2">
        <div className="rounded-xl w-16 h-16 mt-2 ml-2 bg-gray-700"></div>
        <div>
          <div className="w-24 h-4 bg-gray-700 rounded mb-2"></div>
          <div className="w-16 h-3 bg-gray-700 rounded"></div>
        </div>
      </div>
      <hr className="h-px border-0 bg-[#1C2C2E] mb-1 w-full rounded-full" />
      <div className="flex flex-col flex-wrap justify-center text-center lg:justify-start lg:text-start">
        <div className="flex items-center justify-center gap-2">
          <div className="flex flex-col">
            <div className="w-10 h-6 bg-gray-700 rounded mb-1"></div>
            <div className="w-12 h-4 bg-gray-700 rounded"></div>
          </div>
          <div className="border-r border-[#1C2C2E] h-12 rounded-full"></div>
          <div className="flex flex-col">
            <div className="w-10 h-6 bg-gray-700 rounded mb-1"></div>
            <div className="w-12 h-4 bg-gray-700 rounded"></div>
          </div>
          <div className="border-r border-[#1C2C2E] h-12 rounded-full"></div>
          <div className="flex flex-col">
            <div className="w-10 h-6 bg-gray-700 rounded mb-1"></div>
            <div className="w-12 h-4 bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
