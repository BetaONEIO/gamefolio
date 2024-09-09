"use client";
import { SVG } from "@/assets/SVG";
import Layout from "@/components/CustomLayout/layout";
import Followers from "@/components/Modals/Followers";
import Following from "@/components/Modals/Following";
import Modal from "@/components/Modals/Modal";
import MoreOptions from "@/components/Modals/MoreOptions";
import Report from "@/components/Modals/Report";
import VideoDetails from "@/components/Modals/VideoDetails";
import { toastError, toastSuccess } from "@/components/Toast/Toast";
import { dispatch, useSelector } from "@/store";
import { userSession } from "@/store/slices/authSlice";
import { getAllPostVideos, updateDetailedPost } from "@/store/slices/postSlice";
import { getProfileInfo, postUsernames } from "@/store/slices/userSlice";
import { copyToClipboard } from "@/utils/helpers";
import { getCookieValue, getFromLocal } from "@/utils/localStorage";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const CoverPhotoLoader = () => {
  return (
    <div className="relative w-full h-80">
      <div className="animate-pulse w-full h-80 bg-gray-700" />

      <div
        className="absolute inset-0 bg-gradient-to-t from-[#091619] via-transparent to-transparent"
        style={{ opacity: 1 }}
      ></div>
    </div>
  );
};

const SkeletonProfileLoader = () => {
  return (
    <div className="border-2 border-[#1C2C2E] rounded-lg p-2 pt-6 bg-[#091619] w-auto overflow-x-auto lg:w-72 h-fit lg:h-fit flex flex-col lg:flex-col gap-8 justify-center lg:gap-1 animate-pulse">
      <div className="flex justify-end">
        <div className="px-3 py-2 w-9 h-8 bg-gray-700 rounded-full"></div>
      </div>

      <div className="flex flex-col justify-center">
        <div className="flex justify-center">
          <div className="rounded-xl w-32 h-32 bg-gray-700"></div>
        </div>
        <div className="flex justify-center font-semibold text-transparent bg-gray-700 w-full h-6 mt-2"></div>
        <div className="flex items-center gap-6 justify-center mt-2">
          <div className="flex items-center">
            <div className="text-transparent bg-gray-700 w-28 h-4"></div>
            <div className="ml-2 w-4 h-4 bg-gray-700 rounded-full"></div>
          </div>
        </div>
        <div className="flex justify-center h-8 gap-2 my-6">
          <div className="font-bold w-40 h-10 bg-gray-700 rounded-tl-[20px] rounded-br-[20px] rounded-tr-[5px] rounded-bl-[5px]"></div>
          <div className="font-bold w-40 h-10 bg-gray-700 rounded-tl-[20px] rounded-br-[20px] rounded-tr-[5px] rounded-bl-[5px]"></div>
        </div>
        <div className="flex items-center justify-between text-transparent bg-gray-700 w-24 h-6 mt-2"></div>
        <hr className="h-px border-0 bg-[#586769] my-2 " />
        <div className="flex items-center justify-between text-transparent bg-gray-700 w-24 h-6 mt-2"></div>
        <hr className="h-px border-0 bg-[#586769] my-2 " />
        <div className="flex items-center justify-between text-transparent bg-gray-700 w-24 h-6 mt-2"></div>
      </div>
      <div className="flex flex-col justify-center">
        <div className="flex flex-row w-56 gap-2 lg:flex-col lg:w-full">
          <div className="flex items-center gap-2 rounded-lg bg-gray-700 p-2 mt-2 w-full h-10"></div>
          <div className="flex items-center gap-2 rounded-lg bg-gray-700 p-2 mt-2 w-full h-10"></div>
          <div className="flex items-center gap-2 rounded-lg bg-gray-700 p-2 mt-2 w-full h-10"></div>
          <div className="flex items-center gap-2 rounded-lg bg-gray-700 p-2 mt-2 w-full h-10"></div>
        </div>
        <div className="flex flex-col mt-4">
          <div className="text-transparent bg-gray-700 w-20 h-6 mb-2"></div>
          <div className="text-transparent bg-gray-700 w-full h-12"></div>
        </div>
      </div>
    </div>
  );
};

const VideoSkeletonLoader = () => {
  return (
    <div className="relative">
      <div className="max-w-full w-96 sm:w-96 h-52 md:h-40 bg-gray-700 rounded-xl animate-pulse"></div>
      <div className="absolute bottom-1 right-2">
        <div className="w-10 h-10 md:w-8 md:h-8 bg-gray-700 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

interface Usernames {
  playstation?: string;
  twitch?: string;
  xbox?: string;
  steam?: string;
}

function MyGamefolio({ params }: any) {
  const authState = useSelector((state: any) => state.auth) || [];
  const profileInfoState = useSelector((state: any) => state.user) || [];
  const postState = useSelector((state: any) => state.post) || [];
  const [isPrivateAccount, setIsPrivateAccount] = useState(false);
  const [postID, setPostID] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [playstation, setPlaystation] = useState("");
  const [twitch, setTwitch] = useState("");
  const [xbox, setXbox] = useState("");
  const [steam, setSteam] = useState("");
  const [modalState, setModalState] = useState({
    isShareModalOpen: false,
    isFollowerModalOpen: false,
    isFollowingModalOpen: false,
    isReportModalOpen: false,
    isVideoDetailOpen: false,
    isStoryModalOpen: false,
  });

  const isBrowser = typeof window !== "undefined";

  const isDataFetching =
    Object.keys(profileInfoState.profileUserInfo).length === 0 ||
    profileInfoState.loading;

  const payload = {
    userToken: getFromLocal("@token") || getCookieValue("gfoliotoken"),
  };
  const myparams = {
    payload,
  };
  useEffect(() => {
    dispatch(userSession(myparams));
    dispatch(getProfileInfo({ payload: params }));
    dispatch(getAllPostVideos());
  }, [postState.refresh]);

  useEffect(() => {
    setIsPrivateAccount(
      profileInfoState?.profileUserInfo?.accountType === "private"
    );
  }, [profileInfoState]);

  const handleModalToggle = (modalName: keyof typeof modalState) => {
    setModalState((prevState) => ({
      ...prevState,
      [modalName]: !prevState[modalName],
    }));
  };

  const handleSubmitUsernames = async ({
    playstation,
    twitch,
    xbox,
    steam,
  }: Usernames) => {
    const payload = {
      userID: authState.userData._id,
      playstation: playstation,
      twitch: twitch,
      xbox: xbox,
      steam: steam,
    };

    const successCallback = (response: any) => {
      handlePageRefresh();
      // handleCloseModal();
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

    dispatch(postUsernames(params));
  };

  console.log("hel$$", postState);
  console.log("hel$$2", profileInfoState);

  const handleVideoDetailOpen = (postID: string, detailedPost: any) => {
    setPostID(postID);
    dispatch(updateDetailedPost(detailedPost));
    setModalState((prevState) => ({
      ...prevState,
      isVideoDetailOpen: true,
    }));
  };
  const currentRoute = usePathname();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const isItemActive = (path: string) => {
    return currentRoute === path ? true : false;
  };

  function handlePageRefresh(): void {
    throw new Error("Function not implemented.");
  }

  const userVideos = postState.videos?.filter(
    (post: any) =>
      post?.userID?.username === profileInfoState.profileUserInfo.username
  );

  const isCurrentUserProfile =
    authState?.userData?.username === profileInfoState.profileUserInfo.username;

  const backgroundImage = `url(${authState.userData.coverPicture})`;

  function handleSave(platform: any, value: any) {
    // Save the value to server or local storage
    // For example, saving to local storage
    localStorage.setItem(platform, value);
    // Optionally display a success message or tick icon
  }

  return (
    <Layout>
      <div className="flex justify-center">
        {isDataFetching ? (
          <CoverPhotoLoader />
        ) : (
          <div className="relative w-full h-screen">
            <div
              className=" w-full h-80"
              style={{
                background: `linear-gradient(to bottom, transparent 40%, rgba(9, 22, 25, 1) 99%), ${backgroundImage} no-repeat center / cover`,
                backgroundSize: "cover",
                backfaceVisibility: "visible",
              }}
            ></div>
            <div className="w-full h-full bg-[#091619]"></div>

            {/* <div
              className="absolute inset-0 bg-gradient-to-t from-[#091619] via-transparent to-transparent"
              style={{ opacity: 1 }}
            ></div> */}
          </div>
        )}

        {/* Top Bar */}
        <div className="flex flex-col lg:flex-row w-screen lg:justify-end absolute top-80 lg:top-40 lg:w-4/5 ">
          {isDataFetching ? (
            <SkeletonProfileLoader />
          ) : (
            <div className="border-2 border-[#1C2C2E] rounded-lg p-2 pt-6 bg-[#091619] w-auto overflow-x-auto lg:w-72 h-fit lg:h-fit flex flex-col lg:flex-col gap-8 justify-center lg:gap-1">
              <div className="flex justify-end">
                <button
                  className="px-3 py-2 cursor-pointer hover:opacity-80"
                  onClick={toggleDropdown}
                >
                  <Image
                    src={SVG.Threedot}
                    width={20}
                    height={20}
                    className="w-9 h-8 rounded-full"
                    alt="account"
                  />
                </button>

                <div
                  id="dropdown"
                  className={`${
                    isDropdownOpen ? "block" : "hidden"
                  } flex justify-center border-2 border-[#43DD4E] rounded-lg mt--2 bg-[#162423]`}
                  style={{
                    borderWidth: "2px",
                    borderColor: "#43DD4E",
                    position: "absolute",
                    top: isBrowser && window.innerWidth <= 768 ? "11%" : "9%",
                    left:
                      isBrowser && window.innerWidth <= 768 ? "90.8%" : "29.9%",
                    transform: "translateX(-50%)",
                    width: "120px",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "-10px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      borderLeft: "5px solid transparent",
                      borderRight: "5px solid transparent",
                      borderBottom: `10px solid #43DD4E`,
                    }}
                  />
                  <ul>
                    <li>
                      <span className="font-normal cursor-pointer hover:opacity-80">
                        Share
                      </span>
                    </li>
                    <li>
                      <div
                        onClick={() => handleModalToggle("isReportModalOpen")}
                        className="font-normal cursor-pointer hover:opacity-80"
                      >
                        Report
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-col justify-center">
                <div className="flex justify-center">
                  <Image
                    className="rounded-xl w-32 h-32 object-cover border-2 border-[#43DD4E]"
                    src={profileInfoState?.profileUserInfo?.profilePicture}
                    width={10}
                    height={10}
                    sizes="100vw"
                    alt="Account Profile"
                  />
                </div>
                <span className="flex justify-center font-semibold text-white">
                  {profileInfoState?.profileUserInfo?.name}
                </span>
                <div className="flex items-center gap-6 justify-center">
                  <div
                    className="flex items-center"
                    onClick={() =>
                      copyToClipboard(authState.userData?.username)
                    }
                  >
                    <p className="text-white">
                      ({profileInfoState?.profileUserInfo?.username})
                    </p>
                    <Image
                      className="cursor-pointer hover:opacity-80"
                      src={SVG.AccountCopyUsername}
                      width={16}
                      height={16}
                      alt="Copy Username"
                    />
                  </div>
                </div>

                {!isCurrentUserProfile && (
                  <div className="flex justify-center h-8 gap-2 my-6">
                    <button className="font-bold w-40 h-10 bg-[#292D32] text-white text-center py-[10px] px-[10px] rounded-tl-[20px] rounded-br-[20px] rounded-tr-[5px] rounded-bl-[5px]">
                      follow
                    </button>
                    <button className="font-bold w-40 h-10 bg-[#37C535] text-white text-center py-[10px] px-[10px] rounded-tl-[20px] rounded-br-[20px] rounded-tr-[5px] rounded-bl-[5px]">
                      Message
                    </button>
                  </div>
                )}
                <div className="flex items-center justify-between text-white">
                  <p>Posts</p>
                  <p>{userVideos?.length || 0}</p>
                </div>
                <hr className="h-px border-0 bg-[#586769] my-2 " />
                <div className="flex items-center justify-between text-white">
                  <p>Followers</p>
                  <p>
                    {profileInfoState?.profileUserInfo?.follower?.length || 0}
                  </p>
                </div>
                <hr className="h-px border-0 bg-[#586769] my-2 " />
                <div className="flex items-center justify-between text-white">
                  <p>Following</p>
                  <p>
                    {" "}
                    {profileInfoState?.profileUserInfo?.following?.length || 0}
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center ">
                <div className="flex flex-row w-56 gap-2 lg:flex-col  lg:w-full">
                  <div className="relative flex items-center space-x-2 rounded-lg bg-[#162423] p-2 mt-2">
                    <Image
                      src={SVG.PlayStation}
                      alt="Connect with Playstation"
                      width={10}
                      height={10}
                      className="rounded-xl w-10 h-10 object-cover"
                    />
                    <input
                      className="hidden lg:block text-white font-normal text-xs bg-[#162423] outline-none py-3"
                      placeholder={
                        profileInfoState?.profileUserInfo?.socialUsernames?.find(
                          (social: any) => social.playstation
                        )?.playstation || "Connect with Playstation"
                      }
                      value={playstation}
                      onChange={(e) => setPlaystation(e.target.value)}
                    />
                    <div onClick={() => handleSubmitUsernames({ playstation })}>
                      <Image
                        className="hidden lg:block w-4 h-4 text-green-500 lg:absolute lg:right-3 lg:top-2/4 lg:transform lg:-translate-y-2/4"
                        src={SVG.Tick}
                        alt="tick"
                        width={30}
                        height={30}
                      />
                    </div>
                  </div>

                  <div className="relative flex items-center space-x-2 rounded-lg bg-[#162423] p-2 mt-2">
                    <Image
                      src={SVG.Twitch}
                      alt="Connect with Twitch"
                      width={10}
                      height={10}
                      className="rounded-xl w-10 h-10 object-cover"
                    />
                    <input
                      className="hidden lg:block text-white font-normal text-xs bg-[#162423] outline-none py-3"
                      placeholder={
                        profileInfoState?.profileUserInfo?.socialUsernames?.find(
                          (social: any) => social.twitch
                        )?.twitch || "Connect with Twitch"
                      }
                      value={twitch}
                      onChange={(e) => setTwitch(e.target.value)}
                    />
                    <div onClick={() => handleSubmitUsernames({ twitch })}>
                      <Image
                        className="hidden lg:block w-4 h-4 text-green-500 lg:absolute lg:right-3 lg:top-2/4 lg:transform lg:-translate-y-2/4"
                        src={SVG.Tick}
                        alt="tick"
                        width={30}
                        height={30}
                      />
                    </div>
                  </div>

                  <div className="relative flex items-center space-x-2 rounded-lg bg-[#162423] p-2 mt-2">
                    <Image
                      src={SVG.Xbox}
                      alt="Connect with Xbox"
                      width={10}
                      height={10}
                      className="rounded-xl w-10 h-10 object-cover"
                    />
                    <input
                      className="hidden lg:block text-white font-normal text-xs bg-[#162423] outline-none py-3"
                      placeholder={
                        profileInfoState?.profileUserInfo?.socialUsernames?.find(
                          (social: any) => social.xbox
                        )?.xbox || "Connect with xbox"
                      }
                      value={xbox}
                      onChange={(e) => setXbox(e.target.value)}
                    />
                    <div onClick={() => handleSubmitUsernames({ xbox })}>
                      <Image
                        className="hidden lg:block w-4 h-4 text-green-500 lg:absolute lg:right-3 lg:top-2/4 lg:transform lg:-translate-y-2/4"
                        src={SVG.Tick}
                        alt="tick"
                        width={30}
                        height={30}
                      />
                    </div>
                  </div>

                  <div className="relative flex items-center space-x-2 rounded-lg bg-[#162423] p-2 mt-2">
                    <Image
                      src={SVG.Steam}
                      alt="Connect with Steam"
                      width={10}
                      height={10}
                      className="rounded-xl w-10 h-10 object-cover"
                    />
                    <input
                      className="hidden lg:block text-white font-normal text-xs bg-[#162423] outline-none py-3"
                      placeholder={
                        profileInfoState?.profileUserInfo?.socialUsernames?.find(
                          (social: any) => social.steam
                        )?.steam || "Connect with steam"
                      }
                      value={steam}
                      onChange={(e) => setSteam(e.target.value)}
                    />
                    <div onClick={() => handleSubmitUsernames({ steam })}>
                      <Image
                        className="hidden lg:block w-4 h-4 text-green-500 lg:absolute lg:right-3 lg:top-2/4 lg:transform lg:-translate-y-2/4"
                        src={SVG.Tick}
                        alt="tick"
                        width={30}
                        height={30}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <h1 className="text-white font-bold my-2">About Me:</h1>
                  <p className="font-light text-xs text-[#7C7F80]">
                    {profileInfoState?.profileUserInfo?.bio}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="w-full lg:w-8/12 justify-center lg:justify-between items-center h-10 mt-10 lg:mt-24">
            {/* header */}
            <div className="flex items-center">
              <div className="flex justify-between items-center w-full sm:mx-2 lg:mx-4 relative">
                <div>
                  <p className="font-semibold text-base sm:text-lg lg:text-lg text-white">
                    My Gamefolio
                  </p>
                </div>

                <div className="bg-[#1C2C2E] flex gap-2 p-1 items-center rounded-lg overflow-hidden absolute right-10">
                  <Image
                    src={SVG.Search}
                    alt="Search"
                    width={20}
                    height={20}
                    className="absolute left-2"
                  />
                  <input
                    className="bg-[#1C2C2E] outline-none text-white flex-grow pl-8 text-sm sm:text-base"
                    placeholder="Search"
                  />
                </div>
                <Image
                  src={SVG.Filter}
                  alt="Filter"
                  width={25}
                  height={25}
                  className="absolute right-2"
                />
              </div>
            </div>

            {/* line */}
            <hr className="h-px border-0 bg-[#586769] my-2 mx-4" />
            {/* Profile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full p-4 h-full ">
              {isDataFetching ? (
                <>
                  {[...Array(6)]?.map((_, index) => (
                    <VideoSkeletonLoader key={index} />
                  ))}
                </>
              ) : (
                userVideos.map((item: any) => {
                  return (
                    <div key={item.id} className="relative">
                      <video
                        src={item.video}
                        className="w-96 sm:w-96 h-52 md:h-40 rounded-xl object-cover hover:opacity-80"
                        width={20}
                        height={20}
                        controls={false}
                        onClick={() => handleVideoDetailOpen(item._id, item)}
                      />
                      <div className="absolute bottom-1 right-2">
                        <button className="cursor-pointer hover:opacity-80">
                          <Image
                            src={SVG.Mute}
                            alt="Mute"
                            width={40}
                            height={40}
                          />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* <div className="flex justify-center items-center w-full h-[32rem] bg-[#162423] rounded-lg m-4">
              <div className="flex flex-col items-center gap-4">
                <p className="text-white font-semibold text-lg">
                  Upload to your Gamefolio
                </p>
                <div className="flex items-center gap-4 bg-[#1C2C2E] p-4 rounded-md cursor-pointer">
                  <Image
                    className="cursor-pointer w-fit"
                    src={SVG.Video}
                    alt="Video"
                    width={24}
                    height={24}
                  />
                  <p className="text-white font-bold">Video</p>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalState.isShareModalOpen}
        handleClose={() => handleModalToggle("isShareModalOpen")}
      >
        <MoreOptions
          handleCloseModal={() => handleModalToggle("isShareModalOpen")}
          data={authState.userData?.userID}
        />
      </Modal>

      <Modal
        isOpen={modalState.isFollowerModalOpen}
        handleClose={() => handleModalToggle("isFollowerModalOpen")}
      >
        <Followers
          handleCloseModal={() => handleModalToggle("isFollowerModalOpen")}
          followerData={authState.userData?.follower}
        />
      </Modal>

      <Modal
        isOpen={modalState.isFollowingModalOpen}
        handleClose={() => handleModalToggle("isFollowingModalOpen")}
      >
        <Following
          handleCloseModal={() => handleModalToggle("isFollowingModalOpen")}
          followingData={authState.userData?.following}
        />
      </Modal>

      <Modal
        isOpen={modalState.isVideoDetailOpen}
        handleClose={() => handleModalToggle("isVideoDetailOpen")}
      >
        <VideoDetails
          postID={postID}
          handleCloseModal={() => handleModalToggle("isVideoDetailOpen")}
          handlePageRefresh={() => handlePageRefresh()}
        />

        <Modal
          isOpen={modalState.isReportModalOpen}
          handleClose={() => handleModalToggle("isReportModalOpen")}
        >
          <Report
            handleCloseModal={() => handleModalToggle("isReportModalOpen")}
          />
        </Modal>
      </Modal>
    </Layout>
  );
}

export default MyGamefolio;
