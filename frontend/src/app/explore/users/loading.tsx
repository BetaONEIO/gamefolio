const SkeletonLoader = () => {
  return (
    <div className="flex flex-col w-full md:w-80  h-44 gap-2 border-2 border-[#1C2C2E] rounded-xl mx-1 my-2 animate-pulse">
      <div className="flex items-center gap-4 mb-2 mx-2">
        <div className="rounded-xl w-16 h-16 mt-2 bg-gray-700"></div>
        <div className="flex flex-col gap-2">
          <div className="h-4 w-24 bg-gray-700 rounded"></div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-20 bg-gray-700 rounded"></div>
            <div className="h-4 w-4 bg-gray-700 rounded-full"></div>
          </div>
        </div>
      </div>

      <hr className="h-px border-0 bg-[#1C2C2E] mb-1 w-full rounded-full" />

      <div className="flex flex-col flex-wrap justify-center text-center lg:justify-start lg:text-start">
        <div className="flex items-center justify-center gap-2">
          <div className="flex flex-col items-center">
            <div className="h-6 w-10 bg-gray-700 rounded"></div>
            <div className="h-4 w-16 bg-gray-700 rounded mt-1"></div>
          </div>

          <div className="border-r border-[#1C2C2E] h-12 rounded-full"></div>

          <div className="flex flex-col items-center">
            <div className="h-6 w-10 bg-gray-700 rounded"></div>
            <div className="h-4 w-16 bg-gray-700 rounded mt-1"></div>
          </div>

          <div className="border-r border-[#1C2C2E] h-12 rounded-full"></div>

          <div className="flex flex-col items-center">
            <div className="h-6 w-10 bg-gray-700 rounded"></div>
            <div className="h-4 w-16 bg-gray-700 rounded mt-1"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
