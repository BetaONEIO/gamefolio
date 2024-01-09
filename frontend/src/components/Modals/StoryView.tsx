import Image from "next/image";
import { SVG } from "@/assets/SVG";
import { IMAGES } from "@/assets/images";

interface AddNewProps {
  handleCloseModal: () => void;
}

function StoryView({ handleCloseModal }: AddNewProps) {
  return (
    <>
      <div className="modal-container sm:w-96 sm:h-screen mx-auto lg:w-full lg:h-screen z-50  bg-[#091619]">
        {/* Modal content */}
        <button
          type="button"
          className="text-white-400 absolute top-2.5 right-2.5 bg-transparent  rounded-lg text-sm p-1.5 ml-auto inline-flex  hover:bg-gray-600 hover:text-white"
          data-modal-toggle="deleteAlertModal"
          onClick={handleCloseModal}
        >
          <Image src={SVG.Exit} alt="exit" width={30} height={30} />
          <span className="sr-only">Close modal</span>
        </button>

        <div className="flex bg-[#091619] justify-center py-4">
          <div className="w-5/12 flex flex-col">
            <div className="border-2 border-[#47b2c0] bg-[#7dd1e4]">
              <Image
                className="w-full"
                src={IMAGES.Story}
                alt="Post"
                width={100}
                height={100}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StoryView;
