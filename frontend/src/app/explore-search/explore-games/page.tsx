import { IMAGES } from "@/assets/images";
import Image from "next/image";

function ExploreGame() {
  const games = [
    { id: 1, IMAGE: IMAGES.ExploreIMG1 },
    { id: 2, IMAGE: IMAGES.ExploreIMG2 },
    { id: 3, IMAGE: IMAGES.ExploreIMG3 },
    { id: 4, IMAGE: IMAGES.ExploreIMG1 },
    { id: 5, IMAGE: IMAGES.ExploreIMG2 },
    { id: 6, IMAGE: IMAGES.ExploreIMG3 },
    { id: 7, IMAGE: IMAGES.ExploreIMG1 },
    { id: 8, IMAGE: IMAGES.ExploreIMG2 },
    { id: 9, IMAGE: IMAGES.ExploreIMG3 },
    { id: 10, IMAGE: IMAGES.ExploreIMG2 },
    { id: 11, IMAGE: IMAGES.ExploreIMG1 },
    { id: 12, IMAGE: IMAGES.ExploreIMG2 },
    { id: 13, IMAGE: IMAGES.ExploreIMG3 },
    { id: 14, IMAGE: IMAGES.ExploreIMG1 },
    { id: 15, IMAGE: IMAGES.ExploreIMG2 },
    { id: 16, IMAGE: IMAGES.ExploreIMG3 },
    { id: 17, IMAGE: IMAGES.ExploreIMG1 },
    { id: 18, IMAGE: IMAGES.ExploreIMG2 },
    { id: 19, IMAGE: IMAGES.ExploreIMG3 },
    { id: 20, IMAGE: IMAGES.ExploreIMG2 },
  ];
  return (
    <>
      <div className="mx-4 my-4">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-4">
          {games.map((items, index) => (
            <div key={index} className="relative flex flex-col items-center">
              <Image
                src={items.IMAGE}
                alt="explore by games"
                width="100"
                height="133"
                sizes="100vw"
                className="h-56 w-full object-cover rounded-xl focus:ring-primary-600 focus:border-primary-600 bg-gray-700 border-gray-600 placeholder-gray-400 focus:ring-primary-500 focus:border-primary-500"
              />
              <span className="absolute bottom-1 right-2">8:31</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ExploreGame;
