"use client";
import React, { useRef, useEffect, useCallback, useState } from "react";
import { dispatch, useSelector } from "@/store";
import { userSession } from "@/store/slices/authSlice";
import { getAllPostVideos } from "@/store/slices/postSlice";
import { getCookieValue, getFromLocal } from "@/utils/localStorage";
import Loading from "./loading";

function ExploreVideo() {
  const postState = useSelector((state: any) => state.post) || [];
  const videoCurrentTimes = useRef<number[]>([]);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const [currentTime, setCurrentTime] = useState<number[]>([]);

  console.log("postState", postState);

  const payload = {
    userToken: getFromLocal("@token") || getCookieValue("gfoliotoken"),
  };

  const params = {
    payload,
  };

  useEffect(() => {
    console.log("FirstTime");
    dispatch(userSession(params));
    dispatch(getAllPostVideos());
  }, []);
  console.log("SecondTime");

  const handleVideoClick = useCallback(
    (event: React.MouseEvent<HTMLVideoElement, MouseEvent>) => {
      const video = event.currentTarget;
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    },
    []
  );

  // const handleTimeUpdate = useCallback(
  //   (event: React.SyntheticEvent<HTMLVideoElement>) => {
  //     const video = event.currentTarget;
  //     const index = videoRefs.current.findIndex((ref) => ref === video);

  //     if (index !== -1) {
  //       setCurrentTime((prevTimes) => {
  //         const newTimes = [...prevTimes];
  //         newTimes[index] = video.currentTime;
  //         return newTimes;
  //       });
  //     }
  //   },
  //   []
  // );

  if (postState.loading) return <Loading />;

  function formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${padZero(minutes)}:${padZero(remainingSeconds)}`;
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
              onClick={handleVideoClick}
              // onTimeUpdate={handleTimeUpdate}
            />
            <span className="absolute bottom-2 right-2">
              {formatTime(currentTime[index] || 0)}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}

export default ExploreVideo;
