"use client";
import { IMAGES } from "@/assets/images";
import { dispatch, useSelector } from "@/store";
import { userSession } from "@/store/slices/authSlice";
import { getAllUsers } from "@/store/slices/userSlice";
import { getCookieValue, getFromLocal } from "@/utils/localStorage";
import Image from "next/image";
import { useEffect } from "react";

function ExploreUser() {
  const userState = useSelector((state: any) => state.user) || [];
  const payload = {
    userToken: getFromLocal("@token") || getCookieValue("gfoliotoken"),
  };
  const params = {
    payload,
  };
  useEffect(() => {
    dispatch(userSession(params));
    dispatch(getAllUsers());
  }, [userState.refresh]);

  console.log("userState", userState);
  const dummy = [
    {
      id: 1,
      Image: IMAGES.Profile,
      userName: "John_mark123",
      Name: "John Mark",
    },
    {
      id: 2,
      Image: IMAGES.Profile,
      userName: "John_mark123",
      Name: "John Mark",
    },
    {
      id: 3,
      Image: IMAGES.Profile,
      userName: "John_mark123",
      Name: "John Mark",
    },
    {
      id: 4,
      Image: IMAGES.Profile,
      userName: "John_mark123",
      Name: "John Mark",
    },
  ];

  return (
    <div className="flow-root w-96 sm:1/3 mx-auto">
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {dummy.map((dummy) => (
          <div key={dummy.id} className="flex py-6">
            <Image
              className="mr-2 sm:mr-4"
              src={dummy.Image}
              alt="Profile"
              width={50}
              height={50}
            />
            <div>
              <h3 className=" font-semibold text-gray-900 dark:text-white">
                {dummy.userName}
              </h3>
              <p className="text-base font-light text-gray-600 dark:text-gray-400">
                {dummy.Name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExploreUser;
