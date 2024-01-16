"use client";
import { Suspense, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Loading from "@/app/view-story/loading";
import { SVG } from "@/assets/SVG";
import { dispatch, useSelector } from "@/store";
import { getUserStories } from "@/store/slices/storySlice";
import ReactInstaStories from "react-insta-stories";
import { ToastContainer } from "react-toastify";
import { toastError } from "../Toast/Toast";

interface ViewStoryProps {
  storyUserID?: any;
  handleCloseModal: () => void;
}

function ViewStory({ storyUserID, handleCloseModal }: ViewStoryProps) {
  const storyState = useSelector((state: any) => state.story) || [];

  const timeAgo = (postTime: string) => {
    const currentTime: Date = new Date();
    const postDate: Date = new Date(postTime);

    const difference: number = currentTime.getTime() - postDate.getTime();

    const seconds: number = Math.floor(difference / 1000);
    const minutes: number = Math.floor(seconds / 60);
    const hours: number = Math.floor(minutes / 60);
    const days: number = Math.floor(hours / 24);

    if (days > 0) {
      return days === 1 ? "1 day ago" : `${days} days ago`;
    } else if (hours > 0) {
      return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
    } else if (minutes > 0) {
      return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
    } else {
      return "Just now";
    }
  };

  const myBGStyleModal = {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    backdropFilter: "blur(8px)",
  };

  const handleGetUserStories = async () => {
    const payload = {
      userID: storyUserID,
    };

    const errorCallback = (error: string) => {
      toastError(error);
    };

    const params = {
      payload,
      errorCallback,
    };

    dispatch(getUserStories(params));
  };

  useEffect(() => {
    handleGetUserStories();
  }, []);

  if (storyState.loading || storyState.userStories.length === 0) {
    return (
      <div
        style={myBGStyleModal}
        className="fixed inset-0 flex items-center justify-center z-50"
      >
        <div className="modal-container w-full h-screen z-50 overflow-y-auto bg-[#091619] rounded-lg">
          <Loading />
        </div>
      </div>
    );
  }

  const customStoryLayout = (story: any) => {
    const timeAgoString: string = timeAgo(story.date);
    return (
      <div style={{ position: "relative" }} className="w-full h-full ">
        <div className="absolute top-7 left-5 cursor-pointer">
          <div className="flex gap-2">
            <Image
              className="rounded-xl object-cover"
              src={story?.userID?.profilePicture}
              alt="Story"
              width={50}
              height={50}
            />

            <div className="flex flex-col">
              <Link
                href={`/account/${story?.userID?.username}`}
                key={story._id}
              >
                <span className="font-semibold tracking-tighter cursor-pointer">
                  {story?.userID?.name}
                </span>
              </Link>
              <span className="font-normal tracking-tighter">
                {timeAgoString}
              </span>
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

        <div className="flex justify-center items-center h-full">
          <video
            src={story.video}
            controls={false}
            width="100%"
            height="100%"
            autoPlay
          />
        </div>

        <div className="absolute inset-x-0 bottom-5  flex items-center justify-center gap-1 p-2">
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

  const renderStories = storyState?.userStories.map((story: any) => ({
    content: () => customStoryLayout(story),
  }));

  return (
    <div
      style={myBGStyleModal}
      className="fixed inset-0 flex items-center justify-center z-50"
    >
      <div className="modal-container w-full h-screen z-50 overflow-y-auto bg-[#091619] rounded-lg">
        <Suspense fallback={<Loading />}>
          <div className="flex flex-col items-center h-screen py-4 overflow-y-scroll">
            <div className="flex items-center justify-center w-full sm:w-2/3 md:w-2/5 h-full mb-4 rounded-lg">
              <button
                type="button"
                className="text-white-400 absolute top-2.5 right-2.5 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-600 hover:text-white"
                data-modal-toggle="deleteAlertModal"
                onClick={handleCloseModal}
              >
                <Image src={SVG.Exit} alt="exit" width={30} height={30} />
                <span className="sr-only">Close modal</span>
              </button>

              <Image
                className="mr-6 hover:opacity-50"
                src={SVG.StoryBackward}
                alt="StoryBackward"
                width={28}
                height={28}
              />
              <ReactInstaStories
                stories={renderStories}
                defaultInterval={10000}
                width={432}
                height={768}
                // loop={true}
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
        </Suspense>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default ViewStory;
