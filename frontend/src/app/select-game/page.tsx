"use client";
import { IMAGES } from "@/assets/images";
import { SVG } from "@/assets/SVG";
import { toastError, toastSuccess } from "@/components/Toast/Toast";
import { leagueGothic } from "@/font/font";
import { ROUTES } from "@/labels/routes";
import { dispatch } from "@/store";
import { createFavoriteGame } from "@/store/slices/authSlice";
import { getFromLocal } from "@/utils/localStorage";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ToastContainer } from "react-toastify";

const SelectGame = () => {
  const userData = getFromLocal("@userData");
  const router = useRouter();

  const games = [
    { id: 1, name: "Subway Surfer" },
    { id: 2, name: "Game 2" },
    { id: 3, name: "Game 3" },
    { id: 4, name: "Game 4" },
    { id: 5, name: "Game 5" },
    { id: 6, name: "Game 6" },
    { id: 7, name: "Game 7" },
    { id: 8, name: "Game 8" },
    // Add more games with their names
  ];

  const [selectedGames, setSelectedGames] = useState<string[]>([]);

  console.log("Selected Games: ", selectedGames);

  const handleCheckboxClick = (name: any) => {
    if (selectedGames.length < 3 || selectedGames.includes(name)) {
      // Toggle the selection of the game by name
      if (selectedGames.includes(name)) {
        setSelectedGames(selectedGames.filter((gameName) => gameName !== name));
      } else {
        setSelectedGames([...selectedGames, name]);
      }
    } else {
      toastError("You can select only 3 games");
    }
  };

  const handleNext = () => {
    // toastSuccess(message);
    if (selectedGames.length < 3) {
      toastError("Please pick at least three");
      return;
    } else if (selectedGames.length === 10) {
      toastError("Maximum Games exceeded");
      return;
    }
    const successCallback = (response: any) => {
      console.log("response: sgame:  ", response);
      toastSuccess(response);
      setTimeout(() => {
        router.push(ROUTES.main);
      }, 6000);
    };

    const errorCallback = (error: string) => {
      toastError(error);
    };

    const params = {
      payload: { userID: userData._id, favoriteGame: selectedGames },
      successCallback,
      errorCallback,
    };

    dispatch(createFavoriteGame(params));
    // router.push(ROUTES.selectGame);
  };

  return (
    <section className="flex flex-col h-screen items-center justify-center px-6 sm:px-6  mx-auto md:h-screen lg:py-10 bg-[#091619]">
      <div className="flex flex-col justify-between p-4 gap-4 items-center h-full w-full md:w-2/3 lg:w-1/2 xl:w-1/3 border-2 border-gray-800">
        <div>
          <h2 className={`${leagueGothic.className} text-2xl sm:text-3xl`}>
            FAVORITES GAMES
          </h2>
        </div>

        <div className="bg-[#1C2C2E] flex gap-2 p-3  sm:p-3 items-center w-full rounded-lg overflow-hidden">
          <Image src={SVG.Search} alt="logo" width={24} height={24} />
          <input
            className="bg-[#1C2C2E] outline-none text-white"
            placeholder="Search"
          />
        </div>

        <div className="flex flex-col w-full no-scrollbar  overflow-scroll">
          {games.map((game) => (
            <div className="flex items-center my-3" key={game.id}>
              <Image
                className="object-contain"
                src={IMAGES.subwaysurfer}
                alt="logo"
                width={50}
                height={50}
              />
              <div className="flex items-center justify-between w-11/12 sm:w-10/12">
                <span className="ml-2 sm:ml-4 text-sm sm:text-base">
                  {game.name}
                </span>
                <div>
                  <Image
                    src={
                      selectedGames.includes(game.name) ? SVG.Tick : SVG.Untick
                    }
                    alt="logo"
                    onClick={() => handleCheckboxClick(game.name)}
                    className={`text-green-500 ${
                      selectedGames.includes(game.name) ? "cursor-pointer" : ""
                    }`}
                    width={20}
                    height={20}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center w-full">
          <span className="text-white">{selectedGames.length} Selected</span>
          <button
            onClick={handleNext}
            className="sm:w-6/12 sm:h-6/12 sm:text-base bg-[#37C535]  text-white text-center py-[7px]  rounded-tl-[20px] rounded-br-[20px] rounded-tr-[5px] rounded-bl-[5px] mb-3"
          >
            Save & Next
          </button>
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
    </section>
  );
};

export default SelectGame;
