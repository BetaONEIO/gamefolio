"use client";
import { useEffect, useState } from "react";
import { SVG } from "@/assets/SVG";
import { IMAGES } from "@/assets/images";
import { dispatch, useSelector } from "@/store";
import { userSession } from "@/store/slices/authSlice";
import { getAllPostVideos } from "@/store/slices/postSlice";
import { copyToClipboard } from "@/utils/helpers";
import { getCookieValue, getFromLocal } from "@/utils/localStorage";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

interface VideoState {
  isMuted?: boolean;
}

const Portfolio = () => {
  const authState = useSelector((state: any) => state.auth.userData) || [];
  const postState = useSelector((state: any) => state.post) || [];
  const [open, setOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState("videos");
  const [modalState, setModalState] = useState({
    isShareModalOpen: false,
    isFollowerModalOpen: false,
    isFollowingModalOpen: false,
    isBadgeModalOpen: false,
  });

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

  const handleModalToggle = (modalName: keyof typeof modalState) => {
    setModalState((prevState) => ({
      ...prevState,
      [modalName]: !prevState[modalName],
    }));
  };

  const [videoStates, setVideoStates] = useState<{ [key: string]: VideoState }>(
    {}
  );
  const userVideos = postState.videos.filter(
    (post: any) => post?.userID?._id === authState._id
  );

  function chunkArray(array: any[], size: number) {
    return array.reduce(
      (chunks, _, i) =>
        (i % size ? chunks[chunks.length - 1].push(_) : chunks.push([_])) &&
        chunks,
      []
    );
  }

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
  const handleToggleMute = (clipID: string) => {
    setVideoStates((prevStates) => ({
      ...prevStates,
      [clipID]: {
        ...prevStates[clipID],
        isMuted: !prevStates[clipID]?.isMuted,
      },
    }));
  };

  const backgroundImage = `url(${IMAGES.bgImage})`;

  return (
    <section
      style={{
        background: `linear-gradient(to bottom, transparent 40%, rgba(0, 0, 0, 0.9) 60%), ${backgroundImage}`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="bg-no-repeat bg-cover bg-center bg-gray-700 bg-blend-multiply bg-opacity-60 min-h-screen flex flex-col justify-center"
    >
      <div className="flex justify-center">
        {/* Profile */}
        <div
          key={authState?.userID}
          className="lg:w-8/12 md:w-10/12 w-full flex flex-col gap-4"
        >
          <div className="flex flex-col lg:flex-row lg:justify-center w-full gap-4 ">
            <div className="w-40 h-40">
              <Image
                className="rounded-xl w-40 h-40 object-cover"
                src={authState?.profilePicture}
                width={10}
                height={10}
                sizes="100vw"
                alt="Account Profile"
              />
            </div>
            <div className="flex flex-1 flex-col gap-2 flex-wrap justify-center text-center lg:justify-start lg:text-start p-2 ">
              <span>{authState?.name}</span>
              <div className="flex items-center gap-6 justify-center lg:justify-between">
                <div
                  className="flex items-center"
                  onClick={() => copyToClipboard(authState?.username)}
                >
                  <p>({authState?.username || "no_username"})</p>
                  <Image
                    className="cursor-pointer hover:opacity-80"
                    src={SVG.AccountCopyUsername}
                    width={16}
                    height={16}
                    alt="Copy Username"
                  />
                </div>
              </div>
              <span className="text-gray-400">{authState?.bio}</span>

              {/* socials */}
              <div className="flex items-center gap-16">
                <div className="flex h-8 my-4 gap-8 sm:gap-8 -space-x-4">
                  <div className="relative">
                    <Image
                      className="w-8 h-8 p-0.5 dark:bg-[#FFF] rounded-lg"
                      src={SVG.Twitch}
                      alt="Next"
                      width={0}
                      height={0}
                      sizes="100vw"
                    />
                    <Image
                      className="absolute top-6 left-6"
                      src={SVG.Verified}
                      alt="Next"
                      width={16}
                      height={16}
                      sizes="100vw"
                    />
                  </div>
                  <div className="relative">
                    <Image
                      className="relative w-8 h-8 p-0.5 dark:bg-[#FFF] rounded-lg"
                      src={SVG.PlayStation}
                      alt="Next"
                      width={0}
                      height={0}
                      sizes="100vw"
                    />
                    <Image
                      className="absolute top-6 left-6"
                      src={SVG.Verified}
                      alt="Next"
                      width={16}
                      height={16}
                      sizes="100vw"
                    />
                  </div>
                  <div className="relative">
                    <Image
                      className="relative w-8 h-8 p-0.5 dark:bg-[#FFF] rounded-lg"
                      src={SVG.Xbox}
                      alt="Next"
                      width={0}
                      height={0}
                      sizes="100vw"
                    />
                    <Image
                      className="absolute top-6 left-6"
                      src={SVG.Verified}
                      alt="Next"
                      width={16}
                      height={16}
                      sizes="100vw"
                    />
                  </div>
                  <div className="relative">
                    <Image
                      className="relative w-8 h-8 p-0.5 dark:bg-[#FFF] rounded-lg"
                      src={SVG.Steam}
                      alt="Next"
                      width={0}
                      height={0}
                      sizes="100vw"
                    />
                    <Image
                      className="absolute top-6 left-6"
                      src={SVG.Verified}
                      alt="Next"
                      width={16}
                      height={16}
                      sizes="100vw"
                    />
                  </div>
                </div>

                {/* follow button */}
                <div className="flex h-8 gap-6 sm:gap-6">
                  <button className="font-bold w-68 h-10 bg-[#37C535] text-white text-center py-[10px] px-[40px] rounded-tl-[20px] rounded-br-[20px] rounded-tr-[5px] rounded-bl-[5px] mb-3">
                    Follow on Gamefolio
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-md font-bold">Gamefolio</p>
          </div>

          {/* videos section */}
          <div className="flex justify-start items-start gap-4">
            <Swiper
              slidesPerView={1}
              pagination={{ clickable: true }}
              modules={[Pagination]}
              className="mySwiper"
              height={100}
              // spaceBetween={30}
            >
              {chunkArray(userVideos, 8).map(
                (rowVideos: any, rowIndex: any) => (
                  <SwiperSlide key={rowIndex}>
                    <div className="grid grid-cols-4 gap-4 mb-10">
                      {rowVideos.map((item: any) => {
                        const videoState = videoStates[item._id] || {
                          isMuted: false,
                        };
                        return (
                          <div key={item.id} className="relative">
                            <video
                              src={item.video}
                              className="w-96 sm:w-56 h-52 md:h-32 rounded-xl object-cover hover:opacity-80"
                              width={20}
                              height={20}
                              controls={false}
                              onClick={handleVideoClick}
                              muted={videoState.isMuted}
                            />
                            <div className="absolute bottom-1 right-2">
                              <button
                                className="cursor-pointer hover:opacity-80"
                                onClick={() => handleToggleMute(item._id)}
                              >
                                {videoStates[item._id]?.isMuted ? (
                                  <Image
                                    src={SVG.Mute}
                                    alt="Mute"
                                    width={40}
                                    height={40}
                                  />
                                ) : (
                                  <Image
                                    src={SVG.UnMute}
                                    alt="Unmute"
                                    width={40}
                                    height={40}
                                  />
                                )}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </SwiperSlide>
                )
              )}
            </Swiper>
          </div>

          <hr className="border-t border-[#162423]" />

          <div className="flex justify-center items-center gap-8 mt-4">
            <Image src={SVG.Facebook1} alt="Facebook" width={40} height={40} />
            <Image src={SVG.Instagram} alt="Facebook" width={40} height={40} />
            <Image src={SVG.X} alt="Facebook" width={40} height={40} />
            <Image
              src={SVG.GamefolioCoin}
              alt="Facebook"
              width={40}
              height={40}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
