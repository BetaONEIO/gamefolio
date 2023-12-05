"use client";
import { useEffect } from "react";
import { dispatch, useSelector } from "@/store";
import { userSession } from "@/store/slices/authSlice";
import { getAllPostVideos } from "@/store/slices/postSlice";
import { getCookieValue, getFromLocal } from "@/utils/localStorage";

function ExploreVideo() {
  const postState = useSelector((state: any) => state.post) || [];

  const payload = {
    userToken: getFromLocal("@token") || getCookieValue("gfoliotoken"),
  };
  const params = {
    payload,
  };
  useEffect(() => {
    dispatch(userSession(params));
    dispatch(getAllPostVideos());
  }, [postState.refresh]);

  console.log("postState", postState);

  return (
    <>
      <div className="flex flex-wrap justify-start items-start mx-3">
        {postState.videos.map((item: any) => (
          <div key={item.id} className="relative my-1 mx-3">
            <video
              src={item.video}
              className="w-96 h-44 sm:w-52 sm:h-28 rounded-xl hover:opacity-80"
              width={20}
              height={20}
              controls={false}
              autoPlay={false}
              onLoadedMetadata={(e) => {
                const video = e.currentTarget;
                const timeInSeconds = video.duration;

                console.log("Video time", timeInSeconds);
              }}
            />
            <span className="absolute bottom-2 right-2">8:31</span>
          </div>
        ))}
      </div>
    </>
  );
}

export default ExploreVideo;
