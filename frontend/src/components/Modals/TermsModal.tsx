import { SVG } from "@/assets/SVG";
import { leagueGothic } from "@/font/font";
import Image from "next/image";

interface TermsModalProps {
  handleCloseModal: () => void; // Define handleCloseModal as a function
}

function TermsModal({ handleCloseModal }: TermsModalProps) {
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
        <div className="modal-container sm:w-96 mx-auto lg:w-1/4 lg-rounded z-50">
          {/* Modal content */}

          <div className="relative text-center justify-center rounded-lg  bg-[#091619] p-5 sm:p-5 border border-[#586769]">
            <button
              type="button"
              className="text-white-400 absolute top-2.5 right-2.5 bg-transparent  rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-600 hover:text-white"
              data-modal-toggle="deleteAlertModal"
              onClick={handleCloseModal}
            >
              <Image src={SVG.Exit} alt="exit" width={30} height={30} />
              <span className="sr-only">Close modal</span>
            </button>
            <h1
              className={`${leagueGothic.className} text-3xl mb-7  text-white`}
            >
              TERMS & CONDITIONS
            </h1>

            <div className="w-full mb-4 sm:mb-5  ">
              <h2 className=" text-left font-semibold mb-3 text-white">
                Version 1.0.0
              </h2>
              <p className="text-left text-xs font-light mb-2 text-white">
                Lorem ipsum dolor sit amet consectetur. Placerat quis integer
                facilisi sit vivamus aenean lacus. Lacus rhoncus eu sed diam.
                Turpis mus suspendisse sociis scelerisque lacus gravida fames.
                Pellentesque morbi integer sit nibh. Nulla justo fermentum
                mauris purus ultrices tempor. Pretium convallis odio mauris
                aliquam. Duis arcu convallis tempus lectus pulvinar nibh egestas
                vestibulum. In semper amet euismod id nunc habitant mattis nisl
                vivamus. Cras nunc a morbi risus. Nullam cursus odio tempus
                posuere non risus non venenatis.
              </p>
              <p className="text-left text-xs font-light mb-2 text-white">
                Lorem ipsum dolor sit amet consectetur. Nunc ullamcorper quis
                facilisis ac congue tincidunt tristique ipsum semper. Tincidunt
                fringilla nisl dolor orci nibh imperdiet faucibus fames. Euismod
                elementum.
              </p>

              <p className="text-left text-xs font-light mb-2 text-white">
                Lorem ipsum dolor sit amet consectetur. Congue pretium molestie
                molestie nunc etiam eu urna id lacus. At dignissim blandit
                imperdiet eget commodo tristique viverra in. Ultricies neque
                urna non adipiscing eu mattis. Tincidunt sapien sed id amet nisi
                posuere felis. Interdum magna proin est gravida cursus porta.
                Odio pellentesque diam quam dis et aliquam. Lectus curabitur
                tortor nam quam tincidunt etiam id morbi hendrerit. Fames dui
                faucibus volutpat scelerisque a. Nisi facilisis purus maecenas
                diam neque.
              </p>
              <p className="text-left text-xs font-light text-white">
                Lorem ipsum dolor sit amet consectetur. Congue pretium
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TermsModal;
