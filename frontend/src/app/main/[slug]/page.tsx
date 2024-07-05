"use client";
import { toastError, toastSuccess } from "@/components/Toast/Toast";
import { dispatch, useSelector } from "@/store";
import { getVideoLink } from "@/store/slices/postSlice";
import { useEffect } from "react";

function page() {
  const authState = useSelector((state: any) => state.auth.userData) || [];
  const postState = useSelector((state: any) => state.post) || [];
  const videoUrl = window.location.href;

  console.log("videoUrl:  ", videoUrl);
  console.log("videoo:  ", postState.customVideo);

  useEffect(() => {
    const handleVideoLink = async (videoUrl: any) => {
      const payload = {
        userID: authState._id,
        videoUrl: videoUrl,
      };

      const successCallback = (response: any) => {
        //   handlePageRefresh();
        toastSuccess(response);
      };

      const errorCallback = (error: string) => {
        toastError(error);
      };

      const params = {
        payload,
        successCallback,
        errorCallback,
      };

      dispatch(getVideoLink(params));
    };

    handleVideoLink(videoUrl);
  }, []);

  return <div>page</div>;
}

export default page;
