import Image from "next/image";
import { SVG } from "@/assets/SVG";
import { IMAGES } from "@/assets/images";
import { leagueGothic } from "@/font/font";

interface BadgesProps {
  handleCloseModal: () => void;
}

function Badges({ handleCloseModal }: BadgesProps) {
  const namesArray = [
    { name: "CURRENT" },
    { name: "CURRENT" },
    { name: "CURRENT" },
    { name: "CURRENT" },
  ];

  const dummy = [
    {
      id: 1,
      Image: IMAGES.Turbo,
      userName: "Turbo Achiever",
      Name: "Milestone 100000 coins",
    },
    {
      id: 2,
      Image: IMAGES.Turbo,
      userName: "Turbo Achiever",
      Name: "Milestone 100000 coins",
    },
    {
      id: 3,
      Image: IMAGES.Turbo,
      userName: "Turbo Achiever",
      Name: "Milestone 100000 coins",
    },
  ];

  const sectionStyle = {
    backgroundImage: `linear-gradient(to bottom, rgba(4, 50, 12, 1), rgba(4, 50, 12, 0) 10%)`,
  };

  const myBGStyleModal = {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    backdropFilter: "blur(8px)",
  };
  return (
    <>
      <div
        style={myBGStyleModal}
        className="fixed inset-0 flex items-center justify-center z-50"
      >
        <div className="fixed inset-0 flex items-center z-50">
          <div className="modal-container sm:w-80 w-[340px] mx-auto lg:w-[340px] z-50 no-scrollbar border border-[#586769] overflow-hidden">
            <div className="relative text-center rounded-lg bg-[#091619]">
              <button
                type="button"
                className="text-white-400 absolute top-2.5 right-2.5 bg-transparent hover-text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-600 hover-text-white"
                onClick={handleCloseModal}
              >
                <Image src={SVG.Exit} alt="exit" width={30} height={30} />
                <span className="sr-only">Close modal</span>
              </button>

              <h1
                className={`${leagueGothic.className} text-center text-3xl dark-text-white pt-4`}
              >
                BADGES
              </h1>

              <div className="sm:min-h-[350px] lg:min-h-[630px] max-h-[650px] sm:max-h-[350px] lg-max-h-[500px]">
                <div className="flex w-full h-80 overflow-scroll no-scrollbar px-4 ">
                  {namesArray.map((items, index) => (
                    <div key={index}>
                      <div className="w-80 h-80 -mb-12">
                        <Image
                          src={IMAGES.Badges}
                          alt="UploadStory"
                          width="12"
                          height="12"
                          sizes="100vw"
                          className="h-full w-full"
                        />
                      </div>
                      <span className="text-lg text-white">{items.name}</span>
                    </div>
                  ))}
                </div>

                <div
                  style={sectionStyle}
                  className="flex flex-col bg-[#091619] h-screen"
                >
                  <p className="text-left mx-2 my-1 font-bold text-white">
                    Upcoming Badges
                  </p>

                  {dummy.map((items, index) => (
                    <div
                      key={index}
                      className="p-2 m-2 text-sm text-left rounded-lg bg-[#091619] border-2 border-[#1C2C2E]"
                    >
                      <div className="flex items-center">
                        <Image
                          className="mr-4"
                          src={items.Image}
                          alt="Video"
                          width={50}
                          height={60}
                        />
                        <div>
                          <span className="text-base font-semibold text-white">
                            {items.userName}
                          </span>
                          <p className="text-white">{items.Name}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Badges;
