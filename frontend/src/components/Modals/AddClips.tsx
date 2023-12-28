"use client";
import { SVG } from "@/assets/SVG";
import { leagueGothic } from "@/font/font";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { ToastContainer } from "react-toastify";
import { toastError, toastSuccess } from "../Toast/Toast";
import { dispatch, useSelector } from "@/store";
import { getAllMusic, clipVideo, refreshPage } from "@/store/slices/clipSlice";
import { BASE_URL } from "@/services/api";

interface FileUploadState {
  fileName: string;
  percentCompleted: number;
}
interface AddClipProps {
  handleCloseModal: () => void;
}

function AddClips({ handleCloseModal }: AddClipProps) {
  const authState = useSelector((state: any) => state.auth.userData) || [];
  const musicState = useSelector((state: any) => state.post.allMusic) || [];
  const [video, setVideo] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedOptionMusic, setSelectedOptionMusic] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpenMusic, setIsDropdownOpenMusic] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const [fileUpload, setFileUpload] = useState<FileUploadState>({
    fileName: "",
    percentCompleted: 0,
  });

  useEffect(() => {
    dispatch(getAllMusic());
  }, []);

  console.log("musicState: ", musicState);

  const optionsForGame = [
    { value: "game1", label: "Game 1" },
    { value: "game2", label: "Game 2" },
    { value: "game3", label: "Game 3" },
  ];

  const [searchText, setSearchText] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(optionsForGame);

  const handleSearch = (e: any) => {
    const inputValue = e.target.value.toLowerCase();
    setSearchText(inputValue);

    const filtered = optionsForGame.filter((option) =>
      option.label.toLowerCase().includes(inputValue)
    );

    setFilteredOptions(filtered);
  };

  const [searchTextMusic, setSearchTextMusic] = useState("");
  const [filteredOptionsMusic, setFilteredOptionsMusic] = useState(musicState);

  const handleSearchMusic = (e: any) => {
    const inputValue = e.target.value.toLowerCase();
    setSearchTextMusic(inputValue);

    const filtered = musicState.filter((option: any) =>
      option.toLowerCase().includes(inputValue)
    );

    setFilteredOptionsMusic(filtered);
  };

  const handleSelectMusic = (value: any) => {
    setSelectedOptionMusic(value);
    setIsDropdownOpenMusic(false);
  };

  const toggleDropdownMusic = () => {
    setIsDropdownOpenMusic(!isDropdownOpenMusic);
  };

  const handleSelect = (value: any) => {
    setSelectedOption(value);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClipSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("selectedOptionMusic: ", selectedOptionMusic);

    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setSelectedVideo(file);
      // Music is not required
      // if (selectedOptionMusic.trim() === "") {
      //   setError("Please select music");
      //   return toastSuccess("Please select music");
      // } else {
      //   setError(null);
      // }
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("music", selectedOptionMusic);

        const response = await axios.post(
          `${BASE_URL}/storage/video/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (progressEvent: any) => {
              console.log("progressEvent", progressEvent);
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setFileUpload({ fileName: file.name, percentCompleted });
              console.log(`Upload Progress : ${percentCompleted}%`);
              // You can update a progress bar or perform other actions based on the progress
            },
          }
        );
        console.log("RESPONSE ADDVIDEO: ", response.data);
        setVideo(response.data.videoURL);
        toastSuccess(response.data.message);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  const myBGStyleModal = {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    backdropFilter: "blur(8px)",
  };

  const handleSubmitClip = async () => {
    const payload = {
      userID: authState._id,
      description: description.trim(),
      game: selectedOption.trim(),
      music: selectedOptionMusic.trim(),
      video: video,
    };

    console.log("My Payload ADDCLIP: ", payload);

    const successCallback = (response: any) => {
      console.log("RESPONSE ADDCLIP: ", response);
      handlePageRefresh();
      handleCloseModal();
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

    dispatch(clipVideo(params));
  };

  const handlePageRefresh = () => {
    dispatch(refreshPage());
  };

  return (
    <>
      <div
        style={myBGStyleModal}
        className="fixed inset-0 flex items-center justify-center z-50"
      >
        <div className="modal-container w-11/12 sm:w-11/12 lg:w-9/12 h-[40rem] lg:h-[calc(100vh - 2rem)] z-50 overflow-y-auto bg-[#091619] rounded-lg">
          {/* Modal content */}
          <div className="relative  rounded-lg bg-[#091619] py-5 sm:py-4 border border-[#586769]">
            <button
              type="button"
              className="text-white-400 absolute top-2.5 right-2.5 bg-transparent  rounded-lg text-sm p-1.5 ml-auto inline-flex  hover:bg-gray-600 hover:text-white"
              data-modal-toggle="deleteAlertModal"
              onClick={handleCloseModal}
            >
              <Image src={SVG.Exit} alt="exit" width={30} height={30} />
              <span className="sr-only">Close modal</span>
            </button>

            <h1
              className={`${leagueGothic.className} text-center text-3xl mb-7 text-white`}
            >
              ADD CLIPS
            </h1>

            <div className="flex flex-col sm:flex-row sm:justify-between justify-center">
              {/* Left Column - Story Block */}
              <div className="w-full sm:w-1/2 sm:mr-2 sm:ml-6 px-8 sm:px-0">
                {/* Add your story block content here */}
                <div className="lg:h-[33.9rem] md:h-[33.9rem] h-[8rem] w-full md:w-[22rem] lg:w-full flex flex-col sm:justify-center justify-center items-center rounded-lg bg-[#091619] border-2 border-[#1C2C2E] md:mr-20">
                  {!selectedVideo || error ? (
                    <label htmlFor="dropzone-file">
                      <div className="flex flex-col items-center">
                        <Image
                          src={SVG.Upload}
                          alt="Upload"
                          width={60}
                          height={60}
                        />
                        <p className="mb-2 text-sm  text-gray-400">
                          <span className="font-semibold">Upload Videos</span>
                        </p>
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        // accept="video/*"
                        onChange={handleClipSelect}
                      />
                    </label>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      {video ? (
                        <video
                          className="w-full h-full"
                          src={video}
                          controls
                          width="100%"
                          height="100%"
                          autoPlay
                          controlsList=" nodownload  noremoteplayback noplaybackrate foobar"
                          disablePictureInPicture
                        />
                      ) : (
                        <CountdownCircleTimer
                          isPlaying
                          duration={60}
                          size={240}
                          colors={["#37C535", "#F7B801", "#A30000", "#A30000"]}
                          colorsTime={[10, 6, 3, 0]}
                        >
                          {({ remainingTime }) => {
                            return (
                              <div className="flex flex-col justify-center items-center ">
                                <span className="text-xs">Estimated Time</span>
                                {remainingTime}
                              </div>
                            );
                          }}
                        </CountdownCircleTimer>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column - Form */}
              <div className="w-full md:w-full lg:w-2/5 px-8 sm:px-0">
                {/* Game Selection */}
                <div className="mb-2 sm:mb-4">
                  <label className="block mb-2 text-gray-200">
                    Select Game
                  </label>
                  <div className="relative inline-block text-left w-full">
                    <div className="relative">
                      <span className="rounded-md shadow-sm">
                        <button
                          onClick={toggleDropdown}
                          type="button"
                          className="w-full md:w-80 sm:w-96 inline-flex justify-between px-4 py-3 rounded-t-lg bg-[#1C2C2E] text-white"
                          aria-selected={true}
                        >
                          {selectedOption || "Game"}
                          <Image
                            className={"w-6 h-6 ml-2"}
                            src={SVG.Dropdown}
                            alt="dropdown"
                            width={30}
                            height={30}
                          />
                        </button>
                      </span>
                    </div>

                    {isDropdownOpen && (
                      <div className="absolute z-50 w-full md:w-80 sm:w-96 rounded-md shadow-lg">
                        <div className="bg-[#1C2C2E] flex gap-2 p-2 sm:p-3 items-center border border-[#162423]">
                          <Image
                            src={SVG.Search}
                            alt="logo"
                            width={25}
                            height={25}
                          />
                          <input
                            className="w-full md:w-80 sm:w-96 bg-[#1C2C2E] outline-none text-white flex-grow text-sm sm:text-base"
                            placeholder="Search"
                            value={searchText}
                            onChange={handleSearch}
                          />
                        </div>
                        <ul className="py-1 bg-[#1C2C2E] text-white divide-y divide-[#162423] rounded-b-lg">
                          {filteredOptions.map((option) => (
                            <li
                              key={option.value}
                              onClick={() => handleSelect(option.value)}
                              className="cursor-pointer select-none relative px-4 py-2 text-gray-200 rounded-b-lg"
                              role="option"
                              aria-selected={false}
                            >
                              <span
                                className={`${
                                  option.value === selectedOption
                                    ? "font-semibold"
                                    : ""
                                } block truncate`}
                              >
                                {option.label}
                              </span>
                              {option.value === selectedOption && (
                                <Image
                                  className="absolute w-5 h-5 text-green-500 right-3 top-2/4 transform -translate-y-2/4"
                                  src={SVG.Tick}
                                  alt="tick"
                                  width={30}
                                  height={30}
                                />
                              )}
                              <hr className="border-t border-[#1C2C2E]" />
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-0 sm:mb-4">
                  <label className="block mb-2  text-gray-200">
                    Write Description
                  </label>
                  <textarea
                    id="description"
                    rows={5}
                    className="w-full md:w-80 sm:w-96 p-2  sm:text-sm outline-none rounded-lg bg-[#1C2C2E] text-white"
                    placeholder="Type here..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>

                <div className="mb-0 sm:mb-4">
                  <label className="block mb-2  text-gray-200">Add Music</label>
                  <div className="relative inline-block text-left w-full">
                    <div className="relative">
                      <span className="rounded-md shadow-sm">
                        <button
                          onClick={toggleDropdownMusic}
                          type="button"
                          className="w-full md:w-80 sm:w-96 inline-flex justify-between px-4 py-3 rounded-t-lg bg-[#1C2C2E] text-white "
                          aria-selected={true}
                        >
                          {selectedOptionMusic || "Music"}
                          <Image
                            className={"w-6 h-6 ml-2"}
                            src={SVG.Dropdown}
                            alt="dropdown"
                            width={30}
                            height={30}
                          />
                        </button>
                      </span>
                    </div>

                    {isDropdownOpenMusic && (
                      <div className="absolute overflow-y-auto h-40 z-50 mt-2w-full md:w-80 sm:w-96 shadow-lg">
                        <div className="bg-[#1C2C2E] flex gap-2 p-2 sm:p-3 items-center border border-[#162423]">
                          <Image
                            src={SVG.Search}
                            alt="logo"
                            width={25}
                            height={25}
                          />
                          <input
                            className="w-full md:w-80 sm:w-96 bg-[#1C2C2E] outline-none text-white flex-grow text-sm sm:text-base"
                            placeholder="Search"
                            value={searchTextMusic}
                            onChange={handleSearchMusic}
                          />
                        </div>
                        <ul className="py-1 bg-[#1C2C2E] text-white divide-y divide-[#162423] rounded-b-lg">
                          {filteredOptionsMusic.map((option: any) => (
                            <li
                              key={option.value}
                              onClick={() => handleSelectMusic(option)}
                              className="cursor-pointer select-none outline-none relative px-4 py-3 text-gray-200"
                              role="option"
                              aria-selected={false}
                            >
                              <span
                                className={`${
                                  option === selectedOptionMusic
                                    ? "font-semibold"
                                    : ""
                                } block truncate`}
                              >
                                {option}
                              </span>
                              {option === selectedOptionMusic && (
                                <Image
                                  className="absolute w-5 h-5 text-green-500 right-3 top-2/4 transform -translate-y-2/4"
                                  src={SVG.Tick}
                                  alt="tick"
                                  width={30}
                                  height={30}
                                />
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-between items-center my-3 sm:mt-10 sm:ml-7 w-full md:w-72 sm:w-96 ml-2">
                  <button
                    className="font-bold w-full sm:w-40 py-2 lg:py-2.5 px-2 sm:px-1 bg-[#37C535] text-white text-center rounded-tl-[20px] sm:rounded-tl-[20px] rounded-br-[20px] sm:rounded-br-[20px] rounded-tr-[5px] sm:rounded-tr-[5px] rounded-bl-[5px] sm:rounded-bl-[5px] cursor-pointer hover:bg-[#2FB530]"
                    onClick={handleSubmitClip}
                  >
                    Submit
                  </button>
                  <button className="font-bold w-full sm:w-40 py-1 lg:py-3 text-white text-center sm:py-[10px] px-[30px] sm:px-[30px] rounded-tl-[20px] sm:rounded-tl-[20px] rounded-br-[20px] sm:rounded-br-[20px] rounded-tr-[5px] sm:rounded-tr-[5px] rounded-bl-[5px] sm:rounded-bl-[5px]">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
    </>
  );
}

export default AddClips;
