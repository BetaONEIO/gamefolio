import { SVG } from "@/assets/SVG";
import { IMAGES } from "@/assets/images";
import Layout from "@/components/CustomLayout/layout";
import Image from "next/image";
import React from "react";

function Page() {
  const USERDATA = [
    {
      id: "1",
      name: "Hannery",
      profilePicture: IMAGES.Profile,
      Story: IMAGES.Story,
      date: "17 sep, 2022",
      description:
        " Lorem ipsum dolor sit amet consectetur. Ante duis tellus tincidu...",
      like: 200,
      love: 120,
      comment: 165,
    },

    {
      id: "2",
      name: "Hannery",
      profilePicture: IMAGES.Profile,
      Story: IMAGES.Story,
      date: "17 sep, 2022",
      description:
        "Lorem ipsum dolor sit amet consect. Ante duis tellus tincidunt nibh hi hahshhanjnjnijnijnihbibibib",
      like: 200,
      love: 120,
      comment: 165,
    },
    {
      id: "3",
      name: "Hannery",
      profilePicture: IMAGES.Profile,
      Story: IMAGES.Story,
      date: "17 sep, 2022",
      description:
        "Lorem ipsum dolor sit amet consect. Ante duis tellus tincidunt nibh hi hahshhanjnjnijnijnihbibibib",
      like: 200,
      love: 120,
      comment: 165,
    },
    {
      id: "4",
      name: "Hannery",
      profilePicture: IMAGES.Profile,
      Story: IMAGES.Story,
      date: "17 sep, 2022",
      description:
        "Lorem ipsum dolor sit amet consect. Ante duis tellus tincidunt nibh hi hahshhanjnjnijnijnihbibibib",
      like: 200,
      love: 120,
      comment: 165,
    },
    {
      id: "5",
      name: "Hannery",
      profilePicture: IMAGES.Profile,
      Story: IMAGES.Story,
      date: "17 sep, 2022",
      description:
        "Lorem ipsum dolor sit amet consect. Ante duis tellus tincidunt nibh hi hahshhanjnjnijnijnihbibibib",
      like: 200,
      love: 120,
      comment: 165,
    },
  ];

  return (
    <Layout>
      <div className="flex flex-col justify-center items-center py-4">
        {USERDATA.map((user) => (
          <div key={user.id} className="relative w-11/12 sm:w-5/12 h-1/5 mb-4">
            <div className="absolute top-0 left-0 p-4">
              <div className="flex items-center gap-2">
                <Image
                  className="hover:opacity-80 rounded-lg object-cover"
                  src={user.profilePicture}
                  alt="Profile avatar"
                  width={50}
                  height={50}
                />
                <h1 className="font-bold text-lg hover:opacity-80">
                  {user.name}
                </h1>
              </div>
            </div>
            <div className="absolute top-1.5 right-0 p-4 justify-self-center">
              <Image
                className="w-7 h-7 hover:opacity-80 rounded-full object-cover"
                src={SVG.Share}
                alt="Story"
                width={30}
                height={30}
              />
            </div>
            <div className="absolute top-20 mx-4 md:mx-5">
              <p className="font-light text-xs sm:text-sm">
                {user.description}
              </p>
            </div>
            <Image
              className="w-full h-auto max-w-full max-h-[90vh] object-cover rounded-lg"
              alt="Story"
              src={user.Story}
              width={432}
              height={768}
              sizes="100vw"
            />

            <div className="absolute inset-x-0 bottom-20 p-4 flex items-center justify-between">
              <p className="font-light text-xs sm:text-sm hover:opacity-80">
                Liked by john Smith_12 and {user.like} others
              </p>
            </div>
            <div className="absolute inset-x-0 bottom-14 p-4 flex items-center justify-between">
              <p className="font-light text-xs sm:text-sm hover:opacity-80">
                ROY KNOX - Lost In Sound
              </p>
            </div>

            <div className="absolute inset-x-0 bottom-0 p-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 p-2 rounded-lg bg-[#162423]">
                  <Image
                    className="hover:opacity-80"
                    src={SVG.Like}
                    alt="Like"
                    width={30}
                    height={30}
                  />
                </div>
                <div className="w-10 h-10 p-2 rounded-lg bg-[#162423]">
                  <Image
                    className="hover:opacity-80"
                    src={SVG.Chat}
                    alt="Comment"
                    width={30}
                    height={30}
                  />
                </div>
                <div className="w-10 h-10 p-2 rounded-lg bg-[#162423]">
                  <Image
                    className="hover:opacity-80"
                    src={SVG.GGcoin}
                    alt="Gcoin"
                    width={30}
                    height={30}
                  />
                </div>
              </div>
              <Image
                className="w-10 h-10 hover:opacity-80"
                src={SVG.Mute}
                alt="Mute"
                width={40}
                height={40}
              />
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default Page;
