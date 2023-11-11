"use client";
import { SVG } from "@/assets/SVG";
import { IMAGES } from "@/assets/images";
import Image from "next/image";
import ReactInstaStories from "react-insta-stories";
import Layout from "../../components/CustomLayout/layout";

interface ViewStoryProps {
  handleCloseModal: () => void;
}

function ViewStory({ handleCloseModal }: ViewStoryProps) {
  const customStoryLayout = () => {
    return (
      <div style={{ position: "relative" }} className="w-full h-full">
        <div className="absolute top-7 left-5">
          <div className="flex gap-2">
            <Image
              className="rounded-xl object-cover"
              src={IMAGES.testStoryUser}
              alt="Story"
              width={50}
              height={50}
            />
            <div className="flex flex-col">
              <span className="font-semibold tracking-tighter">Johnny</span>
              <span className="font-normal tracking-tighter">2 min ago</span>
            </div>
          </div>
        </div>
        <div className="absolute top-7 right-5">
          <Image
            className="rounded-xl object-cover"
            src={SVG.StoryReport}
            alt="Story"
            width={30}
            height={30}
          />
        </div>

        <Image
          className="w-full h-full rounded"
          alt="Story"
          src={IMAGES.Story}
          width={432}
          height={768}
        />

        <div className="absolute inset-x-0 bottom-5 flex items-center justify-center gap-1 p-2">
          <input
            className="rounded-full w-4/5 bg-[#091619] opacity-60 px-4 py-2 border border-[#586769]"
            placeholder="Reply to.."
          />
          <Image
            className="rounded-xl object-cover"
            src={SVG.StoryReaction1}
            alt="Story"
            width={40}
            height={40}
          />
          <Image
            className="rounded-xl object-cover"
            src={SVG.StoryReaction2}
            alt="Story"
            width={40}
            height={40}
          />
        </div>
      </div>
    );
  };

  const stories = [
    {
      content: () => customStoryLayout(),
    },
    {
      content: () => customStoryLayout(),
    },
    {
      content: () => customStoryLayout(),
    },
    {
      content: () => customStoryLayout(),
    },
  ];

  return (
    <Layout>
      <div className="flex flex-col items-center h-screen py-4 overflow-y-scroll">
        <div className="flex items-center justify-center w-full sm:w-2/3 md:w-2/5 h-full mb-4 rounded-lg">
          <button
            type="button"
            className="text-white-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-toggle="deleteAlertModal"
            onClick={handleCloseModal}
          >
            <Image src={SVG.Exit} alt="exit" width={30} height={30} />
            <span className="sr-only">Close modal</span>
          </button>

          <Image
            className=" mr-6 hover:opacity-50"
            src={SVG.StoryBackward}
            alt="StoryBackward"
            width={28}
            height={28}
          />
          <ReactInstaStories
            stories={stories}
            defaultInterval={2500}
            width={432}
            height={768}
          />
          <Image
            className=" ml-6 hover:opacity-50"
            src={SVG.StoryForward}
            alt="StoryForward"
            width={28}
            height={28}
          />
        </div>
      </div>
    </Layout>
  );
}

export default ViewStory;
