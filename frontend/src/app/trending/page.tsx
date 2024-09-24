// "use client";
// import { SVG } from "@/assets/SVG";
// import CustomHeader from "@/components/CustomHeader/CustomHeader";
// import Layout from "@/components/CustomLayout/layout";
// import DeletePost from "@/components/Modals/DeletePost";
// import Modal from "@/components/Modals/Modal";
// import VideoDetails from "@/components/Modals/VideoDetails";
// import { fetchGameList } from "@/services/api";
// import { dispatch, useSelector } from "@/store";
// import { userSession } from "@/store/slices/authSlice";
// import {
//   getTrendingPosts,
//   refreshPage,
//   updateDetailedPost,
// } from "@/store/slices/postSlice";
// import { getCookieValue, getFromLocal } from "@/utils/localStorage";
// import Image from "next/image";
// import { Suspense, useEffect, useState } from "react";
// import Loading from "./loading";
// // Import Swiper React components
// import { Swiper, SwiperSlide } from "swiper/react";
// // Import Swiper styles
// import "swiper/css";
// import "swiper/css/effect-fade";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// // import required modules
// import { EffectFade, Navigation, Pagination } from "swiper/modules";

// const SkeletonLoader = () => (
//   <div className="flex flex-col gap-6 w-24">
//     <div className="flex justify-between items-center">
//       <div className="flex gap-2">
//         <div className="w-14 h-14 bg-gray-700 rounded-xl animate-pulse"></div>
//         <div className="flex flex-col gap-1">
//           <div className="w-20 h-3 bg-gray-700 rounded animate-pulse"></div>
//           <div className="w-32 h-5 bg-gray-700 rounded animate-pulse"></div>
//           <div className="w-24 h-3 bg-gray-700 rounded animate-pulse"></div>
//         </div>
//       </div>
//     </div>
//   </div>
// );

// const SkeletonLoaderVideo = () => {
//   return (
//     <div className="flex-shrink-0 flex flex-col gap-2 w-68 h-56 border-2 border-[#1C2C2E] rounded-xl mx-1 animate-pulse overflow-x-auto">
//       <div className="relative w-full h-36 bg-gray-700 rounded-2xl"></div>
//       <div className="flex items-center gap-4">
//         <div className="w-10 h-6 ml-2 bg-gray-700 rounded-xl"></div>
//         <div>
//           <div className="w-24 h-4 bg-gray-700 rounded"></div>
//           <div className="w-16 h-3 mt-1 bg-gray-700 rounded"></div>
//         </div>
//       </div>
//       <div className="flex items-center justify-between text-center mx-4">
//         <div className="w-6 h-2 bg-gray-700 rounded-full"></div>
//         <div className="w-6 h-2 bg-gray-700 rounded-full"></div>
//         <div className="w-6 h-2 bg-gray-700 rounded-full"></div>
//       </div>
//     </div>
//   );
// };

// const SkeletonTrendingLoader = () => {
//   return (
//     <SwiperSlide>
//       <div className="animate-pulse w-full h-80 rounded-xl bg-gray-700" />

//       <div
//         className="absolute inset-0 bg-gradient-to-t from-[#091619] via-transparent to-transparent"
//         style={{ opacity: 1 }}
//       ></div>
//     </SwiperSlide>
//   );
// };

// function Trending() {
//   const postState = useSelector((state: any) => state.post) || [];
//   const [postID, setPostID] = useState("");
//   const [detailedPost, setDetailedPost] = useState("");
//   const [videoDurations, setVideoDurations] = useState<{
//     [key: string]: number;
//   }>({});
//   const [optionsForGame, setOptionsForGame] = useState([]);
//   const [searchText, setSearchText] = useState("");
//   const [filteredOptions, setFilteredOptions] = useState(optionsForGame);

//   const { loading } = postState;

//   const payload = {
//     userToken: getFromLocal("@token") || getCookieValue("gfoliotoken"),
//   };

//   const params = {
//     payload,
//   };

//   useEffect(() => {
//     dispatch(userSession(params));
//     dispatch(getTrendingPosts());
//     handleGameList();
//   }, [postState.refresh]);

//   useEffect(() => {
//     setFilteredOptions(optionsForGame);
//   }, [optionsForGame]);

//   // console.log(" hjeoeo", optionsForGame);
//   const [modalState, setModalState] = useState({
//     isPostShareOpen: false,
//     isVideoDetailOpen: false,
//     isPostDeleteOpen: false,
//   });

//   const sectionStyle = {
//     backgroundImage: `linear-gradient(to bottom, rgba(4, 50, 12, 1), rgba(4, 50, 12, 0) 10%)`,
//   };
//   const removeGame = (gameNameToRemove: any) => {
//     // Filter out the game named "Just Chatting"
//     const filteredGames = filteredOptions?.filter(
//       (item: any) => item.name !== gameNameToRemove
//     );
//     return filteredGames;
//   };

//   // Assuming you have the name of the game as "Just Chatting"
//   const gameToRemove = "Just Chatting";

//   // Call removeGame function to filter out the game
//   const filteredGames = removeGame(gameToRemove);

//   const handleModalToggle = (
//     modalName: keyof typeof modalState,
//     postID?: any,
//     detailedPost?: any
//   ) => {
//     setPostID(postID);
//     dispatch(updateDetailedPost(detailedPost));
//     setModalState((prevState) => ({
//       ...prevState,
//       [modalName]: !prevState[modalName],
//     }));
//   };

//   const handleVideoMetadata = (
//     event: React.SyntheticEvent<HTMLVideoElement, Event>,
//     videoId: string
//   ) => {
//     const video = event.currentTarget;
//     const duration = video.duration;
//     setVideoDurations((prevDurations) => ({
//       ...prevDurations,
//       [videoId]: duration,
//     }));
//   };

//   function formatTimeAgo(timestamp: any) {
//     const currentDate = new Date();
//     const previousDate = new Date(timestamp);
//     const timeDifference = currentDate.getTime() - previousDate.getTime();
//     const minutesAgo = Math.floor(timeDifference / (1000 * 60));

//     if (minutesAgo < 60) {
//       return `${minutesAgo} minutes ago`;
//     } else if (minutesAgo < 1440) {
//       return `${Math.floor(minutesAgo / 60)} hours ago`;
//     } else {
//       return `${Math.floor(minutesAgo / 1440)} days ago`;
//     }
//   }

//   const formatTime = (seconds: number): string => {
//     if (isNaN(seconds)) return "loading";
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = Math.floor(seconds % 60);
//     const formattedTime = `${minutes}:${
//       remainingSeconds < 10 ? "0" : ""
//     }${remainingSeconds}`;
//     return formattedTime;
//   };

//   const handleGameList = async () => {
//     const gettingGameList = await fetchGameList();
//     setOptionsForGame(gettingGameList);
//   };

//   const debounce = (func: any, delay: any) => {
//     let timeoutId: any;
//     return function (...args: any) {
//       clearTimeout(timeoutId);
//       timeoutId = setTimeout(() => {
//         func(...args);
//       }, delay);
//     };
//   };

//   const delayedSearch = debounce((inputValue: any) => {
//     const filtered = optionsForGame?.filter((option: any) => {
//       return option?.name?.toLowerCase().includes(inputValue);
//     });
//     setFilteredOptions(filtered);
//   }, 1000);

//   const handlePageRefresh = () => {
//     dispatch(refreshPage());
//   };

//   const isTrendingDataFetching = filteredGames.length === 0;

//   return (
//     <Layout>
//       {/* Header */}
//       <CustomHeader>TRENDING</CustomHeader>

//       <section
//         style={sectionStyle}
//         className="flex flex-col items-center bg-[#091619] min-h-screen relative"
//       >
//         <div className="p-4 flex flex-col w-full h-full gap-2">
//           <div className="flex items-center gap-3">
//             <p className="font-semibold text-base sm:text-lg lg:text-lg text-white">
//               Trending Games
//             </p>
//             <div className="flex items-center bg-[#49DE4D] px-1 rounded-md">
//               <Image
//                 className="mr-2 cursor-pointer hover:opacity-80"
//                 src={SVG.Trending}
//                 alt="Trending"
//                 width={20}
//                 height={20}
//               />
//               <p className="font-semibold text-base sm:text-md lg:text-md text-white">
//                 Trending
//               </p>
//             </div>
//           </div>

//           <div className="flex gap-4 h-80 w-full relative">
//             <div className="relative w-[70%]">
//               {isTrendingDataFetching ? (
//                 <SkeletonTrendingLoader />
//               ) : (
//                 <Swiper
//                   effect={"fade"}
//                   navigation={true}
//                   pagination={{ clickable: true }}
//                   modules={[EffectFade, Navigation, Pagination]}
//                   className="mySwiper h-80 sm:w-full rounded-lg"
//                 >
//                   {/* {filteredOptions?.length === 0 ? (
//                     <>
//                       {[...Array(2)]?.map((_, index) => (
//                         <trendingLoader key={index} />
//                       ))}
//                     </>
//                   ) : ( */}

//                   {filteredGames?.slice(0, 3)?.map((item: any) => (
//                     <SwiperSlide key={item.id}>
//                       <Image
//                         width={800}
//                         height={400}
//                         className="w-full h-full rounded-xl bg-cover bg-no-repeat bg-center hover:scale-105 transition-transform duration-100"
//                         src={item.box_art_url.replace(
//                           "{width}x{height}",
//                           "800x400"
//                         )}
//                         alt={item.name}
//                         style={styles.swiperImage}
//                         sizes="100vw"
//                       />
//                       <div style={styles.overlay}></div>
//                     </SwiperSlide>
//                   ))}
//                 </Swiper>
//               )}
//               <div className="absolute top-4 left-4 flex gap-4 z-10">
//                 <button
//                   className="font-semibold rounded-2xl px-4 py-2 text-white cursor-pointer hover:text-[#43DD4E]"
//                   style={{ backgroundColor: "rgba(41, 45, 50, 0.8)" }}
//                 >
//                   Action
//                 </button>
//                 <button
//                   className="font-semibold rounded-2xl px-4 py-2 text-white cursor-pointer hover:text-[#43DD4E]"
//                   style={{ backgroundColor: "rgba(41, 45, 50, 0.8)" }}
//                 >
//                   Fighting
//                 </button>
//                 <button
//                   className="font-semibold rounded-2xl px-4 py-2 text-white cursor-pointer hover:text-[#43DD4E]"
//                   style={{ backgroundColor: "rgba(41, 45, 50, 0.8)" }}
//                 >
//                   Thrilling
//                 </button>
//               </div>
//             </div>

//             <div
//               className="hidden w-[30%] h-[22.5rem] md:flex flex-col gap-6 rounded-lg bg-[#091619] border border-[#1C2C2E] px-4 py-6 overflow-y-auto"
//               style={styles.scroller}
//             >
//               <div className="flex justify-start items-center">
//                 <span className="text-white font-bold">Upcoming Updates</span>
//               </div>

//               <div className="flex flex-col gap-4">
//                 {filteredGames?.length === 0 ? (
//                   <>
//                     {[...Array(10)]?.map((_, index) => (
//                       <SkeletonLoader key={index} />
//                     ))}
//                   </>
//                 ) : (
//                   filteredGames?.slice(0, 20)?.map((item: any) => (
//                     <div
//                       key={item.id}
//                       className="flex justify-between items-center"
//                     >
//                       <div className="flex gap-2 overflow-hidden rounded-xl">
//                         <Image
//                           width={64}
//                           height={64}
//                           className="w-16 h-16 rounded-xl hover:scale-105 transition-transform duration-100"
//                           src={item.box_art_url.replace(
//                             "{width}x{height}",
//                             "64x64"
//                           )}
//                           alt={item.name}
//                         />
//                         <div className="flex flex-col">
//                           <span className="text-sm font-bold text-[#43DD4E]">
//                             Trending Now
//                           </span>
//                           <span className="text-md font-semibold hover:text-[#43DD4E]">
//                             {item.name}
//                           </span>
//                           <span className="text-xs text-[#A1A1A1] hover:opacity-80">
//                             New addition Arrived
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   ))
//                 )}
//               </div>
//             </div>
//           </div>

//           <div className="flex items-center gap-3 mt-4">
//             <p className="font-semibold text-base sm:text-lg lg:text-lg text-white">
//               Trending Games
//             </p>
//             <div className="flex items-center bg-[#49DE4D] px-1 rounded-md">
//               <Image
//                 className="mr-2 cursor-pointer hover:opacity-80"
//                 src={SVG.Trending}
//                 alt="Trending"
//                 width={20}
//                 height={20}
//               />
//               <p className="font-semibold text-base sm:text-md lg:text-md text-white">
//                 Trending
//               </p>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//             {loading ? (
//               <>
//                 {[...Array(4)]?.map((_, index) => (
//                   <SkeletonLoaderVideo key={index} />
//                 ))}
//               </>
//             ) : postState.trendingVideos?.length === 0 ? (
//               <div className="flex h-full justify-center items-center py-4 text-gray-500">
//                 No data available
//               </div>
//             ) : (
//               postState?.trendingVideos?.map((item: any) => (
//                 <div
//                   key={item?.userID}
//                   className="flex flex-col w-68 h-60 border-2 border-[#1C2C2E] rounded-xl my-2 cursor-pointer hover:opacity-80"
//                   onClick={() =>
//                     handleModalToggle("isVideoDetailOpen", item._id, item)
//                   }
//                 >
//                   <div className="relative overflow-hidden rounded-t-xl aspect-w-16 aspect-h-9">
//                     <video
//                       src={item.video}
//                       className="object-cover w-full h-36 rounded-xl hover:scale-105 transition-transform duration-100"
//                       controls={false}
//                       autoPlay={false}
//                       width={50}
//                       height={50}
//                       onLoadedMetadata={(e) => handleVideoMetadata(e, item._id)}
//                     />

//                     <span className="absolute bottom-2 right-3 text-white">
//                       {formatTime(videoDurations[item._id])}
//                     </span>
//                   </div>

//                   <div className="p-2">
//                     <div className="flex items-center gap-2 mb-4">
//                       <Image
//                         className="rounded-xl w-10 h-10 object-cover "
//                         src={item?.userID?.profilePicture}
//                         alt="Account Profile"
//                         height={40}
//                         width={40}
//                       />
//                       <div>
//                         <p className="font-semibold text-sm text-white hover:text-[#43DD4E]">
//                           {item?.userID?.name.split(" ").slice(0, 2).join(" ")}
//                         </p>
//                         <p className="text-xs text-gray-400 hover:opacity-80">
//                           {formatTimeAgo(item.date)}
//                         </p>
//                       </div>
//                     </div>

//                     <div className="flex justify-between mx-1">
//                       <div className="flex items-center gap-2">
//                         <Image
//                           className="cursor-pointer hover:opacity-80"
//                           src={SVG.Like}
//                           alt="Like"
//                           width={20}
//                           height={20}
//                         />
//                         <p className="text-white">
//                           {
//                             item.reactions?.filter(
//                               (reaction: any) =>
//                                 reaction.reactionType === "like"
//                             )?.length
//                           }
//                         </p>
//                       </div>

//                       <div className="flex items-center gap-2">
//                         <Image
//                           className="cursor-pointer hover:opacity-80"
//                           src={SVG.Love}
//                           alt="Love"
//                           width={20}
//                           height={20}
//                         />
//                         <p className="text-white">
//                           {
//                             item.reactions?.filter(
//                               (reaction: any) =>
//                                 reaction.reactionType === "love"
//                             )?.length
//                           }
//                         </p>
//                       </div>

//                       <div className="flex items-center gap-2">
//                         <Image
//                           className="cursor-pointer hover:opacity-80"
//                           src={SVG.Comment}
//                           alt="Comment"
//                           width={25}
//                           height={25}
//                         />
//                         <p className="text-white">{item.comments?.length}</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>

//         <Modal
//           isOpen={modalState.isVideoDetailOpen}
//           handleClose={() => handleModalToggle("isVideoDetailOpen")}
//         >
//           <VideoDetails
//             postID={postID}
//             handleCloseModal={() => handleModalToggle("isVideoDetailOpen")}
//             handlePageRefresh={() => handlePageRefresh()}
//           />
//         </Modal>

//         <Modal
//           isOpen={modalState.isPostDeleteOpen}
//           handleClose={() => handleModalToggle("isPostDeleteOpen")}
//         >
//           <DeletePost
//             postID={postID}
//             handleCloseModal={() => handleModalToggle("isPostDeleteOpen")}
//             handlePageRefresh={() => handlePageRefresh()}
//           />
//         </Modal>
//       </section>
//     </Layout>
//   );
// }

// const styles = {
//   container: {
//     flex: 1,
//     width: "100%",
//     justifyContent: "space-between",
//   },
//   swiperContainer: {
//     // width: "80%",
//     // height: "30%",
//   },
//   swiperImage: {
//     width: "100%",
//     height: "100%",
//   },
//   overlay: {
//     width: "100%",
//     height: "100%",
//     //   background:
//     //     "linear-gradient(to top, rgba(0, 0, 0, 0.4) 100%, rgba(0, 0, 0, 0) 100%)",
//   },
//   scroller: {
//     scrollbarColor: "#43DD4E #FFFFFF",
//   },
// };

// export default Trending;
