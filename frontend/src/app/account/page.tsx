"use client";
import { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import { SVG } from "@/assets/SVG";
import { IMAGES } from "@/assets/images";
import { leagueGothic } from "@/font/font";
import { dispatch, useSelector } from "@/store";
import { userSession } from "@/store/slices/authSlice";
import {
  getAllPostVideos,
  getTrendingPosts,
  getUserBookmark,
  removeUserBookmark,
} from "@/store/slices/postSlice";
import { getCookieValue, getFromLocal } from "@/utils/localStorage";
import { copyToClipboard } from "@/utils/helpers";
import { ToastContainer } from "react-toastify";
import Layout from "@/components/CustomLayout/layout";
import Followers from "@/components/Modals/Followers";
import Following from "@/components/Modals/Following";
import Modal from "@/components/Modals/Modal";
import MoreOptions from "@/components/Modals/MoreOptions";
import CurrentUserStories from "@/components/story/CurrentUserStories";
import VideoDetails from "@/components/Modals/VideoDetails";
import { toastError, toastSuccess } from "@/components/Toast/Toast";
import CustomHeader from "@/components/CustomHeader/CustomHeader";
import AddClips from "@/components/Modals/AddClips";
import AddVideo from "@/components/Modals/AddVideo";
import Link from "next/link";
import { updateProfile } from "@/store/slices/authSlice";
import axios from "axios";
import { BASE_URL } from "@/services/api";

interface MyVideosSectionProps {
  authState: any;
  postState: any;
  handleVideoDetailOpen: (postID: any, detailedPost: any) => void;
}

const MyVideosSection: React.FC<MyVideosSectionProps> = ({
  authState,
  postState,
  handleVideoDetailOpen,
}) => {
  const userVideos = postState.videos.filter(
    (post: any) => post?.userID?._id === authState._id
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full p-4">
      {userVideos.map((item: any) => {
        return (
          <div key={item._id} className="relative">
            <video
              src={item.video}
              className="w-96 sm:w-96 h-52 md:h-40  rounded-xl object-cover hover:opacity-80"
              width={20}
              height={20}
              controls={false}
              onClick={() => handleVideoDetailOpen(item._id, item)}
            />
            <div className="absolute bottom-1 right-2">
              <button className="cursor-pointer hover:opacity-80">
                <Image src={SVG.Mute} alt="Mute" width={40} height={40} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

interface MyBookmarkSectionProps {
  data: Array<any>;
  handleVideoDetailOpen: (postID: any, detailedPost: any) => void;
}

const MyBookmarkSection: React.FC<MyBookmarkSectionProps> = ({
  data,
  handleVideoDetailOpen,
}) => {
  const authState = useSelector((state: any) => state.auth.userData) || [];
  const handleRemoveBookmark = async (postID: any) => {
    const payload = {
      authUserID: authState._id,
      userID: data[0]?.bookmarkInfo?.userID,
      postID: postID,
    };

    const successCallback = (response: any) => {
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

    dispatch(removeUserBookmark(params));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full p-4">
      {data?.map((bookmarkPost) => (
        <div key={bookmarkPost.post._id} className="relative">
          <video
            src={bookmarkPost.post.video}
            className="w-96 sm:w-96 h-52 md:h-40  rounded-xl object-cover hover:opacity-80"
            width={0}
            height={0}
            controls={false}
            onClick={() =>
              handleVideoDetailOpen(bookmarkPost.post._id, bookmarkPost.post)
            }
          />
          <Image
            className="absolute top-2 right-2 cursor-pointer hover:opacity-70"
            src={SVG.Bookmark}
            alt="Play"
            width={24}
            height={24}
            sizes="100vw"
            onClick={() => handleRemoveBookmark(bookmarkPost.post._id)}
          />
        </div>
      ))}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

function Account() {
  const authState = useSelector((state: any) => state.auth.userData) || [];
  const postState = useSelector((state: any) => state.post) || [];
  const [image, setImage] = useState<File | null>(null);
  const [selectedSection, setSelectedSection] = useState("videos");
  const [postID, setPostID] = useState("");
  const [detailedPost, setDetailedPost] = useState("");
  const [modalState, setModalState] = useState({
    isShareModalOpen: false,
    isFollowerModalOpen: false,
    isFollowingModalOpen: false,
    isBadgeModalOpen: false,
    isVideoDetailOpen: false,
    isAddClipsOpen: false,
    isAddVideoOpen: false,
  });

  const userVideos = postState.videos.filter(
    (post: any) => post?.userID?._id === authState._id
  );

  const payload = {
    userToken: getFromLocal("@token") || getCookieValue("gfoliotoken"),
  };
  const params = {
    payload,
  };
  useEffect(() => {
    dispatch(userSession(params));
    dispatch(getUserBookmark(params));
    dispatch(getTrendingPosts());
    dispatch(getAllPostVideos());
  }, [postState.refresh]);

  const handleModalToggle = (modalName: keyof typeof modalState) => {
    setModalState((prevState) => ({
      ...prevState,
      [modalName]: !prevState[modalName],
    }));
  };

  const handleVideoDetailOpen = (postID: string, detailedPost: any) => {
    setPostID(postID);
    setDetailedPost(detailedPost);
    setModalState((prevState) => ({
      ...prevState,
      isVideoDetailOpen: true,
    }));
  };

  const onUpdateProfilePicture = (value: string) => {
    // setValue("profilePicture", value);
  };

  function formatTimeAgo(timestamp: any) {
    const currentDate = new Date();
    const previousDate = new Date(timestamp);
    const timeDifference = currentDate.getTime() - previousDate.getTime();
    const minutesAgo = Math.floor(timeDifference / (1000 * 60));

    if (minutesAgo < 60) {
      return `${minutesAgo} minutes ago`;
    } else if (minutesAgo < 1440) {
      return `${Math.floor(minutesAgo / 60)} hours ago`;
    } else {
      return `${Math.floor(minutesAgo / 1440)} days ago`;
    }
  }

  function handlePageRefresh(): void {
    throw new Error("Function not implemented.");
  }

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setImage(file);
      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios.post(
          `${BASE_URL}/storage/image/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        onUpdateProfilePicture(response.data.imageURL);
        toastSuccess(response.data.message);
      } catch (error) {
        toastError(error);
      }
    }
  };

  const backgroundImage = `url(${IMAGES.Bgbackground})`;

  const sectionStyle = {
    backgroundImage: `linear-gradient(to bottom, rgba(4, 50, 12, 1), rgba(4, 50, 12, 0) 10%)`,
  };

  return (
    <Layout>
      <Suspense>
        {/* Header */}
        <CustomHeader>ACCOUNT</CustomHeader>

        <div style={sectionStyle} className="pt-4 z-50">
          <div
            className="flex flex-col relative items-center lg:flex-row lg:justify-center gap-4 h-60 mx-4 my-4"
            style={{
              background: `linear-gradient(to bottom, transparent 40%, rgba(0, 0, 0, 0.9) 99%), ${backgroundImage}`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="w-32 h-40">
              <Image
                className="rounded-xl w-32 h-32 object-cover border-2 border-[#43DD4E]"
                src={authState?.profilePicture}
                width={10}
                height={10}
                sizes="100vw"
                alt="Account Profile"
              />
            </div>

            <div className="flex justify-between w-9/12">
              <div
                key={authState?.userID}
                className="flex flex-1 flex-col gap-2 flex-wrap justify-center text-center lg:justify-start lg:text-start p-2"
              >
                <span className="font-semibold text-white">
                  {authState?.name}
                </span>
                <div className="flex items-center gap-6 justify-center lg:justify-between">
                  <div
                    className="flex items-center"
                    onClick={() => copyToClipboard(authState?.username)}
                  >
                    <p className="text-white">
                      ({authState?.username || "no_username"})
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

                <div className="flex h-8 items-center justify-start md:gap-8">
                  <div className="flex items-center gap-2 ">
                    <span
                      className={`${leagueGothic.className} text-lg md:text-2xl font-normal text-white`}
                    >
                      {userVideos.length || 0}
                    </span>
                    <span className="md:text-lg text-gray-400">Posts</span>
                  </div>

                  {/* Vertical divider */}
                  <div className="border-r border-gray-700 h-full rounded-full mx-2"></div>
                  <div
                    className="flex items-center gap-2 hover:opacity-80 cursor-pointer"
                    onClick={() => handleModalToggle("isFollowerModalOpen")}
                  >
                    <span
                      className={`${leagueGothic.className} text-lg md:text-2xl font-normal text-white`}
                    >
                      {authState?.follower?.length || 0}
                    </span>
                    <span className="md:text-lg text-gray-400">Followers</span>
                  </div>
                  {/* Vertical divider */}
                  <div className="border-r border-gray-700 h-full  rounded-full mx-2"></div>

                  <div
                    className="flex items-center gap-2 hover:opacity-80 cursor-pointer"
                    onClick={() => handleModalToggle("isFollowingModalOpen")}
                  >
                    <span
                      className={`${leagueGothic.className} text-lg md:text-2xl font-normal text-white`}
                    >
                      {authState?.following?.length || 0}
                    </span>
                    <span className="md:text-lg text-gray-400">Following</span>
                  </div>
                </div>
                <h1 className="font-bold">About Me!</h1>
                <p className="text-gray-400">{authState?.bio}</p>
              </div>

              <label htmlFor="dropzone-file">
                <div className="flex h-10 px-2 items-center border-2 border-gray-50 rounded-xl gap-2 hover:opacity-80 cursor-pointer">
                  <Image
                    className="w-5 h-4 object-cover"
                    src={SVG.Camera2}
                    width={10}
                    height={10}
                    sizes="100vw"
                    alt="Account Profile"
                  />
                  <p className="font-normal">Edit coverphoto</p>
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    onChange={handleUploadImage}
                  />
                </div>
              </label>
            </div>
          </div>

          {/* Stories */}
          <CurrentUserStories />

          {/* Top Bar */}

          <div className="flex mx-3">
            <div className="hidden w-2/5 h-fit md:flex flex-col sm:w-60 md:w-60 lg:w-96 h-80 border-2 border-[#1C2C2E] rounded-lg p-1">
              <h1 className="font-bold my-2">Connect</h1>
              <div className="flex items-center gap-2 rounded-lg bg-[#162423] p-2 mt-2">
                <Image
                  className="rounded-xl w-10 h-10 object-cover"
                  src={SVG.PlayStation}
                  width={10}
                  height={10}
                  sizes="100vw"
                  alt="Account Profile"
                />
                <p className="font-light text-xs ">Connect with Playstation</p>
              </div>

              <div className="flex items-center gap-2 rounded-lg bg-[#162423] p-2 mt-2">
                <Image
                  className="rounded-xl w-10 h-10 object-cover"
                  src={SVG.Twitch}
                  width={10}
                  height={10}
                  sizes="100vw"
                  alt="Account Profile"
                />
                <p className="font-normal text-xs ">Connect with Twitch</p>
              </div>

              <div className="flex items-center gap-2 rounded-lg bg-[#162423] p-2 mt-2">
                <Image
                  className="rounded-xl w-10 h-10 object-cover"
                  src={SVG.Xbox}
                  width={10}
                  height={10}
                  sizes="100vw"
                  alt="Account Profile"
                />
                <p className="font-normal text-xs ">Connect with Xbox</p>
              </div>

              <div className="flex items-center gap-2 rounded-lg bg-[#162423] p-2 mt-2">
                <Image
                  className="rounded-xl w-10 h-10 object-cover"
                  src={SVG.Steam}
                  width={10}
                  height={10}
                  sizes="100vw"
                  alt="Account Profile"
                />
                <p className="font-normal text-xs ">Connect with Steam</p>
              </div>
            </div>

            <div className="sm:w-[500px] md:w-[600px] lg:w-[800px]  justify-around items-center h-10">
              {/* Profile */}
              <div key={authState?.userID} className="flex flex-col gap-4 mx-4">
                <div className="h-10 w-full flex justify-around items-center">
                  <div>
                    <div
                      className={`flex gap-2 my-6 items-center cursor-pointer ${
                        selectedSection === "videos"
                          ? "text-white"
                          : "text-gray-500"
                      }`}
                      onClick={() => setSelectedSection("videos")}
                    >
                      <Image
                        className={`${
                          selectedSection !== "videos"
                            ? "opacity-40"
                            : "opacity-100"
                        }`}
                        src={SVG.AccountMyVideos}
                        alt="My Videos"
                        width={24}
                        height={24}
                      />
                      <span className="text-xs md:text-base">My Videos</span>
                    </div>
                    {selectedSection === "videos" && (
                      <div className="w-full h-1 bg-[#62C860] rounded-lg"></div>
                    )}
                  </div>

                  <div className="">
                    <div
                      className={`flex my-6 gap-2 items-center cursor-pointer ${
                        selectedSection === "bookmarked"
                          ? "text-white"
                          : "text-gray-500"
                      }`}
                      onClick={() => setSelectedSection("bookmarked")}
                    >
                      <Image
                        className={`${
                          selectedSection !== "bookmarked"
                            ? "opacity-40"
                            : "opacity-100"
                        }`}
                        src={SVG.AccountMyBookmarked}
                        alt="My Bookmarked"
                        width={22}
                        height={22}
                      />
                      <span className="text-xs md:text-base">
                        My Bookmarked
                      </span>
                    </div>
                    {selectedSection === "bookmarked" && (
                      <div className="w-full h-1 bg-[#62C860] rounded-lg"></div>
                    )}
                  </div>
                </div>
                <hr className="h-px border-0 bg-gray-700" />

                <div className="flex flex-col border border-dashed border-green-800 rounded-lg px-4 py-4 justify-center items-start gap-4">
                  <span className="font-bold text-sm md:text-lg">Add New</span>
                  <div className="flex justify-between gap-2 w-full">
                    <div
                      className="bg-[#162423] rounded-lg flex justify-center items-center w-6/12 h-24 gap-2 cursor-pointer hover:opacity-80"
                      onClick={() => handleModalToggle("isAddClipsOpen")}
                    >
                      <div>
                        <Image
                          className="cursor-pointer w-fit"
                          src={SVG.Clip}
                          alt="Threedots"
                          width={24}
                          height={24}
                        />
                      </div>
                      <p className="font-bold">Post Clips</p>
                    </div>

                    <div
                      className="bg-[#162423] rounded-lg flex justify-center items-center w-6/12 h-24 gap-2 cursor-pointer hover:opacity-80"
                      onClick={() => {
                        handleModalToggle("isAddVideoOpen");
                      }}
                    >
                      <div>
                        <Image
                          className="cursor-pointer w-fit"
                          src={SVG.Video}
                          alt="Threedots"
                          width={24}
                          height={24}
                        />
                      </div>
                      <p className="font-bold">Post Videos</p>
                    </div>
                  </div>
                </div>
                {/* green line */}

                {/* Content Section */}
                {selectedSection === "videos" ? (
                  <MyVideosSection
                    authState={authState}
                    postState={postState}
                    handleVideoDetailOpen={handleVideoDetailOpen}
                  />
                ) : (
                  <MyBookmarkSection
                    data={postState.bookmarks}
                    handleVideoDetailOpen={handleVideoDetailOpen}
                  />
                )}
              </div>
            </div>

            <div className="hidden w-2/5 h-fit md:flex flex-col  sm:w-72 md:w-72 lg:w-96 h-screen border-2 border-[#1C2C2E] rounded-lg p-1 overflow-hidden overflow-y-auto">
              <h1 className="font-bold m-2">Current Badge</h1>
              <div className="flex justify-center items-center gap-3 mt-2">
                <Image
                  src={IMAGES.AccountCurrentBadgeIcon}
                  alt="Badge"
                  width={45}
                  height={45}
                />
                <Image
                  src={IMAGES.Badges2}
                  alt="Badge"
                  width={40}
                  height={40}
                />
                <Image
                  src={IMAGES.Badges3}
                  alt="Badge"
                  width={40}
                  height={40}
                />
                <Image
                  src={IMAGES.Badges4}
                  alt="Badge"
                  width={40}
                  height={40}
                />
                <Image
                  src={IMAGES.Badges5}
                  alt="Badge"
                  width={40}
                  height={40}
                />
              </div>

              <div className="rounded-lg p-2 gap-3 mt-2">
                <h1 className="font-bold">Suggested Videos:</h1>
                <div className="">
                  {postState?.trendingVideos?.slice(0, 3).map((item: any) => (
                    <div
                      key={item._id}
                      className="border-2 h-40 border-[#1C2C2E] rounded-lg p-2 gap-3 mt-2"
                    >
                      <div className="flex">
                        <video
                          src={item.video}
                          className="w-20 h-24 rounded-xl object-cover hover:opacity-80"
                          width={20}
                          height={20}
                          controls={false}
                          onClick={() => handleVideoDetailOpen(item._id, item)}
                        />

                        <div className="flex flex-col gap-2 ml-2">
                          <div className="flex items-center gap-2">
                            <Image
                              className="w-9 h-10 rounded-lg"
                              src={item?.userID?.profilePicture}
                              alt="Profile"
                              width={50}
                              height={50}
                              sizes="100vw"
                              quality={80}
                              loading="lazy"
                            />
                            <div className="flex flex-col">
                              <h1 className="w-[180px] sm:w-[220px] text-xs md:text-xs sm:text-xs font-semibold text-white hover:opacity-80">
                                {item?.userID?.name}
                              </h1>
                              <p className="text-xs font-light text-gray-400">
                                {formatTimeAgo(item.date)}
                              </p>
                            </div>
                          </div>
                          <p className="w-40 text-[0.70rem] font-light text-gray-400">
                            {item?.userID?.bio}
                            <Link
                              href={`/account/${item?.userID?.username}`}
                              key={item._id}
                            >
                              <span className="text-[#37C535] underline">
                                See more
                              </span>
                            </Link>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center my-3 mx-2">
                        <div className="flex items-center p-2 mr-2 rounded-lg bg-[#162423]">
                          <Image
                            className="mr-2 cursor-pointer hover:opacity-80"
                            src={SVG.Like}
                            alt="Like"
                            width={30}
                            height={30}
                          />
                          <p className="text-white"></p>
                        </div>

                        <div className="flex items-center p-2 mr-2 rounded-lg bg-[#162423]">
                          <Image
                            className="mr-2 cursor-pointer hover:opacity-80"
                            src={SVG.Love}
                            alt="Love"
                            width={30}
                            height={30}
                          />
                          <p className="text-white"></p>
                        </div>

                        <div className="p-2 mr-2 rounded-lg bg-[#162423]">
                          <Image
                            className="cursor-pointer hover:opacity-80"
                            src={SVG.Chat}
                            alt="Comment"
                            width={30}
                            height={30}
                          />
                        </div>

                        <div className="p-2 mr-2 rounded-lg bg-[#162423]">
                          <Image
                            className="cursor-pointer hover:opacity-80"
                            src={SVG.Trending}
                            alt="Trending1"
                            width={30}
                            height={30}
                          />
                        </div>

                        <Image
                          className="cursor-pointer hover:opacity-80"
                          src={SVG.GGGCoin}
                          alt="Gcoin"
                          width={45}
                          height={45}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Modal
            isOpen={modalState.isShareModalOpen}
            handleClose={() => handleModalToggle("isShareModalOpen")}
          >
            <MoreOptions
              handleCloseModal={() => handleModalToggle("isShareModalOpen")}
              data={authState?.userID}
            />
          </Modal>

          <Modal
            isOpen={modalState.isFollowerModalOpen}
            handleClose={() => handleModalToggle("isFollowerModalOpen")}
          >
            <Followers
              handleCloseModal={() => handleModalToggle("isFollowerModalOpen")}
              followerData={authState?.follower}
            />
          </Modal>

          <Modal
            isOpen={modalState.isFollowingModalOpen}
            handleClose={() => handleModalToggle("isFollowingModalOpen")}
          >
            <Following
              handleCloseModal={() => handleModalToggle("isFollowingModalOpen")}
              followingData={authState?.following}
            />
          </Modal>

          <Modal
            isOpen={modalState.isVideoDetailOpen}
            handleClose={() => handleModalToggle("isVideoDetailOpen")}
          >
            <VideoDetails
              postID={postID}
              detailedPost={detailedPost}
              handleCloseModal={() => handleModalToggle("isVideoDetailOpen")}
              handlePageRefresh={() => handlePageRefresh()}
            />
          </Modal>

          <Modal
            isOpen={modalState.isAddClipsOpen}
            handleClose={() => handleModalToggle("isAddClipsOpen")}
          >
            <AddClips
              handleCloseModal={() => handleModalToggle("isAddClipsOpen")}
            />
          </Modal>

          <Modal
            isOpen={modalState.isAddVideoOpen}
            handleClose={() => handleModalToggle("isAddVideoOpen")}
          >
            <AddVideo
              handleCloseModal={() => handleModalToggle("isAddVideoOpen")}
            />
          </Modal>
        </div>
      </Suspense>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </Layout>
  );
}

export default Account;
