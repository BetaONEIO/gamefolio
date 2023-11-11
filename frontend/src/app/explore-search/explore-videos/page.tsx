import { IMAGES } from "@/assets/images";
import Image from "next/image";

function ExploreVideo() {
  const popular = [
    { id: 1, IMAGE: IMAGES.Popular },
    { id: 2, IMAGE: IMAGES.Popular1 },
    { id: 3, IMAGE: IMAGES.Popular1 },
    { id: 4, IMAGE: IMAGES.ExploreIMG1 },
    { id: 5, IMAGE: IMAGES.Popular1 },
    { id: 6, IMAGE: IMAGES.Popular1 },
    { id: 7, IMAGE: IMAGES.ExploreIMG1 },
    { id: 8, IMAGE: IMAGES.Popular1 },
    { id: 9, IMAGE: IMAGES.Popular1 },
    { id: 10, IMAGE: IMAGES.Popular1 },
    { id: 11, IMAGE: IMAGES.Popular },
    { id: 12, IMAGE: IMAGES.Popular1 },
    { id: 13, IMAGE: IMAGES.Popular1 },
    { id: 14, IMAGE: IMAGES.ExploreIMG1 },
    { id: 15, IMAGE: IMAGES.Popular1 },
    { id: 16, IMAGE: IMAGES.Popular1 },
    { id: 17, IMAGE: IMAGES.ExploreIMG1 },
    { id: 18, IMAGE: IMAGES.Popular1 },
    { id: 19, IMAGE: IMAGES.Popular1 },
    { id: 20, IMAGE: IMAGES.Popular1 },
  ];

  return (
    <>
      <div className="flex flex-wrap justify-start items-start mx-3">
        {popular.map((game) => (
          <div key={game.id} className="relative my-1 mx-3">
            <Image
              src={game.IMAGE}
              alt="Popular"
              width={100}
              height={100}
              sizes="100vw"
              className="w-96 h-44 sm:w-52 sm:h-28  rounded-xl hover:opacity-80"
            />
            <span className="absolute bottom-2 right-2">8:31</span>
          </div>
        ))}
      </div>
    </>
  );
}

export default ExploreVideo;
