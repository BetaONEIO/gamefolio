"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { SVG } from "@/assets/SVG";
import { leagueGothic } from "@/font/font";
import { useSelector } from "@/store";
import { format } from "date-fns";
import download from "downloadjs";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

interface TransactionProps {
  handleCloseModal: () => void;
  startDate: string;
  endDate: string;
}

async function embedCustomFont(pdfDoc: any) {
  try {
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    return timesRomanFont;
  } catch (error) {
    console.error("Error embedding font:", error);
    throw error;
  }
}

async function createPdfDocument() {
  try {
    const pdfDoc = await PDFDocument.create();
    return pdfDoc;
  } catch (error) {
    console.error("Error creating PDF document:", error);
    throw error;
  }
}

function Transaction({
  handleCloseModal,
  startDate,
  endDate,
}: TransactionProps) {
  const authState = useSelector((state: any) => state.auth.userData) || [];
  const [filteredCoins, setFilteredCoins] = useState<any[]>([]);
  const [dataFetched, setDataFetched] = useState<boolean>(false);
  const contentRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const startDateTime = new Date(startDate);
        startDateTime.setHours(0, 0, 0, 0);

        const endDateTime = new Date(endDate);
        endDateTime.setHours(0, 0, 0, 0);

        const filteredCoins = authState?.coins?.filter((coin: any) => {
          const coinDateTime = new Date(coin.date);
          coinDateTime.setHours(0, 0, 0, 0);

          return coinDateTime >= startDateTime && coinDateTime <= endDateTime;
        });

        setFilteredCoins(filteredCoins);
        setDataFetched(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [authState, startDate, endDate]);

  console.log("filteredCoins", filteredCoins);

  const handleDownload = async () => {
    try {
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage();
      const font = await embedCustomFont(pdfDoc);

      page.drawText("Hello, World!", {
        x: 50,
        y: 500,
        font,
        color: rgb(1, 1, 1),
      });

      const pdfBytes = await pdfDoc.save();
      console.log("PDF Bytes:", pdfBytes);

      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const docUrl = URL.createObjectURL(blob);
      console.log("docUrl:", docUrl);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  // const handleDownload = async () => {
  //   try {
  //     if (!dataFetched || !filteredCoins || filteredCoins.length === 0) {
  //       console.log("Data is not fetched yet or is empty");
  //       return;
  //     }

  //     const pdfDoc = await createPdfDocument();
  //     console.log("Result of createPdfDocument:", pdfDoc);

  //     const page = pdfDoc.addPage();
  //     const font = await embedCustomFont(pdfDoc);
  //     console.log("Embedded Font:", font);

  //     if (!font) {
  //       console.log("Font embedding failed");
  //       return;
  //     }

  //     const { width, height } = page.getSize();
  //     console.log("Page dimensions:", width, height);

  //     const fontSize = 15;
  //     const text = "Transaction History\n\n";

  //     page.drawText(text, {
  //       x: 50,
  //       y: height - 4 * fontSize,
  //       font,
  //       color: rgb(1, 1, 1),
  //     });

  //     let yOffset = height - 6 * fontSize;

  //     filteredCoins.forEach((coin: any) => {
  //       const coinText = `${coin.coinType} - ${coin.coinAmount} Coin - ${format(
  //         new Date(coin?.date),
  //         "dd MMM, yyyy - h:mm a"
  //       )}\n`;

  //       page.drawText(coinText, {
  //         x: 50,
  //         y: yOffset,
  //         font,
  //         color: rgb(1, 1, 1),
  //       });

  //       yOffset -= 2 * fontSize;
  //     });

  //     const pdfBytes = await pdfDoc.save();
  //     console.log("PDF Bytes:", pdfBytes);

  //     // Use saveAs from file-saver to trigger download
  //     saveAs(
  //       new Blob([pdfBytes], { type: "application/pdf" }),
  //       "transaction_history.pdf"
  //     );
  //   } catch (error) {
  //     console.error("Error generating PDF:", error);
  //   }
  // };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="modal-container sm:w-96 lg:w-4/12 mx-auto z-50 overflow-y-auto">
          <div className="relative text-center rounded-lg bg-[#091619] p-3 sm:p-6 border border-[#586769]">
            <button
              type="button"
              className="text-white-400 absolute top-3.5 right-2.5 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-600 hover:text-white"
              onClick={handleCloseModal}
            >
              <Image src={SVG.Exit} alt="exit" width={30} height={30} />
              <span className="sr-only">Close modal</span>
            </button>

            <h1
              className={`${leagueGothic.className} text-center text-3xl mb-5 text-white`}
            >
              TRANSACTION HISTORY
            </h1>

            <div className="flex gap-6 p-3 sm:p-3 justify-center w-full rounded-lg overflow-hidden">
              <div>
                <p className="mx-2 sm:mx-4 text-sm font-light text-left text-[#787F80]">
                  From Date
                </p>
                <p className="mx-2 sm:mx-4 text-sm font-bold sm:text-base">
                  {format(new Date(startDate), "dd MMM, yyyy")}
                </p>
              </div>
              <Image
                className="object-contain"
                src={SVG.Arrow}
                alt="Arrow"
                width={30}
                height={30}
              />
              <div>
                <p className="mx-2 sm:mx-4 text-sm font-light text-left text-[#787F80]">
                  To Date
                </p>
                <p className="mx-2 sm:mx-4 text-sm font-bold sm:text-base">
                  {format(new Date(endDate), "dd MMM, yyyy")}
                </p>
              </div>
            </div>

            <div className="flex flex-col w-full sm:min-h-[350px] lg:min-h-[400px] max-h-[400px] sm:max-h-[350px] lg:max-h-[400px] overflow-y-auto no-scrollbar">
              {filteredCoins.map((coin: any) => (
                <div key={coin._id}>
                  <div className="flex items-center my-3">
                    <Image
                      className="object-contain"
                      src={SVG.CoinsAdd}
                      alt="Coin"
                      width={50}
                      height={50}
                    />
                    <div className="flex items-center justify-between w-full sm:w-full">
                      <div>
                        <p className="flex items-start mx-2 sm:mx-4 text-sm font-light sm:text-base">
                          {coin.coinType}
                        </p>
                        <p className="mx-2 sm:mx-4 text-sm font-light text-left text-[#7C7F80]">
                          {format(
                            new Date(coin?.date),
                            "dd MMM, yyyy - h:mm a"
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="text-white">{coin.coinAmount} Coin</p>
                      </div>
                    </div>
                  </div>
                  <hr className="border-t border-[#343434]" />
                </div>
              ))}
            </div>

            <div className="flex items-center w-full my-5">
              <button
                onClick={handleDownload}
                className="w-full sm:text-base font-semibold bg-[#37C535] py-[10px] px-[30px] text-white text-center rounded-tl-[20px] rounded-br-[20px] rounded-tr-[5px] rounded-bl-[5px]"
              >
                Download
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Transaction;
