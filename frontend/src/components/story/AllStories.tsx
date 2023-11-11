"use client";
import { SVG } from "@/assets/SVG";
import { IMAGES } from "@/assets/images";
import Image from "next/image";
import { useState } from "react";
import AddStory from "../Modals/AddStory";
import Modal from "../Modals/Modal";
import ViewStory from "../Modals/ViewStory";

function AllStories() {
  const [modalState, setModalState] = useState({
    isAddStoryModalOpen: false,
    isStoryModalOpen: false,
  });

  const namesArray = [
    { name: "Jonny" },
    { name: "Maria" },
    { name: "Erena" },
    { name: "Smith" },
    { name: "Elan" },
    { name: "Maria" },
    { name: "Erena" },
    { name: "Smith" },
    { name: "Elan" },
    { name: "Maria" },
    { name: "Erena" },
    { name: "Smith" },
    { name: "Elan" },
    { name: "Maria" },
    { name: "Erena" },
    { name: "Smith" },
    { name: "Elan" },
  ];

  const handleModalToggle = (modalName: keyof typeof modalState) => {
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

          {namesArray.map((items, index) => (
            <div
              key={index}
              className="flex flex-col justify-center items-center gap-2"
              onClick={() => handleModalToggle("isStoryModalOpen")}
            >
              <div className="w-16 h-16">
                <Image
                  src={IMAGES.testStoryUser}
                  alt="UploadStory"
                  width="12"
                  height="12"
                  sizes="100vw"
                  className="h-16 w-16 object-cover rounded-xl border-green-400 border-2"
                />
              </div>
              <span className="text-xs">{items.name}</span>
            </div>
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
          handleCloseModal={() => handleModalToggle("isStoryModalOpen")}
        />
      </Modal>
    </>
  );
}

export default AllStories;
