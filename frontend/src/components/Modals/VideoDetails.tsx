import { IMAGES } from "@/assets/images";
import { SVG } from "@/assets/SVG";
import Image from "next/image";

interface VideoDetailProps {
  handleCloseModal: () => void;
}

function VideoDetails({ handleCloseModal }: VideoDetailProps) {
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
        <div className="modal-container w-11/12 sm:w-11/12 lg:w-9/12 h-[40rem] lg:h-[calc(100vh - 2rem)] z-50 overflow-y-auto dark:bg-[#091619] rounded-lg">
          {/* Modal content */}
          <div className="relative bg-white rounded-lg dark:bg-[#091619] py-5 sm:py-4 border dark:border-[#586769]">
            <button
              type="button"
              className="text-white-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex  dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="deleteAlertModal"
              onClick={handleCloseModal}
            >
              <Image
                className="w-7 h-7"
                src={SVG.Exit}
                alt="exit"
                width={10}
                height={10}
              />
              <span className="sr-only">Close modal</span>
            </button>

            <div className="flex flex-col sm:flex-row sm:justify-between lg:h-[33.9rem] md:h-[33.9rem] h-[8rem] justify-center border-2 border-[#1C2C2E] rounded-lg my-8 mx-4">
              {/* Left Column - Story Block */}
              <div className="w-full sm:w-1/2 sm:mr-2 sm:ml-6 border-r-2 border-[#1C2C2E]">
                {/* Add your story block content here */}
                <div className="w-full md:w-[22rem] lg:w-full flex flex-col sm:justify-center justify-center items-center rounded-lg dark:bg-[#091619] bg-gray-100 rounded-lg dark:bg-[#091619] border-[#1C2C2E]">
                  <div className="mb-4">
                    <div className="flex justify-center items-center w-full"></div>
                  </div>
                </div>
              </div>

              {/* Right Column - Form */}
              <div className="w-full md:w-full lg:w-2/5 lg:h-[33.9rem] md:h-[33.9rem] h-[8rem]">
                {/* Game Selection */}
                <div className="ml-4">
                  <div className="flex items-center my-3">
                    <Image
                      className="w-12 h-12 mr-2 sm:mr-4"
                      src={IMAGES.Profile}
                      alt="Profile avatar"
                      width={50}
                      height={50}
                    />
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 md:text-xl dark:text-white">
                        Hannery
                      </h3>
                      <p className="text-base font-light text-gray-600 dark:text-gray-400">
                        17 sep, 2022
                      </p>
                    </div>
                  </div>
                  <div className="mb-3 mr-4">
                    <p className="text-base font-light text-gray-200 dark:text-gray-200">
                      Lorem ipsum dolor sit amet consectetur. Ante duis tellus
                      tincidunt nibh
                    </p>
                  </div>

                  <div className="flex items-center justify-evenly">
                    <div className="flex justify-items-start gap-4">
                      <Image
                        className="p-2 rounded-xl bg-[#162423]"
                        src={SVG.Like}
                        alt="Like"
                        width={50}
                        height={50}
                      />

                      <Image
                        src={SVG.Comment}
                        alt="Comment"
                        width={50}
                        height={50}
                      />

                      <Image
                        src={SVG.Trending1}
                        alt="Trending1"
                        width={50}
                        height={50}
                      />

                      <Image
                        src={SVG.Gcoin}
                        alt="Gcoin"
                        width={50}
                        height={50}
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row justify-center sm:justify-between">
                      <p className="text-sm ">5.4K Like</p>
                      <p className="text-sm"> . 165 Comments</p>
                    </div>

                    <div>
                      <Image
                        src={SVG.Share}
                        alt="Share"
                        width={25}
                        height={25}
                      />
                    </div>
                  </div>
                </div>

                <hr className="w-full border-t border-gray-600 my-4" />

                <div className="ml-4">
                  <div className="flex items-center mt-6">
                    <Image
                      className="mr-2 sm:mr-4"
                      src={IMAGES.Profile}
                      alt="Profile avatar"
                      width={40}
                      height={40}
                    />
                    <div>
                      <div className="flex items-center mb-1">
                        <p className="text-lg font-light md:text-xl dark:text-white">
                          mark_john
                        </p>
                        <p className="ml-3 font-light md:text-md dark:text-gray-200">
                          Very nice video
                        </p>
                      </div>
                      <div className="flex items-center text-base font-light sm:text-sm text-gray-50 dark:text-gray-50">
                        <p className="mr-2">1d</p>
                        <p className="mr-2">8 likes</p>
                        <p>Reply</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="ml-4">
                  <div className="flex items-center mt-6">
                    <Image
                      className="mr-2 sm:mr-4"
                      src={IMAGES.Profile}
                      alt="Profile avatar"
                      width={40}
                      height={40}
                    />
                    <div>
                      <div className="flex items-center mb-1">
                        <p className="text-lg font-light md:text-xl dark:text-white">
                          mark_john
                        </p>
                        <p className="ml-3 font-light md:text-md dark:text-gray-200">
                          Very nice video
                        </p>
                      </div>
                      <div className="flex items-center text-base font-light sm:text-sm text-gray-50 dark:text-gray-50">
                        <p className="mr-2">1d</p>
                        <p className="mr-2">8 likes</p>
                        <p>Reply</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="ml-4 mb-40">
                  <div className="flex items-center mt-6">
                    <Image
                      className="mr-2 sm:mr-4"
                      src={IMAGES.Profile}
                      alt="Profile avatar"
                      width={40}
                      height={40}
                    />
                    <div>
                      <div className="flex items-center mb-1">
                        <p className="text-lg font-light md:text-xl dark:text-white">
                          mark_john
                        </p>
                        <p className="ml-3 font-light md:text-md dark:text-gray-200">
                          Very nice video
                        </p>
                      </div>
                      <div className="flex items-center text-base font-light sm:text-sm text-gray-50 dark:text-gray-50">
                        <p className="mr-2 ">1d</p>
                        <p className="mr-2">8 likes</p>
                        <p>Reply</p>
                      </div>
                    </div>
                  </div>
                </div>

                <hr className="w-full border-t border-gray-600" />
                <form className="w-full mx-2">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center  pointer-events-none">
                      <Image
                        src={SVG.Emoji}
                        alt="Profile avatar"
                        width={40}
                        height={40}
                      />
                    </div>
                    <input
                      type="Post"
                      id="default-search"
                      className="w-96 block p-4 ml-10 text-sm bg-[#091619] outline-none sm:text-sm dark:text-white"
                      placeholder="Add a comment..."
                      required
                    />
                    <button
                      type="submit"
                      className="text-[#43DD4E] absolute right-0 bottom-0 top-0 bg-primary-700 font-medium text-sm px-4 py-2 dark:bg-primary-600 "
                    >
                      Post
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default VideoDetails;
