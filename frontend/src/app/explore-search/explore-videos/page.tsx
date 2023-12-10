"use client";
import { useRef, useEffect, useReducer } from "react";
import { dispatch, useSelector } from "@/store";
import { userSession } from "@/store/slices/authSlice";
import { getAllPostVideos } from "@/store/slices/postSlice";
import { getCookieValue, getFromLocal } from "@/utils/localStorage";
import Loading from "./loading";

function useForceUpdate() {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  return forceUpdate;
}

function ExploreVideo() {
  const postState = useSelector((state: any) => state.post) || [];
  const videoCurrentTimes = useRef<number[]>([]);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);

  const payload = {
    userToken: getFromLocal("@token") || getCookieValue("gfoliotoken"),
  };
  const params = {
    payload,
  };

  const forceUpdate = useForceUpdate();

  useEffect(() => {
    console.log("FirstTime");
    dispatch(userSession(params));
    dispatch(getAllPostVideos());
  }, [postState.refresh]);
  console.log("SecondTime");

  const handleVideoClick = (
    event: React.MouseEvent<HTMLVideoElement, MouseEvent>
  ) => {
    const video = event.currentTarget;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  const handleTimeUpdate = (event: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = event.currentTarget;
    const index = videoRefs.current.findIndex((ref) => ref === video);

    if (index !== -1) {
      // Update the time for the corresponding video
      console.log("TIME", index, video.currentTime);
      videoCurrentTimes.current[index] = video.currentTime;
      console.log("Updated videoCurrentTimes", videoCurrentTimes.current);

      forceUpdate();
    }
  };
  if (postState.loading) return <Loading />;

  function formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedTime = `${padZero(minutes)}:${padZero(remainingSeconds)}`;
    return formattedTime;
  }

  function padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  return (
    <>
      <div className="flex flex-wrap justify-start items-start mx-3">
        {postState.videos.map((item: any, index: number) => (
          <div key={item.id} className="relative my-1 mx-3">
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              src={item.video}
              className="w-96 h-44 sm:w-52 sm:h-28 rounded-xl hover:opacity-80"
              width={20}
              height={20}
              controls={false}
              autoPlay={false}
              preload="metadata"
              // loading="lazy"
              onClick={handleVideoClick}
              onTimeUpdate={handleTimeUpdate}
            />
            <span className="absolute bottom-2 right-2">
              {formatTime(videoCurrentTimes.current[index] || 0)}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}

export default ExploreVideo;
