"use client";
import React, { useRef, useEffect, useCallback, useState } from "react";
import { dispatch, useSelector } from "@/store";
import { userSession } from "@/store/slices/authSlice";
import { getAllPostVideos } from "@/store/slices/postSlice";
import { getCookieValue, getFromLocal } from "@/utils/localStorage";
import Layout from "@/components/CustomLayout/layout";
import Image from "next/image";
import Link from "next/link";
import { SVG } from "@/assets/SVG";
import { leagueGothic } from "@/font/font";
// import Loading from "./loading";

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

  //   if (postState.loading) return <Loading />;

  function formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${padZero(minutes)}:${padZero(remainingSeconds)}`;
  }

  function padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  return (
    <Layout>
      {/* <Suspense fallback={<Loading />}> */}
      {/* Header */}
      <div className="flex items-center py-2 bg-[#091619]">
        <div className="flex justify-between items-center w-full mx-4">
          <div>
            <h1 className={`${leagueGothic.className} text-4xl text-gray-50`}>
              MY GAMEFOLIO
            </h1>
          </div>
          <div className="flex items-center my-3 mx-2">
            <div className="flex items-center p-2 mr-2 rounded-full bg-[#162423]">
              <Image
                className="mr-2"
                src={SVG.GGcoin}
                alt="GGcoin"
                width={30}
                height={30}
              />
              <p className="font-semibold pr-2 text-gray-50">GG COIN</p>
            </div>
            <Link href="/account/settings">
              <Image
                className="cursor-pointer hover:opacity-60"
                src={SVG.Setting}
                alt="Setting"
                width={24}
                height={24}
              />
            </Link>
          </div>
        </div>
      </div>
      <hr className="border-t border-gray-600" />

      <div className="flex flex-wrap justify-start items-start mx-3 my-4">
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
    </Layout>
  );
}

export default ExploreVideo;
