import Image from "next/image";
import { SVG } from "@/assets/SVG";
import { IMAGES } from "@/assets/images";
import { leagueGothic } from "@/font/font";
import { useSelector } from "@/store";

interface BadgesProps {
  handleCloseModal: () => void;
}

function Badges({ handleCloseModal }: BadgesProps) {
  const authState = useSelector((state: any) => state.auth.userData) || [];

  const totalCoinAmount = authState?.coins?.reduce(
    (total: any, user: any) => total + user.coinAmount,
    0
  );

  const badges = [
    {
      id: 1,
      Image: SVG.Badge1,
      userName: "Quick Starter",
      Name: "Milestone 1000 coins",
      coins: 10,
    },
    {
      id: 2,
      Image: SVG.Badge2,
      userName: "Rapid Riser",
      Name: "Milestone 1000 coins",
      coins: 1000,
    },
    {
      id: 3,
      Image: SVG.Badge3,
      userName: "Swift Performer",
      Name: "Milestone 3000 coins",
      coins: 3000,
    },
    {
      id: 4,
      Image: SVG.Badge4,
      userName: "Speedy Striver",
      Name: "Milestone 5000 coins",
      coins: 5000,
    },
    {
      id: 5,
      Image: SVG.Badge5,
      userName: "Fast Tracker",
      Name: "Milestone 8000 coins",
      coins: 8000,
    },
    {
      id: 6,
      Image: SVG.Badge6,
      userName: "Blazing Achiever",
      Name: "Milestone 10000 coins",
      coins: 10000,
    },
    {
      id: 7,
      Image: SVG.Badge7,
      userName: "Hyper Performer",
      Name: "Milestone 15000 coins",
      coins: 15000,
    },
    {
      id: 8,
      Image: SVG.Badge8,
      userName: "Lightning Leader",
      Name: "Milestone 20000 coins",
      coins: 20000,
    },
    {
      id: 9,
      Image: SVG.Badge9,
      userName: "Supersonic Champion",
      Name: "Milestone 50000 coins",
      coins: 50000,
    },
  ];

  const achievedBadges = badges?.filter(
    (badge) => totalCoinAmount >= badge.coins
  );
  const upcomingBadges = badges?.filter(
    (badge) => totalCoinAmount < badge.coins
  );

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

              <div className="sm:min-h-[350px] lg:min-h-[630px] max-h-[650px] sm:max-h-[350px] lg-max-h-[500px] overflow-y-auto no-scrollbar">
                <div className="flex w-full h-80 overflow-scroll no-scrollbar px-4 ">
                  {achievedBadges.map((badge, index) => (
                    <div key={index}>
                      <div className="w-80 h-72 -mb-2">
                        <Image
                          src={badge.Image}
                          alt="UploadStory"
                          width="12"
                          height="12"
                          sizes="100vw"
                          className="h-full w-full"
                        />
                      </div>
                      <span className="text-lg text-white">
                        {badge.userName}
                      </span>
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

                  {upcomingBadges.map((badge, index) => (
                    <div
                      key={index}
                      className="p-2 m-2 text-sm text-left rounded-lg bg-[#091619] border-2 border-[#1C2C2E]"
                    >
                      <div className="flex items-center">
                        <Image
                          className="mr-4"
                          src={badge.Image}
                          alt="Video"
                          width={50}
                          height={60}
                        />
                        <div>
                          <span className="text-base font-semibold text-white">
                            {badge.userName}
                          </span>
                          <p className="text-white">{badge.Name}</p>
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
