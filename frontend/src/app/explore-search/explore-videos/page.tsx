"use client";
import { dispatch, useSelector } from "@/store";
import { userSession } from "@/store/slices/authSlice";
import { getAllPostVideos } from "@/store/slices/postSlice";
import { getCookieValue, getFromLocal } from "@/utils/localStorage";
import Image from "next/image";
import { useEffect } from "react";

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

  return (
    <>
      <div className="flex flex-wrap justify-start items-start mx-3">
        {postState?.videos.map((post: any) => (
          <div key={post._id} className="relative my-1 mx-3">
            <video
              src={post.video}
              width={100}
              height={100}
              className="w-96 h-44 sm:w-52 sm:h-28  rounded-xl hover:opacity-80"
            />
            <span className="absolute bottom-2 right-2">8:31</span>
          </div>
        ))}
      </div>
    </>
  );
}

export default ExploreVideo;
