"use client";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "@/assets/images";
import { dispatch, useSelector } from "@/store";
import { userSession } from "@/store/slices/authSlice";
import { getAllUsers } from "@/store/slices/userSlice";
import { getCookieValue, getFromLocal } from "@/utils/localStorage";
import Loading from "./loading";

function User() {
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

  if (userState.loading) return <Loading />;

  return (
    <div className="flow-root w-96 sm:1/3 mx-auto">
      <div className="divide-y divide-gray-700">
        {userState?.userList?.map((user: any) => (
          <div key={user._id} className="flex py-6">
            <Image
              className="w-12 h-12 rounded-lg mr-2 sm:mr-4"
              src={user?.profilePicture || IMAGES.AccountProfile}
              alt="Profile"
              width={50}
              height={50}
            />
            <div>
              <h3 className="font-semibold text-white">{user?.username}</h3>
              <p className="text-base font-light text-gray-400">{user?.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default User;
