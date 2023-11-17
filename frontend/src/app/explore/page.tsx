import { IMAGES } from "@/assets/images";
import Layout from "@/components/CustomLayout/layout";
import ExploreHeader from "@/components/ExploreHeader/ExploreHeader";
import Image from "next/image";
import Link from "next/link";

function page() {
  const sectionStyle = {
    backgroundImage: `linear-gradient(to bottom, rgba(4, 50, 12, 1), rgba(4, 50, 12, 0) 10%)`,
  };

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
  ];
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
    <Layout>
      <ExploreHeader />

      <div
        style={sectionStyle}
        className="flex flex-col bg-[#091619] py-4 overflow-y-scroll no-scrollbar"
      >
        <div className="flex items-center">
          <div className="flex justify-between items-center w-full sm:mx-2 lg:mx-4">
            <div>
              <p className="font-semibold text-base sm:text-lg lg:text-lg">
                Explore By Games
              </p>
            </div>
            <div className="flex items-center">
              <Link
                href="/explore-search"
                className="text-md sm:text-md lg:text-md hover:opacity-80 cursor-pointer"
              >
                View All
              </Link>
            </div>
          </div>
        </div>

        <div className="flex items-center my-4">
          <div className="flex items-center overflow-scroll no-scrollbar gap-2 px-4 ">
            {games.map((items, index) => (
              <div key={index}>
                <div className="w-28 h-44">
                  <Image
                    src={items.IMAGE}
                    alt="explore by games"
                    width="100"
                    height="133"
                    sizes="100vw"
                    className="w-28 h-44 object-cover rounded-xl "
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="px-4">
            <p className="font-semibold text-base sm:text-lg lg:text-lg">
              Popular
            </p>
          </div>

          <div className="flex flex-wrap justify-start items-start mx-3">
            {popular.map((game) => (
              <div key={game.id} className="relative my-2 mx-3">
                <Image
                  src={game.IMAGE}
                  alt="Popular"
                  width={100}
                  height={100}
                  sizes="100vw"
                  className="w-96 h-44 sm:w-52 sm:h-28 rounded-xl hover:opacity-80"
                />
                <span className="absolute bottom-2 right-2">8:31</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default page;
