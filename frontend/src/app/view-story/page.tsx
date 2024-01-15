"use client";
import { Suspense, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { SVG } from "@/assets/SVG";
import Layout from "@/components/CustomLayout/layout";
import { dispatch, useSelector } from "@/store";
import { getAllStories } from "@/store/slices/storySlice";
import ReactInstaStories from "react-insta-stories";
import Loading from "./loading";

function ViewStory() {
  const storyState = useSelector((state: any) => state.story) || [];
  useEffect(() => {
    dispatch(getAllStories());
  }, []);

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

  // console.log("storyState: ", storyState);
  const customStoryLayout = (story: any) => {
    const timeAgoString: string = timeAgo(story.date);
    return (
      <div style={{ position: "relative" }} className="w-full h-full ">
        <div className="absolute top-7 left-5">
          <div className="flex gap-2">
            <Image
              className="rounded-xl object-cover"
              src={story?.userID?.profilePicture}
              alt="Story"
              width={50}
              height={50}
            />
            <div className="flex flex-col">
              <span className="font-semibold tracking-tighter">
                {story?.userID?.name}
              </span>
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
        {/* 
        <Image
          className="w-full h-full rounded"
          alt="Story"
          src={IMAGES.Story}
          width={432}
          height={768}
        /> */}
        <div className="flex justify-center items-center h-full">
          <video
            src={story.video}
            controls={false}
            width="100%"
            height="100%"
            autoPlay={true}
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

  // 'stories' now contains an array of objects with 'content' functions
  const stories = storyState?.stories.map((story: any) => ({
    content: () => customStoryLayout(story),
  }));

  if (storyState.loading) return <Loading />;

  return (
    <Layout>
      <Suspense fallback={<Loading />}>
        <div className="flex flex-col items-center h-screen py-4 overflow-y-scroll">
          <div className="flex items-center justify-center w-full sm:w-2/3 md:w-2/5 h-full mb-4 rounded-lg">
            <Link
              href="/main"
              type="button"
              className="text-white-400 absolute top-2.5 right-2.5 bg-transparent  rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-600 hover:text-white"
              data-modal-toggle="deleteAlertModal"
              // onClick={handleCloseModal}
            >
              <Image src={SVG.Exit} alt="exit" width={30} height={30} />
              <span className="sr-only">Close modal</span>
            </Link>

            <Image
              className="mr-6 hover:opacity-50"
              src={SVG.StoryBackward}
              alt="StoryBackward"
              width={28}
              height={28}
            />
            <ReactInstaStories
              stories={stories}
              defaultInterval={10000}
              width={432}
              height={768}
              loop={true}
            />
            <Image
              className="ml-6 hover:opacity-50"
              src={SVG.StoryForward}
              alt="StoryForward"
              width={28}
              height={28}
            />
          </div>
        </div>
      </Suspense>
    </Layout>
  );
}

export default ViewStory;
