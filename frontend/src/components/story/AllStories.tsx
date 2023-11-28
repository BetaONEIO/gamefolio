"use client";
import { SVG } from "@/assets/SVG";
import { IMAGES } from "@/assets/images";
import Image from "next/image";
import { useEffect, useState } from "react";
import AddStory from "../Modals/AddStory";
import Modal from "../Modals/Modal";
import ViewStory from "../Modals/ViewStory";
import { dispatch, useSelector } from "@/store";
import { getAllStories } from "@/store/slices/storySlice";
import Link from "next/link";
import { useRouter } from "next/navigation";

function AllStories() {
  const router = useRouter();
  const storyState = useSelector((state: any) => state.story) || [];
  const [modalState, setModalState] = useState({
    isAddStoryModalOpen: false,
    isStoryModalOpen: false,
  });
  const [storyUserID, setStoryUserID] = useState("");

  console.log("storyState: ", storyState);

  useEffect(() => {
    dispatch(getAllStories());
  }, []);

  const handleModalToggle = (
    modalName: keyof typeof modalState,
    storyUserID?: any
  ) => {
    setStoryUserID(storyUserID);
    setModalState((prevState) => ({
      ...prevState,
      [modalName]: !prevState[modalName],
    }));
  };

  return (
    <>
      <div className="flex items-center h-32 py-4 bg-[#091619]">
        <div className="flex items-center overflow-scroll no-scrollbar gap-6 px-4 py-8">
          <div className="flex flex-col justify-center items-center gap-2 hover:opacity-80">
            <div
              className="w-16 h-16"
              onClick={() => handleModalToggle("isAddStoryModalOpen")}
            >
              <Image
                width={12}
                height={12}
                className="w-full h-full"
                src={SVG.UploadStory}
                alt="UploadStory"
              />
            </div>
            <span className="text-xs">Story</span>
          </div>

          {storyState?.stories?.map((items: any, index: number) => (
            <button
              key={index}
              className="flex flex-col justify-center items-center gap-2"
              onClick={() =>
                handleModalToggle("isStoryModalOpen", items?.userID?._id)
              }
            >
              <div className="w-16 h-16">
                <Image
                  src={items?.userID?.profilePicture}
                  alt="UploadStory"
                  width="12"
                  height="12"
                  sizes="100vw"
                  className="h-16 w-16 object-cover rounded-xl border-green-400 border-2"
                />
              </div>
              <span className="text-xs">
                {items?.userID?.name?.split(" ")[0]}
              </span>
            </button>
          ))}
        </div>
      </div>

      <Modal
        isOpen={modalState.isAddStoryModalOpen}
        handleClose={() => handleModalToggle("isAddStoryModalOpen")}
      >
        <AddStory
          handleCloseModal={() => handleModalToggle("isAddStoryModalOpen")}
        />
      </Modal>

      <Modal
        isOpen={modalState.isStoryModalOpen}
        handleClose={() => handleModalToggle("isStoryModalOpen")}
      >
        <ViewStory
          storyUserID={storyUserID}
          handleCloseModal={() => handleModalToggle("isStoryModalOpen")}
        />
      </Modal>
    </>
  );
}

export default AllStories;
